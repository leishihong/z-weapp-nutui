import { useState, FC } from 'react';
import { View, Input } from '@tarojs/components';
import cls from 'classnames';

import { PageContainer } from 'components/index';
import { ActivityList } from 'components/ActivityCard';
import { UTabs } from 'taste-ui/index';

import { UWithNaming } from 'utils/bem';

import cx from './index.module.scss';

const bme = UWithNaming({ n: 'activity-' });
const b = bme('page');

const Index: FC = () => {
  const [tabActive, setTabActive] = useState<string | number>('');
  const handleTabClick = (tabItem) => {
    console.log(tabItem, 'tabItem');
    setTabActive(tabItem.id);
  };
  return (
    <PageContainer selectedIndex={1}>
      <View className={cls(cx[b('')])}>
        <View className={cx[b('header')]}>
          <View className={cx[b('search-input')]}>
            <Input placeholder='搜索' />
          </View>
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
            tabExtra={<View className={cx[b('location')]}>全国</View>}
          />
        </View>
        <View className={cx[b('body')]}>
          <ActivityList
            dataSource={[
              { title: '活动名称占位最多显示两行字符活动名称...' },
              { title: '活动名称占位最多显示两行字符活动名称...' },
              { title: '活动名称占位最多显示两行字符活动名称...' },
              { title: '活动名称占位最多显示两行字符活动名称...' },
              { title: '活动名称占位最多显示两行字符活动名称...' },
              { title: '活动名称占位最多显示两行字符活动名称...' },
              { title: '活动名称占位最多显示两行字符活动名称...' }
            ]}
          />
        </View>
      </View>
    </PageContainer>
  );
};

export default Index;
