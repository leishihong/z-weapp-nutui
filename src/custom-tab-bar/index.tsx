import React, { FC, memo, useMemo, useCallback } from 'react';
import Taro, { getSystemInfoSync, nextTick, useDidHide } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import cls from 'classnames';
import { map } from 'lodash';

import { TAB } from 'constants/router';

import cx from './index.module.scss';

const CustomTabBar: FC = () => {
	const {
		tabList,
		selectedIndex = 0,
		showTabBar
	} = useSelector(({ tabBarState }) => tabBarState);
	const dispatch = useDispatch();

	const onSwitchTab = useCallback(
		(item, index: number) => {
			Taro.vibrateShort({ type: 'medium' });

			if (item.divClass) {
				dispatch({
					type: 'tabBarState/setState',
					payload: { showTabBar: true, popupVisible: true }
				});
				return;
			}
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
				className={cls(cx['tab-bar'], 'safe-area-bottom', {
					[cx['show-tab-bar']]: showTabBar
				})}
			>
				{map(tabList, (item, index: number) => {
					const src =
						selectedIndex === index ? item.selectedIconPath : item.iconPath;
					return (
						<View
							className={cls(
								cx['tab-bar-item'],
								{
									[cx['tab-bar-item--active']]:
										selectedIndex === index && item.divClass
								},
								cx[item.divClass]
							)}
							onClick={() => onSwitchTab(item, index)}
							key={index}
						>
							<Image
								className={cls(cx['tab-bar-item-icon'], cx[item.divClass])}
								src={src}
							/>
							<View
								className={cls(cx['tab-bar-item-title'], cx[item.divClass])}
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
