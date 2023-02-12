import {
	FC,
	memo,
	ReactNode,
	useState,
	useMemo,
	useEffect,
	useCallback
} from 'react';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import Taro, {
	showModal,
	showToast,
	useDidShow,
	usePageScroll,
	useTabItemTap,
	useReady,
	useShareAppMessage,
	ShareAppMessageObject
} from '@tarojs/taro';

import { TaroNavigationBar } from 'components/index';
import { UPopup } from 'taste-ui/index';
import { NavigationBarProps } from 'components/TaroNavigationBar/type';
interface IProps extends NavigationBarProps {
	title: string;
	children: ReactNode;
	isCustomNavBar: boolean;
}

const defaultProps = {
	isCustomNavBar: false
} as IProps;

const PageContainer: FC<Partial<IProps>> = (props) => {
	const { children, title, isImmersive, isCustomNavBar, ...resetProps } = props;

	const { popupVisible } = useSelector(({ tabBarState }) => tabBarState);
	const { system } = useSelector(({ globalsState }) => globalsState);
	const dispatch = useDispatch();
	const { navBarHeight, navBarExtendHeight } = useMemo(() => system, []);

	const [navBarInfo, setNavBarInfo] = useState<any>({
		isImmersive,
		background: `linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)`,
		title
	});
	usePageScroll((payload) => {
		const { scrollTop } = payload;
		let navOp = scrollTop / (navBarHeight + navBarExtendHeight);
		if (isCustomNavBar) {
			setNavBarInfo((preState) =>
				Object.assign({}, preState, {
					background:
						scrollTop > 10
							? `rgba(255, 255, 255, ${navOp > 1 ? 1 : navOp})`
							: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)',
					title: scrollTop > 10 ? title : ''
				})
			);
		}
	});

	return (
		<Block>
			<TaroNavigationBar
				{...resetProps}
				{...navBarInfo}
				r-if={isCustomNavBar}
			/>
			{children}
			<UPopup visible={popupVisible} placement="bottom" rounded>
				<View>测试</View>
			</UPopup>
		</Block>
	);
};
PageContainer.defaultProps = defaultProps;

export default memo(PageContainer);
