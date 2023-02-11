import { FC, memo, PropsWithChildren, useEffect } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import store from 'store/index';
import { UPopup } from 'taste-ui/index';

const StartLaunch: FC<PropsWithChildren> = (props) => {
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
			<UPopup visible={store.popupVisible} placement="bottom" rounded>
				<View>测试</View>
			</UPopup>
			{props.children}
		</View>
	);
};

export default memo(StartLaunch);
