import React, { useEffect } from 'react';
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

import { storageCache } from 'utils/storageCache';
import { UWithNaming } from 'utils/bem';

import cx from './index.module.scss';

const bme = UWithNaming({ n: 'home-' });
const b = bme('page');

const Index = () => {


	return (
		<PageContainer title="" isImmersive isCustomNavBar selectedIndex={0}>
			<View className={cx[b('')]}>
				<View className={cx[b('top')]}></View>
				<View className={cx[b('body')]}>
					<ActivityCard
						title="热门推荐"
						dataSource={[{ title: '活动名称占位最多显示两行字符活动名称...' }]}
					/>
					<AdvertiseArea capsuleType="1" />
					<PKVoting type="PK" />
					<PKVoting type="VOTE" style={{ height: '436rpx' }} />
					<UCard title="社团" showMoreIcon></UCard>
					<ActivityCard
						title="找活动"
						dataSource={[
							{ title: '活动名称占位最多显示两行字符活动名称...' },
							{ title: '活动名称占位最多显示两行字符活动名称...' },
							{ title: '活动名称占位最多显示两行字符活动名称...' },
							{ title: '活动名称占位最多显示两行字符活动名称...' },
							{ title: '活动名称占位最多显示两行字符活动名称...' },
							{ title: '活动名称占位最多显示两行字符活动名称...' },
							{ title: '活动名称占位最多显示两行字符活动名称...' }
						]}
						showMoreIcon
					></ActivityCard>
				</View>
			</View>
		</PageContainer>
	);
};

export default Index;
