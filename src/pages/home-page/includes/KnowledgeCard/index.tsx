import { FC, memo, useState, useCallback } from 'react';
import { View, Image } from '@tarojs/components';
import cls from 'classnames';

import { UCard } from 'taste-ui/index';

import cx from './index.module.scss';

interface IProps {
	src: string;
	title: string;
}

const KnowledgeCard: FC<IProps> = (props) => {
	const { title, src } = props;
	return (
		<UCard className={cx['knowledge']}>
			<View className={cx['knowledge-cover']}>
				<Image src={src} />
			</View>
			<View className={cls(cx['knowledge-title'], 'ellipsis')}>{title}</View>
		</UCard>
	);
};

export default memo(KnowledgeCard);
