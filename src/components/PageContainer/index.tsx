import { FC, memo, ReactNode } from 'react';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';

import { TaroNavigationBar } from 'components/index';
import { UPopup } from 'taste-ui/index';
import { NavigationBarProps } from 'components/TaroNavigationBar/type';
interface IProps extends NavigationBarProps {
	children: ReactNode;
}

const PageContainer: FC<IProps> = (props) => {
	const { children } = props;
	const { popupVisible } = useSelector(({ tabBarState }) => tabBarState);
	const dispatch = useDispatch();

	return (
		<Block>
			<TaroNavigationBar />
			{children}
			<UPopup visible={popupVisible} placement="bottom" rounded>
				<View>测试</View>
			</UPopup>
		</Block>
	);
};

export default memo(PageContainer);
