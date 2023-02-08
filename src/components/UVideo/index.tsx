import React, {
	useEffect,
	useRef,
	CSSProperties,
	HTMLAttributes,
	FC,memo
} from 'react';
import cls from 'classnames';
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
	};
	className: string;
	style: CSSProperties;
	play: (e: HTMLVideoElement) => void;
	pause: (e: HTMLVideoElement) => void;
	playend: (e: HTMLVideoElement) => void;
	onPlayFuc: (e: HTMLVideoElement) => void;
	onPauseFuc: (e: HTMLVideoElement) => void;
	onPlayend: (e: HTMLVideoElement) => void;
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
		loop: false
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
		onPlayFuc,
		onPauseFuc,
		onPlayend,
		...restProps
	} = {
		...defaultProps,
		...props
	};
	const rootRef = useRef<HTMLVideoElement>(null);
	const b = bem('video');
	const classes = cls(className, cx[b('')]);

	useEffect(() => {
		init();
	}, []);

	const init = () => {
		if (rootRef.current) {
			const videoRef = rootRef.current;
			if (options.autoplay) {
				setTimeout(() => {
					videoRef.play();
				}, 200);
			}
			if (options.playsinline) {
				videoRef.setAttribute('playsinline', String(options.playsinline));
				videoRef.setAttribute(
					'webkit-playsinline',
					String(options.playsinline)
				);
				videoRef.setAttribute('x5-video-player-type', 'h5-page');
				videoRef.setAttribute('x5-video-player-fullscreen', 'false');
			}
			videoRef.addEventListener('play', () => {
				onPlayFuc && onPlayFuc(videoRef);
				play && play(videoRef);
			});
			videoRef.addEventListener('pause', () => {
				onPauseFuc && onPauseFuc(videoRef);
				pause && pause(videoRef);
			});
			videoRef.addEventListener('ended', () => {
				videoRef.currentTime = 0;
				onPlayend && onPlayend(videoRef);
				playend && playend(videoRef);
			});
		}
	};

	return (
		<div className={classes} {...restProps}>
			<video
				className={cx['u-video-player']}
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

export default memo(UVideo)