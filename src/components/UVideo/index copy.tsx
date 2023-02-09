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

interface ICustomVideoInfo {
	videoElm: null;
	initial: boolean;
	showToolbox: boolean;
	player: {
		$player: unknown;
		pos: unknown;
		[key: string]: any;
	};
	progressBar: {
		progressElm: unknown;
		pos: unknown;
		[key: string]: any;
	};
	videoSet: {
		loaded: number;
		displayTime: string;
		totalTime: string;
		progress: {
			width: number;
			current: number;
		};
	};
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
	const [customVideoInfo, setCustomVideoInfo] = useState<ICustomVideoInfo>({
		videoElm: null,
		initial: true, //控制封面的显示
		showToolbox: false, //控制控制器和标题的显示
		// 视频容器元素
		player: {
			$player: null,
			pos: null
		},
		// progress进度条元素
		progressBar: {
			progressElm: null, // 进度条DOM对象
			pos: null
		},
		// video控制显示设置
		videoSet: {
			loaded: 0, // 缓存长度
			displayTime: '00:00', // 进度时间
			totalTime: '00:00', // 总时间
			progress: {
				width: 0, // 进度条长度
				current: 0 // 进度条当前位置
			}
		}
	});
	const progressBarRef = useRef<any>({
		progressElm: null, // 进度条DOM对象
		pos: null
	});
	const playedBarRef = useRef<any>(null);
	const [customState, setCustomState] = useState<{ [key: string]: any }>({
		controlShow: true,
		vol: 0.5, //音量
		currentTime: 0, //当前时间
		fullScreen: false,
		playing: false, //是否正在播放
		isLoading: false,
		isEnd: false,
		isError: false,
		isMuted: false
	});
	const b = bem('video');

	const isDisabled = options.disabled;

