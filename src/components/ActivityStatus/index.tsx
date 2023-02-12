import { FC, memo } from 'react';
import { View, Text } from '@tarojs/components';
import cls from 'classnames';

import cx from './index.module.scss';

interface IProps {
	activityStatus: string | '0' | '1' | '2;';
}
const statusInfo = {
	0: '未开始',
	1: '报名中',
	2: '已结束'
};

const ActivityStatus: FC<IProps> = (props) => {
	const { activityStatus } = props;

	return (
		<View
			className={cls(
				cx['activity-status'],
				activityStatus === '1' && cx[`activity-status__start`]
			)}
		>
			<View className={cx['activity-status__text']}>
				{statusInfo[activityStatus]}
			</View>
		</View>
	);
};

export default memo(ActivityStatus);
