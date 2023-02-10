import Taro from '@tarojs/taro';
import { isEmpty } from 'lodash';

interface ICache {
	value?: string | unknown;
	isSync?: boolean;
	cacheTime?: number;
}
export const storageCache = async (key: string, options?: ICache) => {
	let { value, isSync = false, cacheTime = 0 } = options ?? {};
	const timestamp: number = Date.parse(new Date().toString()) / 1000;
	console.log(value, 'value');
	if (key && value === null) {
		//删除缓存
		if (isSync) Taro.removeStorageSync(key);
		Taro.removeStorage({ key });
	} else if (key && value) {
		//设置缓存
		let expire;
		if (!cacheTime) {
			expire = timestamp + 3600 * 24 * 7000;
		} else {
			expire = timestamp + cacheTime;
		}
		value = JSON.stringify(value) + '|' + expire;
		if (isSync) Taro.setStorageSync(key, value);
		Taro.setStorage({ key, data: value });
	} else {
		//获取缓存
		const data: any = await getStorage(key, isSync);
		if (data) {
			const tmp = data.split('|');
			if (!tmp[1] || timestamp >= tmp[1]) {
				if (isSync) Taro.removeStorageSync(key);
				Taro.removeStorage({ key });
				return false;
			} else {
				return JSON.parse(tmp[0]);
			}
		}
		return false;
	}
};
/**
 * 获取storage的数据
 */
export const getStorage = async (key: string, isSync = false) => {
	try {
		const storage = await (isSync
			? Taro.getStorageSync(key)
			: Taro.getStorage({ key }));
		return storage.data;
	} catch (e) {
		console.log(`storage不存在${key}`);
		return null;
	}
};
