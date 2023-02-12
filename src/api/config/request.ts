import Taro from '@tarojs/taro';
import { isEmpty } from 'lodash';
import store from 'store/index';
import { jumpSetCallback, jumpWebview } from 'utils/utils';
import { TAB, formatWebUrl, URL } from 'constants/router';
import { interceptor } from './interceptor';
import { IMethodsType } from './type';
import { storageCache } from 'utils/storageCache';

export const HTTP_STATUS: { [key: string]: number } = {
	SUCCESS: 200,
	CREATED: 201,
	ACCEPTED: 202,
	CLIENT_ERROR: 400,
	AUTHENTICATE: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	SERVER_ERROR: 500,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504
};

const API_URL: any = {
	dev: {
		url: 'https://testinterface.mtaste.cn' // 测试环境域名
		// url: 'http://39.105.40.245:8806'
		// url: 'http://192.168.51.74:8806' // 大成
		// url: 'http://192.168.50.123:8806', // 洪磊
		// url: 'http://192.168.51.187:8806' // 胡效兴
	},
	sandbox: {
		url: 'http://39.105.40.245:8806'
		// url:'https://testinterface.mtaste.cn'
	},
	staging: {
		url: 'https://testinterface.mtaste.cn'
	},
	prod: {
		// url: 'https://testinterface.mtaste.cn' // 线上暂时用测试环境域名
		url: 'https://interface.mtaste.cn'
	}
};
const WE_APP_ENV: any = process.env.WE_APP_ENV;

const request = async (
	url: string,
	method: IMethodsType = 'GET',
	data: any,
	config: any
) => {
	let _url = `${API_URL[WE_APP_ENV].url}/taste/${url}`;

	const AUTH_TOKEN = await storageCache('AUTH_TOKEN', { isSync: true });
	let { networkType } = await Taro.getNetworkType();
	if (networkType == 'none') {
		Taro.showToast({ title: '网络请求失败，请检查您的网络设置', icon: 'none' });
	}
	const payload = {
		...config,
		url: _url,
		data: { params: data },
		method: method,
		header: Object.assign(
			{
				Authorization: AUTH_TOKEN,
				'content-type': 'application/json',
				platform: 'H5',
				domain: 'admin_platform'
			},
			config?.header ?? {}
		)
	};
	return new Promise(async (resolve, reject) => {
		const response: any = await Taro.request(payload).catch((error) => {
			Taro.showToast({ title: '网络异常，请稍后再试！', icon: 'none' });
			reject(error);
		});
		console.log(response, 'response');

		if (!isEmpty(response) && !isEmpty(response.data)) {
			const { data } = response;
			if (data.status === 200) {
				return resolve(data);
			}
			// token失效，则跳转到登录页面 920 用户token过期 910 未知账户 1312001 用户没登录
			if ([1312001, 920, 910].includes(data.status)) {
				handleLogout();
				return resolve(data);
			}
			if (data.status === 921) {
				const specialTreatmentUrl = [
					'user/vxAppletsMobile',
					'user/registerOrLogin',
					'user/vxAppletsLogin'
				];
				if (specialTreatmentUrl.includes(url)) {
					Taro.showModal({
						title: '系统提示',
						content:
							'该账号已提交注销，注销保护期7天，保护期内该手机号码不可以再次注册',
						showCancel: false,
						confirmText: '随便逛逛',
						success: (res) => {
							if (res.confirm) {
								Taro.switchTab({ url: TAB['home'] });
							}
						}
					});
					resolve(data);
				}
				jumpWebview({
					url: formatWebUrl('cancellationResults'),
					webviewType: 'redirect'
				});
				return resolve(data);
			}
			if ([500, 501, 502, 503].includes(data.status)) {
				Taro.showToast({
					title: data?.message || '网络异常，请稍后再试！',
					icon: 'none'
				});
				return reject(data);
			}
			Taro.showToast({
				title: data?.message || '网络异常，请稍后再试！',
				icon: 'none'
			});
			return resolve(data);
		} else {
			interceptor(response);
		}
	});
};

//将sessionId通过请求头传递给后台，用于判断是否登录以及登录是否过期超时
let get = (url: string, data: any, header?: {}) => {
	return request(url, 'GET', data, header);
};

let post = (url: string, data: any, header?: {}) => {
	return request(url, 'POST', data, header);
};

export const handleLogout = () => {
	storageCache('AUTH_TOKEN', { isSync: true });
	store.dispatch({
		type: 'globalsState/setAccessToken',
		payload: { accessToken: '' }
	});
	const pages = Taro.getCurrentPages();
	const lastPage = pages[pages.length - 1];
	const lastRoute = '/' + lastPage.route;
	console.log(pages, lastPage, lastRoute, 'handleLogout');
	const tabPages = Object.keys(TAB);
	// ['/pages/circle/index', '/pages/social-activity/index', '/pages/follow/index', '/pages/mine/index'];
	// 获取登录成功跳转的callback
	const webviewPages = [URL['webview']];
	let type = 'page';
	if (tabPages.every((v) => v.search(lastRoute) >= 0)) {
		type = 'tab';
	} else if (webviewPages.every((v) => v.search(lastRoute) >= 0)) {
		type = 'webview';
	}
	jumpSetCallback({
		url: lastRoute,
		type,
		query: lastPage.options ?? {},
		webviewType: 'redirect'
	});
	// 跳转到登录页面
	Taro.redirectTo({ url: URL['login'] });
};

// 图片上传
const TaroUploadMedia = async (
	filePath,
	formData: any = {},
	uploadUrl: string,
	fileName: string = 'file'
) => {
	const AUTH_TOKEN = await storageCache('AUTH_TOKEN', { isSync: true });
	const userInfo = await storageCache('userInfo', { isSync: true });
	const userParams =
		AUTH_TOKEN && userInfo
			? { userId: userInfo.id, accountNo: userInfo.accountNo }
			: {};
	console.log(
		userParams,
		filePath,
		formData,
		' Taro.uploadFile',
		Object.assign({}, formData, userParams)
	);
	return new Promise((resolve, reject) => {
		Taro.showLoading({ title: '上传中' });
		Taro.uploadFile({
			url: `${API_URL[WE_APP_ENV].url}/taste/${uploadUrl}`,
			timeout: 10000,
			filePath: filePath,
			name: fileName,
			header: {
				Authorization: AUTH_TOKEN,
				platform: 'H5',
				domain: 'admin_platform',
				'content-type': 'multipart/form-data'
			},
			formData: Object.assign({}, formData, userParams),
			success: (res) => {
				if (res.statusCode === 200) {
					const { status, data, message } = JSON.parse(res.data);
					if (status === 200) {
						resolve(data);
					} else {
						Taro.showToast({ title: message, icon: 'none' });
						reject(message);
					}
				} else {
					reject();
				}
			},
			fail: () => {
				reject();
			}
		});
	});
};

export { TaroUploadMedia, request, get, post };
