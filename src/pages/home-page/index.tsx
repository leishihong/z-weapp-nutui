import React from 'react';
import { View } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';

import { PageContainer } from 'components/index';
import {
	EmptyPage,
	UPopup,
	UIndicator,
	UNoticeBar,
	UElevator,
	UEditor,
	UButton
} from 'taste-ui/index';

import { storageCache } from 'utils/storageCache';

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
	storageCache('id');
	const onClickIndex = (key: string) => {
		console.log(key);
	};
	const play = (elm: HTMLVideoElement) => console.log('play', elm);
	const pause = (elm: HTMLVideoElement) => console.log('pause', elm);
	const playend = (elm: HTMLVideoElement) => console.log('playend', elm);
	return (
		<PageContainer>
			<div className={cx['nutui-react']}>
				{/* <Elevator
				indexList={dataList}
				height="400"
				isSticky
				onClickItem={(key: string, item: any) => onClickItem(key, item)}
				onClickIndex={(key: string) => onClickIndex(key)}
			/> */}
				<UButton type="info" plain>
					block
				</UButton>
				{/* <UVideo
				source={{
					src: 'https://storage.360buyimg.com/nutui/video/video_NutUI.mp4',
					type: 'video/mp4'
				}}
				options={{
					controls: true,
					autoplay: true,
					muted: true,
					playsinline: true,
					loop: true
				}}
				onPlayFuc={play}
				onPauseFuc={pause}
				onPlayend={playend}
			/> */}
				<UElevator
					indexList={dataList}
					height="400"
					isSticky
					onClickItem={(key: string, item: any) => onClickItem(key, item)}
					onClickIndex={(key: string) => onClickIndex(key)}
				/>
				<UEditor r-if={false} editorId="test" content="kjkfjkejfkejfkejfk" />
				<EmptyPage />

				<UNoticeBar scrollable>
					在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
				</UNoticeBar>
				<UNoticeBar scrollable={false}>
					在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
				</UNoticeBar>
				<UIndicator block />
				<UPopup visible={false} placement="bottom" rounded>
					在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准
				</UPopup>
			</div>
		</PageContainer>
	);
};

export default Index;
