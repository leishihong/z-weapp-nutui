import { FC, memo, useMemo, useState, useCallback } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Block } from '@tarojs/components';
import cls from 'classnames';
import { isEmpty, map } from 'lodash';

import bem from 'utils/bem';

import cx from './index.modules.scss';

interface IProps {
	loading: boolean;
	mediaType: number;
	maxImage: number;
	isDelete: boolean;
	imgCategory: string;
	imgUploadUrl: string;
	videoCategory: string;
	videoUploadUrl: string;
	imgList: any;
	videoList: any;
	ossImg: boolean;
	onChooseImg: any;
	onDeleteImg: any;
	onChooseVideo: any;
	onDeleteVideo: any;
	handleClickImg: any;
	handleClickVideo: any;
	setUploadType: any;
	iconUploadImg: string;
	iconUploadClose: string;
}
const defaultProps = {
	loading: false,
	mediaType: 0, // 0:视频/图片 1:图片 2:视频
	maxImage: 9, // 最多可以选择的图片张数
	isDelete: true, // 是否可删除图片/视频
	imgCategory: 'pic_library',
	imgUploadUrl: 'https://dy-server.oss-cn-beijing.aliyuncs.com',
	videoCategory: 'doing_task',
	videoUploadUrl: 'https://dy-server.oss-cn-beijing.aliyuncs.com',
	imgList: [],
	videoList: [],
	iconUploadImg: '//s01.dongyin.net/mp/img_clockin_upload1.png',
	iconUploadClose: '//s01.dongyin.net/mp/img_clockin_upload4.png',
	ossImg: false, // 图片是否走oss直传，逐渐废弃调用后端接口
	onChooseImg: () => {},
	onDeleteImg: () => {},
	onChooseVideo: () => {},
	onDeleteVideo: () => {},
	handleClickImg: () => {},
	handleClickVideo: () => {},
	setUploadType: () => {}
} as IProps;
let iconUploadVideo = '//s01.dongyin.net/mp/img_clockin_upload2.png',
    iconUploadPlay = '//s01.dongyin.net/mp/img_clockin_upload3.png';
// 随机生成文件名
const generateFileRandName = (filePath: string): string => {
	// 获取文件后缀
	let pathArr = filePath.split('.');
	let pathArr2 = pathArr[pathArr.length - 1];
	// 随机生成文件名称
	let fileRandName = Date.now() + '' + (parseInt as any)(Math.random() * 1000);
	// let fileName = fileRandName + '.' + pathArr[3];
	let fileName = fileRandName + '.' + pathArr2;
	return fileName;
};

const ZUploadMedia: FC = (props) => {
	const {
		mediaType,
		maxImage,
		isDelete,
		imgList,
		videoList,
		iconUploadImg,
		iconUploadClose,
		onDeleteImg,
		onDeleteVideo,
		setUploadType,
		handleClickImg
	} = { ...defaultProps, ...props };
	const b = bem('upload');

	const chooseImage = useCallback(async () => {
		setUploadType?.(1);
		const re = await Taro.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera']
		});
	}, []);

	const chooseVideo = useCallback(async () => {
		setUploadType?.(2);
		const {
			tempFilePath,
			duration,
			width: videoWidth,
			height: videoHeight
		} = await Taro.chooseVideo({
			sourceType: ['album', 'camera'],
			maxDuration: 15, // 拍摄的视频时长不超过15s
			compressed: true
		});
		const fileName = generateFileRandName(tempFilePath);
		// 相册中选择的视频时长不超过60s
		if (duration > 60) {
			Taro.showModal({
				title: '温馨提示',
				content: '请上传不超过一分钟的视频',
				showCancel: false,
				confirmText: '确认'
			});
			return false;
		}
	}, []);

	// // 删除当前上传的视频
	// handleDeleteCurVideo() {
	//     if (!this.props.isDelete) return false;
	//     this.props.onDeleteVideo && this.props.onDeleteVideo();
	// }

	return (
		<View className={cls(cx[b()])}>
			<Block r-if={!isEmpty(imgList)}>
				{map(imgList, (item, index) => (
					<View
						className={`-btn`}
						key={`upload-img_` + index + new Date().getTime()}
					>
						<Image
							className={`-upload-img img-class`}
							src=""
							mode="aspectFill"
							onClick={() => {
								handleClickImg?.(imgList, index);
							}}
						/>
						{isDelete && (
							<Image
								className={`-btn-close deletc-class`}
								src={iconUploadClose}
								onClick={() => {
									isDelete && onDeleteImg?.(index);
								}}
							/>
						)}
					</View>
				))}
			</Block>
			<View
				r-if={
					(imgList && imgList.length) < maxImage &&
					videoList.length == 0 &&
					(mediaType === 0 || mediaType == 1)
				}
				className={`-btn custom-class`}
				onClick={chooseImage}
			>
				<Image
					className={`-ico img-class`}
					src={iconUploadImg}
					mode="widthFix"
				/>
			</View>

			<View
				r-if={
					videoList &&
					videoList.length == 0 &&
					imgList.length == 0 &&
					(mediaType === 0 || mediaType == 2)
				}
				className={`-btn`}
				onClick={chooseVideo}
			>
				<Image
					className={`-ico`}
					src={iconUploadVideo}
					mode="widthFix"
				/>
			</View>
		</View>
	);
};

ZUploadMedia.defaultProps = defaultProps;

export default memo(ZUploadMedia);
