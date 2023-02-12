import { FC, memo, ReactNode, CSSProperties } from 'react';
import { Image, View, Block } from '@tarojs/components';
import { isEmpty, map } from 'lodash';
import cls from 'classnames';

import { UCard, UButton, Avatar } from 'taste-ui/index';
import ActivityStatus from 'components/ActivityStatus';

import bem from 'utils/bem';

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
						<View className={cls(cx[b('list-desc-address')])}>北京·鼓西33</View>
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

const ActivityCard: FC<Partial<IProps>> = (props) => {
	const { title, style, className, dataSource, children, showMoreIcon } = {
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
				{Array.isArray(dataSource) ? (
					map(dataSource, (item, index) => (
						<ActivityListItem curItem={item} key={index} />
					))
				) : (
					<ActivityListItem curItem={dataSource} />
				)}
			</View>
		</UCard>
	);
};

ActivityCard.defaultProps = defaultProps;

export default memo(ActivityCard);
