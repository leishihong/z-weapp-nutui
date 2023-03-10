import { FC, memo, ReactNode, CSSProperties, useCallback } from 'react';
import { Image, View, Block } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { isEmpty, map } from 'lodash';
import cls from 'classnames';

import { UCard, UButton, Avatar } from 'taste-ui/index';
import ActivityStatus from 'components/ActivityStatus';

import bem from 'utils/bem';
import { storageCache } from 'utils/storageCache';
import { jumpSetCallback, stringifyQuery } from 'utils/utils';
import { URL } from 'constants/router';

import cx from './index.module.scss';

interface IProps {
	title: string;
	style: CSSProperties;
	className: string;
	dataSource: any[];
	children: ReactNode;
	showMoreIcon: boolean;
}

const defaultProps = {
	title: '',
	style: {},
	className: '',
	dataSource: [],
	children: '',
	showMoreIcon: false
} as IProps;

const b = bem('activity');

export const ActivityListItem: FC<any> = ({ curItem }) => {
	return (
		<View className={cls(cx[b('list')])}>
			<View className={cls(cx[b('list-body')])}>
				<View className={cls(cx[b('list-cover')])}>
					<ActivityStatus activityStatus="1" />
					<Image
						src="https://s1.ax1x.com/2023/02/12/pSIKWUe.png"
						lazyLoad
						mode="aspectFill"
						className={cls(cx[b('list-cover-image')])}
					/>
				</View>
				<View className={cls(cx[b('list-desc')])}>
					<View className={cls(cx[b('list-desc-title')], 'multi-ellipsis--l2')}>
						{curItem.title}
					</View>
					<View className={cls(cx[b('list-desc-wrapper')])}>
						<View className={cls(cx[b('list-desc-time')])}>
							2023.02.07 - 2023.02.09
						</View>
						<View className={cls(cx[b('list-desc-address'),'ellipsis'])}>北京·鼓西33</View>
						<View className={cls(cx[b('list-desc-sponsor')])}>
							<View className={cls(cx[b('list-desc-sponsor-avatar')])}></View>
							<View
								className={cls(cx[b('list-desc-sponsor-title')], 'ellipsis')}
							>
								PHC大力顽俱乐部
							</View>
						</View>
					</View>
				</View>
			</View>
			<View className={cls(cx[b('list-extra')])}>
				<View className={cls(cx[b('list-extra-icon')])}>
					{/* <Avatar.Group limit={4} total={30}>
						<Avatar src="https://joeschmoe.io/api/v1/random" />
						<Avatar src="https://joeschmoe.io/api/v1/random" />
						<Avatar src="https://joeschmoe.io/api/v1/random" />
						<Avatar src="https://joeschmoe.io/api/v1/random" />
						<Avatar src="https://joeschmoe.io/api/v1/random" />
						<Avatar src="https://joeschmoe.io/api/v1/random" />
					</Avatar.Group> */}
					<View className={cls(cx[b('list-extra-desc')])}>210人已报名</View>
				</View>
				<UButton
					className={cls(cx[b('list-extra-btn')])}
					size="small"
					type="primary"
				>
					报名
				</UButton>
			</View>
		</View>
	);
};

export const ActivityList: FC<Partial<{ dataSource: any[] }>> = (props) => {
	const { dataSource = [] } = props;

	const handleDetail = useCallback(
		async (curItem: any, index: number = 0) => {
			const AUTH_TOKEN = await storageCache('AUTH-TOKEN');
			if (AUTH_TOKEN) {
				Taro.navigateTo({ url: URL['activity-square'] });
			} else {
				jumpSetCallback({
					url: URL['activity-square'],
					type: 'page',
					webviewType: 'redirect'
				});
				Taro.redirectTo({ url: URL['login'] });
			}
		},
		[dataSource]
	);

	return (
		<Block>
			{Array.isArray(dataSource) ? (
				map(dataSource, (item, index) => (
					<ActivityListItem
						curItem={item}
						key={index}
						onClick={() => handleDetail(item, index)}
					/>
				))
			) : (
				<ActivityListItem
					curItem={dataSource}
					onClick={() => handleDetail(dataSource, 0)}
				/>
			)}
		</Block>
	);
};

const ActivityCard: FC<Partial<IProps>> = (props) => {
	const {
		title,
		style,
		className,
		dataSource,
		children,
		showMoreIcon,
		...resetProps
	} = {
		...defaultProps,
		...props
	};

	if (isEmpty(dataSource)) return <Block />;

	return (
		<UCard
			className={cls(cx[b()], className)}
			title={title}
			style={style}
			showMoreIcon={showMoreIcon}
		>
			<View className={cls(cx[b('body')])}>
				{children}
				<ActivityList dataSource={dataSource} {...resetProps} />
			</View>
		</UCard>
	);
};

ActivityCard.defaultProps = defaultProps;

export default memo(ActivityCard);
