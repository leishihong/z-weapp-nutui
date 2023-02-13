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
	ShareAppMessageObject,
	useDidHide
} from '@tarojs/taro';

import { TaroNavigationBar } from 'components/index';
import { UPopup } from 'taste-ui/index';
import { NavigationBarProps } from 'components/TaroNavigationBar/type';
import { TXReverseGeocoder } from 'utils/TX-map';

interface IProps extends NavigationBarProps {
	title: string;
	children: ReactNode;
	isCustomNavBar: boolean;
	selectedIndex: number;
}

const defaultProps = {
	isCustomNavBar: false,
	selectedIndex: 0
} as IProps;

const PageContainer: FC<Partial<IProps>> = (props) => {
	const {
		children,
		title,
		isImmersive,
		isCustomNavBar,
		selectedIndex,
		...resetProps
	} = props;

	const dispatch = useDispatch();
	const tabBarState = useSelector(({ tabBarState }) => tabBarState);
	const { system } = useSelector(({ globalsState }) => globalsState);
	const { navBarHeight, navBarExtendHeight } = useMemo(() => system, []);

	const [navBarInfo, setNavBarInfo] = useState<any>({
		isImmersive,
		background: `linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)`,
		title
	});
	useEffect(() => {
		dispatch({ type: 'tabBarState/setState', payload: { selectedIndex } });
		getFuzzyLocation();
	}, []);

	const getFuzzyLocation = async () => {
		try {
			const locationRes: Taro.getFuzzyLocation.SuccessCallbackResult =
				await Taro.getFuzzyLocation({ type: 'gcj02' });
			if (locationRes?.errMsg.indexOf('ok') !== -1) {
				const { status, result }: any = await TXReverseGeocoder(locationRes);
				if (status === 0) {
					console.log(result, 'result');
				}
			}
		} catch (error: any) {
			if (error?.errMsg.indexOf('deny') !== -1) {
				console.log('用户拒绝授权定位');
			}
			console.log(error, '---');
		}
	};
	useDidHide(() => {
		dispatch({
			type: 'tabBarState/setState',
			payload: { showTabBar: false, popupVisible: false }
		});
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
			<UPopup visible={tabBarState.popupVisible} placement="bottom" rounded>
				<View>测试</View>
			</UPopup>
		</Block>
	);
};
PageContainer.defaultProps = defaultProps;

export default memo(PageContainer);
