import {
	FC,
	memo,
	ReactNode,
	cloneElement,
	Children,
	useMemo,
	ReactElement,
	ReactChild,
	isValidElement,
	JSXElementConstructor,
	CSSProperties
} from 'react';
import { View, Image } from '@tarojs/components';
import cls from 'classnames';
import { isFunction, endsWith, isEmpty, size, get } from 'lodash';

import { IMode, AvatarShape, AvatarSize, AvatarSpacing } from './type';

import cx from './index.module.scss';

export interface IAvatarProps {
	rootCls?: string;
	shape?: AvatarShape;
	avatarGroup?: Array<any>;
	src?: string | any;
	fit?: IMode;
	size?: AvatarSize | number | number[];
	spacing?: AvatarSpacing;
	children?: ReactNode;
	style?: CSSProperties;
	onAvatar?: (event) => void;
}

export function isElementOf(
	node?: ReactNode,
	type?: JSXElementConstructor<any>
) {
	if (isValidElement(node)) {
		const element = node as ReactElement;
		if (element.type === type) {
			return true;
		}

		const displayName = get(element.type, 'displayName');
		if (
			isFunction(element.type) &&
			!isEmpty(displayName) &&
			endsWith(displayName, get(type, 'displayName'))
		) {
			return true;
		}
	}
	return false;
}
const useAvatars = (
	children: ReactNode,
	shape: AvatarShape,
	limit: number
): [ReactNode[], number] => {
	return useMemo(() => {
		const avatars = Children.toArray(children).filter(
			(child) => isValidElement(child) && isElementOf(child, Avatar)
		);
		const avatarsSize = size(avatars);
		const luckyAvatars: ReactNode[] = [];
		const length = Math.min(avatarsSize, limit);
		for (let index = 0; index < length; index++) {
			const child = get(avatars, index) as ReactChild;
			const element = child as ReactElement<IAvatarProps>;
			const { key, props } = element;
			const { style, children, ...restProps } = props;
			luckyAvatars.push(
				cloneElement(
					element,
					{
						key: key ?? index,
						shape,
						style: {
							...style,
							zIndex: index
						},
						...restProps
					},
					children
				)
			);
		}
		return [luckyAvatars, avatarsSize];
	}, [children, limit, shape]);
};

const Avatar: FC<Partial<IAvatarProps>> = (props) => {
	const {
		src,
		rootCls,
		shape = 'circle',
		size = 'medium',
		spacing = 'medium',
		fit = 'aspectFill',
		onAvatar,
		children,
		...restProps
	} = props;

	const sizeStyle = useMemo(() => {
		return typeof size === 'number'
			? {
					width: `${size}rpx`,
					height: `${size}rpx`,
					minWidth: `${size}rpx`
			  }
			: Array.isArray(size)
			? {
					width: `${size[0]}rpx`,
					minWidth: `${size[0]}rpx}`,
					height: `${size[1]}rpx`
			  }
			: size ?? {};
	}, [size]);

	return (
		<View
			className={cls(
				cx.avatar,
				{
					[cx[`avatar--circle`]]: shape === 'circle',
					[cx[`avatar--square`]]: shape === 'square',
					[cx[`avatar--rounded`]]: shape === 'rounded'
				},
				rootCls
			)}
			{...restProps}
			style={sizeStyle}
		>
			{children ? (
				children
			) : (
				<Image
					lazyLoad
					src={src}
					mode={fit}
					className={cx['avatarImage']}
					onClick={onAvatar}
				/>
			)}
		</View>
	);
};

interface AvatarGroupProps {
	children: ReactNode[];
	shape?: AvatarShape;
	spacing?: AvatarSpacing;
	limit?: number;
	total?: number;
	className?: string;
	rootCls?: string;
}

const AvatarGroup: FC<Partial<AvatarGroupProps>> = (props) => {
	const {
		rootCls,
		className,
		shape = 'circle',
		limit = Number.MAX_VALUE,
		spacing = 'small',
		total,
		children
	} = props;

	const [avatars, avatarsSize] = useAvatars(children, shape, limit);
	console.log(avatars, avatarsSize, 'avatars, avatarsSize');
	return (
		<View
			className={cls(
				cx('avatar-group'),
				{
					[cx('avatar-group--spacing-mini')]: spacing === 'mini',
					[cx('avatar-group--spacing-small')]: spacing === 'small',
					[cx('avatar-group--spacing-medium')]: spacing === 'medium',
					[cx('avatar-group--spacing-large')]: spacing === 'large'
				},
				rootCls,
				className
			)}
		>
			{avatars}
			{avatarsSize >= limit && (
				<Avatar shape={shape} style={{ zIndex: avatarsSize }}>
					+{total ? total - limit : avatarsSize - limit}
				</Avatar>
			)}
		</View>
	);
};

export default Avatar;

export { AvatarGroup };
