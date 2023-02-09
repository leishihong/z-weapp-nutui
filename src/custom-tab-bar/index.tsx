import React, {
	FC,
	memo,
	useMemo,
	useEffect,
	useRef,
	useCallback,
	Fragment
} from 'react';
import Taro, { getSystemInfoSync } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import cls from 'classnames';
import { TAB } from 'constants/router';

import cx from './index.module.scss';

const CustomTabBar: FC = () => {
	const {
		tabList,
		color,
		selectedColor,
		selectedIndex = 0,
		showTabBar
	} = useSelector(({ tabBarState }) => tabBarState);
	const dispatch = useDispatch();

	const onSwitchTab = useCallback(
		(item, index: number) => {
			Taro.vibrateShort({ type: 'medium' });
			Taro.switchTab({
				url: TAB[item.pageName],
				success: () => {
					dispatch({
						type: 'tabBarState/setState',
						payload: { selectedIndex: index }
					});
				}
			});
		},
		[dispatch]
	);

	const renderTabBar = useMemo(() => {
		return (
			<View
				className={cls(cx['tab-bar'], 'safe-area-bottom',{[cx['show-tab-bar']]:showTabBar})}
			>
				{tabList.map((item, index) => {
					return (
						<View
							className={cls(cx['tab-bar-item'], {
								[cx['tab-bar-item--active']]: selectedIndex === index
							})}
							onClick={() => onSwitchTab(item, index)}
							data-path={item.pagePath}
							key={item.pagePath}
						>
							<Image
								className={cx['tab-bar-item-icon']}
								src={
									selectedIndex === index
										? item.selectedIconPath
										: item.iconPath
								}
							/>
							<View
								className={cx['tab-bar-item-title']}
								style={{
									color: selectedIndex === index ? selectedColor : color
								}}
							>
								{item.text}
							</View>
						</View>
					);
				})}
			</View>
		);
	}, [selectedIndex, showTabBar]);

	return renderTabBar;
};

export default memo(CustomTabBar);
