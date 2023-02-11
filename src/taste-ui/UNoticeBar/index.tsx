import React, {
	useState,
	useEffect,
	useRef,
	CSSProperties,
	useMemo,
	isValidElement,
	FC,
	memo,
	MouseEvent,
	useCallback,
	ReactNode
} from 'react';
import { View, Block, Image, Swiper, SwiperItem } from '@tarojs/components';
import { ViewProps } from '@tarojs/components/types/View';
import { nextTick, useDidShow } from '@tarojs/taro';
import cls from 'classnames';

import IconCloseDark from 'assets/icon-close-dark.png';

import bem from 'utils/bem';
import { getRect } from 'utils/dom/rect';
import { doubleRaf } from 'utils/raf';

import cx from './index.module.scss';

export interface NoticeBarProps extends ViewProps {
	// 滚动方向  across 横向 vertical 纵向
	direction?: string;
	className?: string;
	style?: CSSProperties;
	delay?: number;
	speed?: number;
	scrollable?: boolean;
	wrapable?: boolean;
	children?: ReactNode;
	leftIcon?: any;
	rightIcon?: any;
	closeMode?: boolean;
	barActionCls?: string;
	barLeftIconCls?: string;
	dataSource?: Array<any>;
	close?: (event: any) => void;
	click?: (event: any) => void;
	onClose?: (event: any) => void;
	onClick?: (event: any) => void;
	onClickItem?: (event: any, value: any) => void;
	[key: string]: any;
}

const UNoticeBar: FC<NoticeBarProps> = (props) => {
	const {
		direction = 'across',
		className,
		delay = 1000,
		speed = 60,
		wrapable = false,
		leftIcon,
		rightIcon,
		scrollable = false,
		closeMode = false,
		children,
		barLeftIconCls,
		barActionCls,
		dataSource = [],
		close,
		click,
		onClose,
		onClick,
		onClickItem,
		...restProps
	} = props;
	const b = bem('notice');

	const ellipsis = !scrollable && !wrapable;
	const startTimerRef = useRef<NodeJS.Timeout>();
	const wrapRef = useRef();
	const contentRef = useRef();

	const [offset, setOffset] = useState(0);
	const [duration, setDuration] = useState(0);

	const wrapWidthRef = useRef(0);
	const contentWidthRef = useRef(0);

	const [showNoticeBar, setShowNoticeBar] = useState(true);

	const contentStyle = useMemo<CSSProperties>(
		() => ({
			transform: offset ? `translateX(${offset}px)` : '',
			transitionDuration: `${duration}s`
		}),
		[offset, duration]
	);

	function reset() {
		wrapWidthRef.current = 0;
		contentWidthRef.current = 0;
		setOffset(0);
		setDuration(0);
	}

	function onTransitionEnd() {
		setOffset(wrapWidthRef.current);
		setDuration(0);

		nextTick(() => {
			// use double raf to ensure animation can start
			doubleRaf(() => {
				setOffset(-contentWidthRef.current);
				setDuration((contentWidthRef.current + wrapWidthRef.current) / +speed);
			});
		});
	}

	function start() {
		reset();

		if (startTimerRef.current) {
			clearTimeout(startTimerRef.current);
		}

		startTimerRef.current = setTimeout(async () => {
			if (!wrapRef.current || !contentRef.current || !scrollable) {
				return;
			}

			nextTick(() =>
				Promise.all([getRect(wrapRef), getRect(contentRef)]).then(
					([{ width: wrapRefWidth }, { width: contentRefWidth }]) => {
						if (scrollable || contentRefWidth > wrapRefWidth) {
							doubleRaf(() => {
								wrapWidthRef.current = wrapRefWidth;
								contentWidthRef.current = contentRefWidth;
								setOffset(-contentRefWidth);
								setDuration(contentRefWidth / +speed);
							});
						}
					}
				)
			);
		}, +delay);
	}
	useDidShow(() => {
		nextTick(start);
	});
	useEffect(() => {
		return () => {
			reset();
			clearTimeout(startTimerRef.current);
		};
	}, []);

	const onClickIcon = useCallback((event) => {
		event.stopPropagation();
		setShowNoticeBar(!closeMode);
		close?.(event);
		onClose?.(event);
	}, []);
	const handleClick = useCallback((event) => {
		click?.(event);
		onClick?.(event);
	}, []);

	const renderIconBg = useMemo(() => {
		if (!leftIcon) return <Block />;
		if (isValidElement(leftIcon)) {
			return leftIcon;
		}
		return (
			<View className={cls(cx[b('bar__icon')], barLeftIconCls)}>
				<Image lazyLoad src={leftIcon} mode="aspectFill" />
			</View>
		);
	}, [leftIcon]);
	const renderExtraAction = useMemo(() => {
		if (closeMode) {
			return isValidElement(rightIcon) ? (
				rightIcon
			) : (
				<View className={cls(cx[b('bar__close')])} onClick={onClickIcon}>
					<Image lazyLoad src={rightIcon || IconCloseDark} mode="aspectFill" />
				</View>
			);
		}
		if (isValidElement(rightIcon)) {
			return rightIcon;
		}
		if (!rightIcon) return <Block />;
		return (
			<View className={cls(cx[b('bar__action')], barActionCls)}>
				<Image lazyLoad src={rightIcon} mode="aspectFill" />
			</View>
		);
	}, [rightIcon, closeMode]);

	return (
		<View className={cls(cx[b('')])}>
			{showNoticeBar && (
				<View
					className={cls(
						cx[b('bar')],
						{
							[cx[b('bar--wrapable')]]: wrapable
						},
						className
					)}
					{...restProps}
				>
					{renderIconBg}
					<View ref={wrapRef} className={cx[b('bar__wrap')]}>
						<View
							ref={contentRef}
							style={contentStyle}
							className={cls(cx[b('bar__content')], {
								[cls(cx['ellipsis'], 'ellipsis')]: ellipsis
							})}
							children={children}
							onTransitionEnd={onTransitionEnd}
							onClick={handleClick}
						/>
					</View>
					{renderExtraAction}
				</View>
			)}
		</View>
	);
};

export default memo(UNoticeBar);
