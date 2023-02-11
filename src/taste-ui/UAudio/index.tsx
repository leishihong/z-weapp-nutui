import React, {
	useState,
	HTMLAttributes,
	useRef,
	FC,
	memo,
	CSSProperties
} from 'react';
import { createInnerAudioContext, InnerAudioContext } from '@tarojs/taro';
import cls from 'classnames';
import { URange, UIconFont } from 'taste-ui/index';

import bem from 'utils/bem';
import cx from './index.module.scss';

const b = bem('audio');

const warn = console.warn;

export interface AudioProps {
	className?: string;
	style?: CSSProperties;
	url: string;
	autoplay?: boolean;
	loop?: boolean;
	muted?: boolean;
	type: string;
	onFastBack?: (ctx: InnerAudioContext) => void;
	onForward?: (ctx: InnerAudioContext) => void;
	onPause?: any;
	onPlay?: any;
	onPlayEnd?: (ctx: InnerAudioContext) => void;
	onCanPlay?: (ctx: InnerAudioContext) => void;
}
const defaultProps = {
	className: '',
	url: '',
	style: {},
	autoplay: false,
	loop: false,
	muted: false,
	type: 'progress',
	onFastBack: (ctx: InnerAudioContext) => {}, // type 为 progress时生效
	onForward: (ctx: InnerAudioContext) => {}, // type 为 progress时生效
	onPause: (ctx: InnerAudioContext) => {},
	onPlay: (ctx: InnerAudioContext) => {},
	onPlayEnd: (ctx: InnerAudioContext) => {},
	onCanPlay: (ctx: InnerAudioContext) => {}
} as AudioProps;

const UAudio: FC<
	Partial<AudioProps> & (HTMLAttributes<HTMLDivElement> | InnerAudioContext)
> = (props) => {
	const {
		className,
		url,
		style,
		autoplay,
		loop,
		type,
		muted,
		onFastBack,
		onForward,
		onPause,
		onPlay,
		onPlayEnd,
		onCanPlay,
		children,
		iconClassPrefix,
		iconFontClassName,
		...rest
	} = {
		...defaultProps,
		...props
	} as any;

	const [playing, setPlaying] = useState(false);
	const [totalSeconds, setTotalSeconds] = useState(0);
	const [percent, setPercent] = useState(0);
	const [isCanPlay, setIsCanPlay] = useState(false);
	const [currentDuration, setCurrentDuration] = useState('00:00:00');

	const statusRef = useRef({
		currentTime: 0,
		currentDuration: '00:00:00',
		percent: 0
	});

	const audioRef = useRef(createInnerAudioContext());
	const audioCtx = audioRef.current;
	audioCtx.src = url;
	audioCtx.autoplay = autoplay || false;
	audioCtx.loop = loop || false;
	audioCtx.onPause(() => {
		props.onPause && props.onPause(audioCtx);
	});
	audioCtx.onEnded(() => {
		if (props.loop) {
			warn('onPlayEnd事件在loop=false时才会触发');
		} else {
			props.onPlayEnd && props.onPlayEnd(audioCtx);
		}
	});

	audioCtx.onPlay(() => {
		const { duration } = audioCtx;
		setTotalSeconds(Math.floor(duration));
		props.onPlay && props.onPlay(audioCtx);
	});
	audioCtx.onCanplay(() => {
		const intervalID = setInterval(function () {
			if (audioCtx.duration !== 0) {
				setTotalSeconds(audioCtx.duration);
				clearInterval(intervalID);
			}
		}, 500);
		setIsCanPlay(true);
		props.onCanPlay && props.onCanPlay(audioCtx);
	});
	audioCtx.onTimeUpdate(() => {
		const time = parseInt(`${audioCtx.currentTime}`);
		const formated = formatSeconds(`${time}`);
		statusRef.current.currentDuration = formated;
		setPercent((time / totalSeconds) * 100);
		setCurrentDuration(formatSeconds(audioCtx.currentTime.toString()));
	});

	audioCtx.onError((res) => {
		console.log('code', res.errCode);
		console.log('message', res.errMsg);
	});

	function formatSeconds(value: string) {
		if (!value) {
			return '00:00:00';
		}
		const time = parseInt(value);
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time - hours * 3600) / 60);
		const secondss = time - hours * 3600 - minutes * 60;
		let result = '';
		result += `${`0${hours.toString()}`.slice(-2)}:`;
		result += `${`0${minutes.toString()}`.slice(-2)}:`;
		result += `0${secondss.toString()}`.slice(-2);
		return result;
	}

	const handleStatusChange = () => {
		setPlaying(!playing);
		if (!playing) {
			audioCtx.play();
		} else {
			audioCtx.pause();
		}
	};

	const renderIcon = () => {
		return (
			<>
				<div className={cx[b('icon')]}>
					<div
						className={cls(
							cx[b('icon-box')],
							playing ? cx[b('icon-play')] : cx[b('icon-stop')]
						)}
						onClick={handleStatusChange}
					>
						{playing ? (
							<UIconFont
								classPrefix={iconClassPrefix}
								fontClassName={iconFontClassName}
								name="service"
								className="u-icon-loading"
							/>
						) : (
							<UIconFont
								classPrefix={iconClassPrefix}
								fontClassName={iconFontClassName}
								name="service"
							/>
						)}
					</div>
				</div>
			</>
		);
	};

	const renderProgerss = () => {
		return (
			<>
				<div className={cx[b('progress')]}>
					<div className="time">{currentDuration}</div>
					<div className={cx[b('progress-bar-wrapper')]}>
						<URange
							modelValue={percent}
							hiddenTag
							hiddenRange
							inactive-color="#cccccc"
							active-color="#fa2c19"
						/>
					</div>
					<div className="time">
						{formatSeconds(`${totalSeconds}`) || '00:00:00'}
					</div>
				</div>
			</>
		);
	};

	const renderNone = () => {
		return (
			<div className={cx[b('none-container')]} onClick={handleStatusChange}>
				{children}
			</div>
		);
	};

	const renderAudio = () => {
		switch (type) {
			case 'icon':
				return renderIcon();
			case 'progress':
				return renderProgerss();
			case 'none':
				return renderNone();
			default:
				return null;
		}
	};

	return (
		<div className={cls(cx[b()], className)} style={style} {...rest}>
			{renderAudio()}
		</div>
	);
};

export default memo(UAudio);

UAudio.defaultProps = defaultProps;
UAudio.displayName = 'UAudio';
