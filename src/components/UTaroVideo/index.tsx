import React, {
	useEffect,
	useCallback,
	CSSProperties,
	useState,
	useImperativeHandle,
	forwardRef,
	ForwardedRef,
	memo,
	useRef,
	useMemo
} from 'react';
import { Video, MovableArea, View } from '@tarojs/components';
import cls from 'classnames';
import Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';

import { UWithNaming } from 'utils/bem';

import cx from './index.module.scss';

interface IProps {
	src: string;
	videoId: string;
	viewStyle?: CSSProperties;
	title?: string;
	poster?: string;
	onVideoCreate?: (event: any) => void;
	onPlay?: (event?: any) => void;
	onPause?: (event?: any) => void;
	onRefresh?: () => void;
	className?: string;
}

const UTaroVideo = forwardRef((props: IProps, ref: ForwardedRef<unknown>) => {
	const {
		src,
		videoId,
		title,
		poster,
		onPlay,
		onPause,
		onVideoCreate,
		onRefresh,
		className
	} = props;

	const bem = UWithNaming({ n: 'taro-' });
	const b = bem('video');

	const {
		networkInfo: { isLine, isWiFi }
	} = useSelector(({ globalsState }) => globalsState);
	const dispatch = useDispatch();

	const [canPlayVideo, setCanPlayVideo] = useState<boolean>(false); // 非WiFi环境是否可以播放
	const [videoFit, setVideoFit] = useState<any>('cover');
	const pages = useMemo(() => Taro.getCurrentPages(), []);
	const videoCtx = useMemo(() => Taro.createVideoContext(videoId), [videoId]);

	useEffect(() => {
		onVideoCreate?.(videoCtx);
	}, [videoCtx]);

	useImperativeHandle(ref, () => ({
		currentVideoCtx: videoCtx
	}));

	// 检测是否为wifi环境视频播放做提示
	const showNetworkTips = useCallback(() => {
		const network = isLine && !isWiFi && !canPlayVideo;
		const playedVideo = Taro.getStorageSync('playedVideo');
		if (playedVideo) return;
		if (network) {
			Taro.setStorageSync('playedVideo', true);
			Taro.showToast({
				title: '温馨提示：当前为非WiFI华景，请注意流量消耗',
				icon: 'none',
				duration: 1500
			});
		}
	}, [isLine, isWiFi, canPlayVideo]);

	const onError = useCallback((error) => {
		console.log(error, '视频加载失败');
	}, []);

	const handlePlay = useCallback((event) => {
		showNetworkTips();
		onPlay?.(event);
	}, []);
	const handlePause = useCallback((event) => {
		onPause?.(event);
	}, []);
	// 刷新当前页面
	const handleReloadPage = useCallback(() => {
		if (!isLine) return false;
		if (pages.length != 0) {
			dispatch({ type: 'globalsState/getNetworkType' });
			onRefresh?.();
		}
	}, [isLine, isWiFi, canPlayVideo]);
	// 手动预览视频模式
	const handleFullscreenChange = (event) => {
		const fullScreen = event.detail.fullScreen;
		dispatch({
			type: 'tabBarState/setState',
			payload: { showTabBar: fullScreen }
		});
	};
	return (
		<View className={cls(className, cx[b()])}>
			<Video
				id={videoId}
				className={cls(cx[b('play')])}
				src={src}
				title={title}
				initialTime={0.01}
				direction={90} // 设置全屏时视频的方向，不指定则根据宽高比自动判断。有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）
				objectFit="cover"
				playBtnPosition="center" // 播放按钮的位置
				showPlayBtn // 是否显示视频底部控制栏的播放按钮
				showScreenLockButton // 是否显示锁屏按钮，仅在全屏时显示，锁屏后控制栏的操作
				showMuteBtn // 是否显示静音按钮
				enablePlayGesture // 是否开启播放手势，即双击切换播放/暂停
				// enableAutoRotation // 手机横屏时自动全屏
				// pictureInPictureMode={['push', 'pop']}
				autoplay={false}
				onPlay={handlePlay}
				onPause={handlePause}
				poster={poster}
				onFullscreenChange={handleFullscreenChange}
				onError={onError}
			/>
			<View
				r-if={!isLine}
				className={cx[b('network')]}
				style={{ display: 'block' }}
			>
				<View className={cx[b('network-title')]}>无法连接网络，请稍后重试</View>
				<View className={cx[b('network-btn')]} onClick={handleReloadPage}>
					点击重试
				</View>
			</View>
		</View>
	);
});

export default memo(UTaroVideo);