	useEffect(() => {
		setCustomState((preState) =>
			Object.assign(preState, {
				isMuted: !isEmpty(options) ? options.muted : false
			})
		);
	}, [options]);

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
			if (options.autoplay) {
        console.log(rootRef.current,'rootRef.current')
				setTimeout(() => {
					rootRef.current?.play();
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
			if (showToolbox) {
				customerInit();
			} else {
				rootRef.current?.addEventListener('play', handlePlayFunc);
				rootRef.current?.addEventListener('pause', handlePauseFunc);
				rootRef.current?.addEventListener('ended', handleEndFunc);
			}
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
		// (rootRef.current as any)?.currentTime = 0;
		onPlayend?.(rootRef.current);
		playend?.(rootRef.current);
	};
	const handlePlay = () => {
		if (options.autoplay && options.disabled) {
			customState.playing = true;
			return false;
		}
		customState.playing = !customState.playing;
		if (customVideoInfo.videoElm) {
			// 播放状态
			if (customState.playing) {
				try {
					setTimeout(() => {
						(customVideoInfo.videoElm as any).play();
					}, 200);

					// 监听缓存进度
					(customVideoInfo.videoElm as any).addEventListener('progress', () => {
						getLoadTime();
					});
					// 监听播放进度
					(customVideoInfo.videoElm as any).addEventListener(
						'timeupdate',
						throttle(getPlayTime, 1000)
					);
					// 监听结束
					(customVideoInfo.videoElm as any).addEventListener(
						'ended',
						playEnded
					);
					play(customVideoInfo.videoElm);
				} catch (e) {
					// 捕获url异常出现的错误
					handleError();
				}
			}
			// 停止状态
			else {
				(customVideoInfo.videoElm as any).pause();
				pause(customVideoInfo.videoElm);
			}
		}
	};
	const timeFormat = (t: number) => {
		var h = Math.floor(t / 3600) as string | number;
		if (h < 10) {
			h = '0' + h;
		}
		var m = Math.floor((t % 3600) / 60) as string | number;
		if (m < 10) {
			m = '0' + m;
		}
		var s = Math.round((t % 3600) % 60) as string | number;
		if (s < 10) {
			s = '0' + s;
		}
		var str = '';
		if (h != 0) {
			str = h + ':' + m + ':' + s;
		} else {
			str = m + ':' + s;
		}
		return str;
	};
	const getLoadTime = () => {
		if (customVideoInfo.videoSet.loaded)
			customVideoInfo.videoSet.loaded =
				((customVideoInfo.videoElm as any).buffered.end(0) /
					(customVideoInfo.videoElm as any).duration) *
				100;
	};

	const getPlayTime = () => {
		const percent =
			(customVideoInfo.videoElm as any).currentTime /
			(customVideoInfo.videoElm as any).duration;
		customVideoInfo.videoSet.progress.current = Math.round(
			customVideoInfo.videoSet.progress.width * percent
		);

		// 赋值时长
		customVideoInfo.videoSet.totalTime = timeFormat(
			(customVideoInfo.videoElm as any).duration
		);
		customVideoInfo.videoSet.displayTime = timeFormat(
			(customVideoInfo.videoElm as any).currentTime
		);
		playTime(
			customVideoInfo.videoSet.displayTime,
			customVideoInfo.videoSet.totalTime
		);
	};

	const playEnded = () => {
		customState.playing = false;
		customState.isEnd = true;
		customVideoInfo.videoSet.displayTime = '00:00';
		customVideoInfo.videoSet.progress.current = 0;
		(customVideoInfo.videoElm as any).currentTime = 0;
		playend(customVideoInfo.videoElm);
		// emit('playend', state.videoElm);
	};

	const handleError = () => {
		customState.isError = true;
	};
	const customerInit = () => {
		const $player: any = rootRef.current;
		const $progress: any = rootRef.current!.getElementsByClassName(
			'u-video__controller__progress-value'
		)[0];
		console.log('$progress', $progress);
		// 播放器位置
		(customVideoInfo.player.$player as any) = $player;
		progressBarRef.current.progressElm = $progress;
		progressBarRef.current.pos = $progress.getBoundingClientRect();
		(customVideoInfo.progressBar.progressElm as any) = $progress;
		(customVideoInfo.progressBar.pos as any) =
			$progress.getBoundingClientRect();
		customVideoInfo.videoSet.progress.width = Math.round(
			$progress.getBoundingClientRect().width
		);
	};
	const touchSlidMove = useCallback((event: any) => {
		event.preventDefault();
	}, []);
	const touchSlidEnd = useCallback((event: any) => {
		event.stopPropagation();
	}, []);
	const touchSlidStart = useCallback((event: any) => {
		event.stopPropagation();
	}, []);
	const handleMuted = () => {
		customState.isMuted = !customState.isMuted;
		(customVideoInfo.videoElm as any).muted = customState.isMuted;
	};

	const fullScreen = () => {
		if (!customState.fullScreen) {
			customState.fullScreen = true;
			(customVideoInfo.videoElm as any).webkitRequestFullScreen();
		} else {
			customState.fullScreen = false;
			(document as any).webkitCancelFullScreen();
		}
	};
	const handleRetry = () => {
		customState.isError = false;
		init();
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
			<div
				className={cx[b('mask')]}
				r-if={showToolbox && !isDisabled}
				onClick={handlePlay}
			/>
			<div
				className={cx[b('play-btn')]}
				r-if={showToolbox && !isDisabled}
				ref="palyBtn"
				r-show={!customState.playing}
				onClick={handlePlay}
			/>
			<div
				className={cls(cx[b('controller')], {
					[cx[b('controller--show')]]: !customState.playing,
					[cx[b('controller--hide')]]: customState.playing
				})}
				r-if={showToolbox && !isDisabled}
			>
				<div
					className={cx[b('controller__playbtn')]}
					onClick={handlePlay}
				></div>
				<div className={cx[b('controller__now')]}>
					{customVideoInfo.videoSet.displayTime}
				</div>
				<div className={cx[b('controller__progress')]}>
					<div
						className={cls(
							cx[b('controller__progress-value')],
							'u-video__controller__progress-value'
						)}
						ref={progressBarRef}
					>
						<div
							className={cx['buffered']}
							style={{ width: `${customVideoInfo.videoSet.loaded}%` }}
						/>
						<div
							className={cx[b('controller__ball')]}
							style={{
								transform: `translate3d(${customVideoInfo.videoSet.progress.current}px, -50%, 0)`
							}}
							onTouchMove={touchSlidMove}
							onTouchEnd={touchSlidEnd}
							onTouchStart={touchSlidStart}
						>
							<div className={cx[b('controller__ball-move')]} />
						</div>
						<div className={cx[b('controller__played')]} ref={playedBarRef} />
					</div>
				</div>
				<div className={cx[b('controller__total')]}>
					{customVideoInfo.videoSet.totalTime}
				</div>
				<div
					onClick={handleMuted}
					className={cls(cx[b('controller__volume')], {
						[cx['muted']]: customState.isMuted
					})}
				/>
				<div className={cx[b('controller__full')]} onClick={fullScreen} />
			</div>
			<div className={cx[b('error')]} r-if={customState.error}>
				<div className={cx[b('error-tip')]}>视频加载失败</div>
				<div className={cx[b('error-retry')]} onClick={handleRetry}>
					点击重试
				</div>
			</div>
		</div>
	);
};

UVideo.defaultProps = defaultProps;
UVideo.displayName = 'UVideo';

export default memo(UVideo);
