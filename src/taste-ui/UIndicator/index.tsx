import React, { memo, FC, ReactNode, useMemo, HTMLAttributes } from 'react';
import cls from 'classnames';
import bem from 'utils/bem';

import { IndicatorProps } from './type';

import cx from './index.module.scss';

const defaultProps = {
	size: 3,
	current: 1,
	block: false,
	align: 'center',
	vertical: false
} as IndicatorProps;

const UIndicator: FC<
	Partial<IndicatorProps> & HTMLAttributes<HTMLDivElement>
> = (props) => {
	const {
		size,
		current,
		block,
		align,
		children,
		className,
		vertical,
		...rest
	} = {
		...defaultProps,
		...props
	};
	const b = bem('indicator');
	const classes = cls(
		{
			[cx[`${b('block')}`]]: block,
			[cx[`${b('align')}__${align}`]]: block && align,
			[cx[`${b('vertical')}`]]: vertical
		},
		cx[b('')]
	);
	const renderEle = useMemo(() => {
		const childEle: ReactNode[] = [];
		for (let item = 1; item <= size; item++) {
			childEle.push(
				<div
					key={item}
					className={cls(cx[b('dot')], {
						[cx[b('dot-activated')]]: item === current
					})}
				/>
			);
		}
		return childEle;
	}, [current]);

	return (
		<div className={`${classes} ${className}`} {...rest}>
			{renderEle}
		</div>
	);
};

export default memo(UIndicator);

UIndicator.defaultProps = defaultProps;
UIndicator.displayName = 'UIndicator';
