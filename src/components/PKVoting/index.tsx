import {
	FC,
	isValidElement,
	memo,
	ReactNode,
	CSSProperties,
	useMemo
} from 'react';
import cls from 'classnames';
import { Image, View } from '@tarojs/components';

import { UCard } from 'taste-ui/index';

import { UWithNaming } from 'utils/bem';

import cx from './index.module.scss';

interface IProps {
	type: 'PK' | 'VOTE';
	style: CSSProperties;
}

const defaultProps = {
	type: 'PK',
	style: {}
} as IProps;

const bem = UWithNaming({ n: 'pk-' });
const b = bem('com');

const cardInfo = {
	PK: {
		leftIcon: 'https://s1.ax1x.com/2023/02/12/pS5oaBd.png',
		bgIcon: 'https://s1.ax1x.com/2023/02/10/pShGch4.png',
		title:
			'你支持参加汉服活动吗？你支持参加汉服活动吗？你支持参加汉服活动吗？你支持参加汉服活动吗？你支持参加汉服活动吗？',
		subTitle: '闲余时间你愿意参加汉服活动吗闲余时间你愿意参加汉服活动吗闲余时间你愿意参加汉服活动吗闲余时间你愿意参加汉服活动吗闲余时间你愿意参加汉服活动吗闲余时间你愿意参加汉服活动吗',
		status: ''
	},
	VOTE: {
		leftIcon: 'https://s1.ax1x.com/2023/02/12/pS5oUnH.png',
		bgIcon: 'https://s1.ax1x.com/2023/02/10/pShG29J.png',
		title: '汉服圈经常参加哪些活动？',
		subTitle: '',
		status: ''
	}
};

const PKVoting: FC<Partial<IProps>> = (props) => {
	const { type, style } = { ...defaultProps, ...props };

	const { bgIcon, title, leftIcon, subTitle } = useMemo(
		() => cardInfo[type],
		[type]
	);

	return (
		<UCard
			className={cx[b()]}
			title={title}
			leftIcon={leftIcon}
			style={{
				background: `url(${bgIcon}) 0 0/100% 100% no-repeat`,
				...style
			}}
		>
			<View r-if={subTitle} className={cls(cx[b('subtitle')], 'ellipsis')}>
				{subTitle}
			</View>
			<View className={cx[b('body')]}>
				<View
					className={cls(cx[b('body-pk-btn')], cx[b('body-pk-results')])}
					r-if={type == 'PK'}
				>
					<View
						className={cls(
							cx[b('body-pk-btn-skew')],
							cx[b('body-pk-btn-support')]
						)}
						style={{ width: '50%' }}
					>
						90%
					</View>
					<View
						className={cls(
							cx[b('body-pk-btn-skew')],
							cx[b('body-pk-btn-oppose')]
						)}
						style={{ width: '50%' }}
					>
						反对
					</View>
				</View>
				<View className={cx['body-vote']} r-if={type === 'VOTE'}></View>
			</View>
		</UCard>
	);
};

PKVoting.defaultProps = defaultProps;

export default memo(PKVoting);
