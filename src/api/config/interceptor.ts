import Taro from '@tarojs/taro';
import { IHttpResponse } from 'api/config/type';
import { handleLogout } from 'api/config/request';

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

export const interceptor = (response: IHttpResponse) => {
	const { statusCode, data } = response;
	switch (statusCode) {
		case HTTP_STATUS.NOT_FOUND:
			const notFoundMessage = data?.message || '请求资源不存在';
			Taro.showToast({ title: notFoundMessage, icon: 'none' });
			return Promise.reject({ message: notFoundMessage });
		case HTTP_STATUS.SERVER_ERROR:
			const errorMessage = data?.message || '服务器异常，请稍后再试';
			Taro.showToast({ title: errorMessage, icon: 'none' });
			return Promise.reject({ message: errorMessage });
		case HTTP_STATUS.BAD_GATEWAY:
			const gatewayMessage = data?.message || '服务端出现了问题';
			Taro.showToast({ title: gatewayMessage, icon: 'none' });
			return Promise.reject({ message: gatewayMessage });
		case HTTP_STATUS.AUTHENTICATE:
			handleLogout();
			return Promise.resolve(data);
		default:
			Taro.showToast({
				title: data?.message || '服务器异常，请稍后再试',
				icon: 'none'
			});
			return Promise.reject({
				message: data?.message || '服务器异常，请稍后再试'
			});
	}
};
