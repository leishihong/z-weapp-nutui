import React, { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import Taro from '@tarojs/taro';
import {
	PageContainer,
	PKVoting,
	AdvertiseArea,
	ActivityCard,
	CommunityCard
} from 'components/index';

import UTabs from 'components/UTabs';
import KnowledgeCard from './includes/KnowledgeCard'

import { storageCache } from 'utils/storageCache';
import { UWithNaming } from 'utils/bem';

import cx from './index.module.scss';

const bme = UWithNaming({ n: 'home-' });
const b = bme('page');

const HomePage = () => {
	const [tabActive, setTabActive] = useState<string | number>('');
	const handleTabClick = (tabItem) => {
		console.log(tabItem, 'tabItem');
		setTabActive(tabItem.id);
	};

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
          <KnowledgeCard src="" title="【ozzon上新】花鸟龙月生成色怎么搭配" />
					<CommunityCard
						title="社团"
						dataSource={[
							{ title: '活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称...' },
							{ title: '活动名称占位最多显示两行字符活动名称...' }
						]}
						showMoreIcon
					/>
					<ActivityCard
						title="找活动"
						dataSource={[
							{ title: '活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称...' },
							{ title: '活动名称占位最多显示两行字符活动名称...' },
							{ title: '活动名称占位最多显示两行字符活动名称...' },
							{ title: '活动名称占位最多显示两行字符活动名称...' },
							{ title: '活动名称占位最多显示两行字符活动名称...' },
							{ title: '活动名称占位最多显示两行字符活动名称...' },
							{ title: '活动名称占位最多显示两行字符活动名称...' }
						]}
						showMoreIcon
					>
						<UTabs
							dataSource={[
								{ id: '', title: '全部' },
								{ id: '1', title: '漫展' },
								{ id: '2', title: '国风' },
								{ id: '3', title: '新鲜' },
							]}
							value={tabActive}
							valueKey="id"
							valueLabel="title"
							onClick={handleTabClick}
						/>
					</ActivityCard>
				</View>
			</View>
		</PageContainer>
	);
};

export default HomePage;
