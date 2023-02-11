import React, {
	useEffect,
	useCallback,
	useRef,
	CSSProperties,
	useState,
	HTMLAttributes,
	FC,
	memo
} from 'react';
import cls from 'classnames';
import { throttle, isEmpty } from 'lodash';
import Taro from '@tarojs/taro';

import bem from 'utils/bem';

import cx from './index.module.scss';

export interface VideoProps {
	source: {
		type: string;
		src: string;
	};
	options: {
		controls?: boolean;
		muted?: boolean;
		autoplay?: boolean;
		poster?: string;
		playsinline?: boolean;
		loop?: boolean;
		disabled?: boolean;
	};
	className: string;
	style: CSSProperties;
	showToolbox?: boolean;
	playTime: (current: string, total: string) => void;
	play: (e: any) => void;
	pause: (e: any) => void;
	playend: (e: any) => void;
	onPlayFuc: (e: any) => void;
	onPauseFuc: (e: any) => void;
	onPlayend: (e: any) => void;
}

const defaultProps = {
	source: {
		type: {},
		src: ''
	},
	options: {
		controls: true,
		muted: false, // 默认不是静音
		autoplay: false,
		poster: '',
		playsinline: false,
		loop: false,
		disabled: false
	}
} as VideoProps;

const UVideo: FC<Partial<VideoProps> & HTMLAttributes<HTMLDivElement>> = (
	props
) => {
	const {
		children,
		source,
		options,
		className,
		play,
		pause,
		playend,
		playTime,
		onPlayFuc,
		onPauseFuc,
		onPlayend,
		showToolbox = false,
		...restProps
	} = {
		...defaultProps,
		...props
	};
	let rootRef = useRef<HTMLVideoElement>(null);

	const b = bem('video');

	useEffect(() => {
		init();
		return () => {
			rootRef.current?.removeEventListener('play', handlePlayFunc);
			rootRef.current?.removeEventListener('pause', handlePauseFunc);
			rootRef.current?.removeEventListener('ended', handleEndFunc);
		};
	}, [options.autoplay]);

	const init = () => {
		if (rootRef.current) {
      const videoRef = rootRef.current
			if (options.autoplay) {
				setTimeout(() => {
					rootRef.current?.play?.();
				}, 200);
			}
			if (options.playsinline) {
				rootRef.current?.setAttribute(
					'playsinline',
					String(options.playsinline)
				);
				rootRef.current?.setAttribute(
					'webkit-playsinline',
					String(options.playsinline)
				);
				rootRef.current?.setAttribute('x5-video-player-type', 'h5-page');
				rootRef.current?.setAttribute('x5-video-player-fullscreen', 'false');
			}
			rootRef.current?.addEventListener('play', handlePlayFunc);
			rootRef.current?.addEventListener('pause', handlePauseFunc);
			rootRef.current?.addEventListener('ended', handleEndFunc);
		}
	};
	const handlePlayFunc = () => {
		onPlayFuc?.(rootRef.current);
		play?.(rootRef.current);
	};
	const handlePauseFunc = () => {
		onPauseFuc?.(rootRef.current);
		pause?.(rootRef.current);
	};
	const handleEndFunc = () => {
		onPlayend?.(rootRef.current);
		playend?.(rootRef.current);
	};

	return (
		<div className={cls(className, cx[b()])} {...restProps}>
			<video
				className={cx[b('player')]}
				muted={options.muted}
				autoPlay={options.autoplay}
				loop={options.loop}
				poster={options.poster}
				controls={options.controls}
				ref={rootRef}
				src={source.src}
			>
				<source src={source.src} type={source.type} />
				<track kind="captions" />
			</video>
		</div>
	);
};

UVideo.defaultProps = defaultProps;
UVideo.displayName = 'UVideo';

export default memo(UVideo);
