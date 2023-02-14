import { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import Taro from '@tarojs/taro';
import cls from 'classnames';

import { PageContainer, PKVoting, AdvertiseArea, ActivityCard, CommunityCard } from 'components/index';
import { UTabs, UCard, Avatar } from 'taste-ui/index';

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
    <PageContainer title='' isImmersive isCustomNavBar showNavBar selectedIndex={0}>
      <View className={cx[b('')]}>
        <View className={cx[b('top')]}></View>
        <View className={cx[b('body')]}>
          <ActivityCard title='热门推荐' dataSource={[{ title: '活动名称占位最多显示两行字符活动名称...' }]} />
          <AdvertiseArea capsuleType='1' />
          <PKVoting type='PK' />
          <PKVoting type='VOTE' style={{ height: '436rpx' }} />
          <UCard className={cx[b('knowledge')]} showCardHeader={false}>
            <Avatar
              src='https://img.mtaste.cn/test/img/system/knowledge/e0bd4436fa464088979194ef848ac4ff.jpg'
              size={[686, 400]}
              shape='rounded'
            />
            <View className={cls(cx[b('knowledge-title')], 'ellipsis')}>【ozzon上新】花鸟龙月生成色怎么搭配</View>
          </UCard>
          <CommunityCard
            title='社团'
            dataSource={[
              {
                title:
                  '活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称...'
              },
              { title: '活动名称占位最多显示两行字符活动名称...' }
            ]}
            showMoreIcon
          />
          <ActivityCard
            title='找活动'
            dataSource={[
              {
                title:
                  '活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称活动名称占位最多显示两行字符活动名称...'
              },
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
                { id: '3', title: '新1鲜' },
                { id: '11', title: '漫2展' },
                { id: '22', title: '国3风' },
                { id: '33', title: '新412212鲜' },
                { id: '131', title: '漫1sdsdsd2展' },
                { id: '242', title: 'sdsd' },
                { id: '353', title: '新sdsd4鲜' }
              ]}
              value={tabActive}
              valueKey='id'
              valueLabel='title'
              onClick={handleTabClick}
            />
          </ActivityCard>
        </View>
      </View>
    </PageContainer>
  );
};

export default HomePage;
