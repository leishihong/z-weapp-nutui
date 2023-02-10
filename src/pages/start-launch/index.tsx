import { FC, memo, PropsWithChildren, useEffect } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

const StartLaunch: FC<PropsWithChildren> = (props) => {
	console.log(121212);
	useEffect(() => {
		getFuzzyLocation();
	}, []);
	const getFuzzyLocation = async () => {
		const res: Taro.getFuzzyLocation.SuccessCallbackResult =
			await Taro.getFuzzyLocation({ type: 'gcj02' });
		console.log(res, '----');
	};

	return (
		<View>
			热爱光年
			{props.children}
		</View>
	);
};

export default memo(StartLaunch);
