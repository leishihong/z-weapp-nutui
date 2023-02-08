import React from 'react';
import { Button,Elevator } from '@nutui/nutui-react-taro';

import {
	EmptyPage,
	UPopup,
	UIndicator,
	UNoticeBar,
	UElevator
} from 'components/index';
import cx from './index.module.scss';

const Index = () => {
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
		<div className={cx['nutui-react']}>
			{/* <Elevator
				indexList={dataList}
				height="400"
				isSticky
				onClickItem={(key: string, item: any) => onClickItem(key, item)}
				onClickIndex={(key: string) => onClickIndex(key)}
			/> */}
			<UElevator
				indexList={dataList}
				height="400"
				isSticky
				onClickItem={(key: string, item: any) => onClickItem(key, item)}
				onClickIndex={(key: string) => onClickIndex(key)}
			/>
			<EmptyPage />
			<Button type="primary">NutUI React Button</Button>
			<UNoticeBar scrollable>
				在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
			</UNoticeBar>
			<UNoticeBar scrollable={false}>
				在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
			</UNoticeBar>
			<UIndicator block />
			<UPopup visible={false} placement="bottom" rounded>
				<Button type="primary">NutUI React Button</Button>
			</UPopup>
		</div>
	);
};

export default Index;
