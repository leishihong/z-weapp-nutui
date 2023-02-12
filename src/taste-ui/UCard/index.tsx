import {
	FC,
	isValidElement,
	memo,
	ReactNode,
	CSSProperties,
	useCallback
} from 'react';
import cls from 'classnames';
import { Image, View } from '@tarojs/components';
import bem from 'utils/bem';
import IconArrowMore from 'assets/icon-arrow-more.png';

import cx from './index.module.scss';

export interface ICardProps {
	title: string | ReactNode;
	className: string;
	leftIcon: string | ReactNode | any;
	rightIcon: String | ReactNode | any;
	extra: ReactNode | string | any;
	children: string | ReactNode;
	bodyStyle: CSSProperties;
	showMoreIcon: boolean;
	style: CSSProperties | any;
	headerStyle: CSSProperties;
	ellipsis: boolean;
	onExtraClick: () => void;
	onRightIconClick: () => void;
}

const defaultProps = {
	className: '',
	bodyStyle: {},
	title: '',
	children: '',
	leftIcon: '',
	rightIcon: '',
	showMoreIcon: false,
	ellipsis: true,
	extra: IconArrowMore,
	style: {},
	headerStyle: {},
	onExtraClick: () => {},
	onRightIconClick: () => {}
} as ICardProps;

const UCard: FC<Partial<ICardProps>> = (props) => {
	const {
		className,
		showMoreIcon,
		title,
		leftIcon,
		children,
		extra,
		rightIcon,
		bodyStyle,
		style,
		ellipsis,
		headerStyle,
		onExtraClick,
		onRightIconClick
	} = {
		...defaultProps,
		...props
	};
	const b = bem('card');

	const handleExtra = useCallback(() => {
		onExtraClick?.();
	}, [showMoreIcon]);
	const handleRight = useCallback(() => {
		onRightIconClick?.();
	}, []);
	return (
		<View className={cls(cx[b()], className)} style={style}>
			<View className={cx[b('header')]} style={headerStyle}>
				<View className={cx[b('header__wrapper')]}>
					<View className={cx[b('header-left')]} r-if={leftIcon}>
						{isValidElement(leftIcon) ? (
							leftIcon
						) : (
							<Image
								src={leftIcon}
								mode="aspectFill"
								className={cx[b('header-left-icon')]}
							/>
						)}
					</View>
					{isValidElement(title) && title}
					<View
						className={cls(cx[b('header-title')], { ellipsis: ellipsis })}
						r-if={!isValidElement(title)}
					>
						{title}
					</View>
					<View
						className={cx[b('header-right')]}
						r-if={rightIcon}
						onClick={handleRight}
					>
						{isValidElement(rightIcon) ? (
							rightIcon
						) : (
							<Image
								src={rightIcon}
								mode="aspectFill"
								className={cx[b('header-right-icon')]}
							/>
						)}
					</View>
				</View>
				<View className={cx[b('header-extra')]} onClick={handleExtra}>
					{isValidElement(extra) && showMoreIcon && extra}
					<Image
						src={extra}
						r-if={!isValidElement(extra) && showMoreIcon}
						className={cx[b('header-extra-icon')]}
						mode="aspectFill"
					/>
				</View>
			</View>
			<View className={cx[b('body')]} r-if={children} style={bodyStyle}>
				{children}
			</View>
		</View>
	);
};

UCard.defaultProps = defaultProps;
export default memo(UCard);
