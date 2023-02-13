import React from 'react';
import { View } from '@tarojs/components';
import cls from 'classnames';

import { PageContainer } from 'components/index';
import { ActivityList } from 'components/ActivityCard';

import { UWithNaming } from 'utils/bem';

import cx from './index.module.scss';

const bme = UWithNaming({ n: 'activity-' });
const b = bme('page');

const Index = () => {
	return (
		<PageContainer selectedIndex={1}>
			<View className={cls(cx[b('')])}>
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
