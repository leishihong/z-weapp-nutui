import React, { useEffect, FC, memo } from 'react';
import { View, Image } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import Taro from '@tarojs/taro';
import {
	PageContainer,
	PKVoting,
	AdvertiseArea,
	ActivityCard
} from 'components/index';

import {
	EmptyPage,
	UPopup,
	UIndicator,
	UNoticeBar,
	UElevator,
	UEditor,
	UButton,
	UCard
} from 'taste-ui/index';

import { UWithNaming } from 'utils/bem';

import cx from './index.module.scss';

const bme = UWithNaming({ n: 'home-' });

const ChooseCity: FC = () => {
	const dataList = [
		{
			title: 'A',
			list: [
				{
					name: '安徽',
					id: 1
				}
			]
		},
		{
			title: 'B',
			list: [
				{
					name: '北京',
					id: 2
				}
			]
		},
		{
			title: 'C',
			list: [
				{
					name: '重庆',
					id: 3
				}
			]
		},
		{
			title: 'F',
			list: [
				{
					name: '福建',
					id: 4
				}
			]
		},
		{
			title: 'G',
			list: [
				{
					name: '广西',
					id: 5
				},
				{
					name: '广东',
					id: 6
				},
				{
					name: '甘肃',
					id: 7
				},
				{
					name: '贵州',
					id: 8
				}
			]
		},
		{
			title: 'H',
			list: [
				{
					name: '湖南',
					id: 9
				},
				{
					name: '湖北',
					id: 10
				},
				{
					name: '海南',
					id: 11
				},
				{
					name: '河北',
					id: 12
				},
				{
					name: '河南',
					id: 13
				},
				{
					name: '黑龙江',
					id: 14
				}
			]
		},
		{
			title: 'J',
			list: [
				{
					name: '吉林',
					id: 15
				},
				{
					name: '江苏',
					id: 16
				},
				{
					name: '江西',
					id: 17
				}
			]
		},
		{
			title: 'L',
			list: [
				{
					name: '辽宁',
					id: 18
				}
			]
		}
	];
	const onClickItem = (key: string, item: any) => {
		console.log(key, JSON.stringify(item));
	};

	const onClickIndex = (key: string) => {
		console.log(key);
	};
	return (
		<View>
			<UElevator
				indexList={dataList}
				height="980"
				isSticky
				onClickItem={(key: string, item: any) => onClickItem(key, item)}
				onClickIndex={(key: string) => onClickIndex(key)}
			/>
		</View>
	);
};

export default memo(ChooseCity)