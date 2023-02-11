import { FC, memo } from 'react';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';

import { UPopup } from 'taste-ui/index';

const PageContainer: FC<any> = (props) => {
	const { children } = props;
	const { popupVisible } = useSelector(({ tabBarState }) => tabBarState);
	const dispatch = useDispatch();

	return (
		<Block>
			{children}
			<UPopup visible={popupVisible} placement="bottom" rounded>
				<View>测试</View>
			</UPopup>
		</Block>
	);
};

export default memo(PageContainer);
