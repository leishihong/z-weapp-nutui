import { FC, memo, useRef, useCallback, CSSProperties } from 'react';
import {
	View,
	Text,
	Editor,
	EditorProps,
	ScrollView
} from '@tarojs/components';
import Taro, { createSelectorQuery, EditorContext } from '@tarojs/taro';
import cls from 'classnames';

import bem from 'utils/bem';

import cx from './index.module.scss';

interface IProps extends EditorProps {
	editorId: string;
	placeholder?: string;
	showImgSize?: boolean;
	showImgToolbar?: boolean;
	showImgResize?: boolean;
	content: string;
	uploadImageURL?: string;
	showTabBar?: boolean;
	readOnly?: boolean;
	className?: string;
	styles?: CSSProperties;
}

const UEditor: FC<IProps> = (props) => {
	const {
		editorId,
		content = '',
		placeholder,
		uploadImageURL = '',
		showImgSize = false,
		showImgToolbar = false,
		readOnly = false,
		showImgResize = true,
		showTabBar = true,
		className,
		styles,
		...resetProps
	} = props;

	const b = bem('editor');

	const editorCtx = useRef<EditorContext & any>();
	const querySelect = createSelectorQuery();

	const editorReady = useCallback(() => {
		console.log('初始化完成');
		querySelect
			.select(`#${editorId}`)
			.context((res) => {
				editorCtx.current = res.context;
				// 初始化富文本编辑器的内容
				editorCtx.current.setContents({
					html: content
				});
			})
			.exec();
	}, [editorId]);
	//插入图片
	const addImage = useCallback((event) => {
		Taro.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			sourceType: ['album'],
			success: (res) => {
				Taro.showLoading({
					title: '上传中......',
					mask: true
				});
				handleUploadImg(res.tempFilePaths[0]);
			}
		});
	}, []);
	const handleEditorFormat = useCallback(
		({ currentTarget }) => {
			const { editorName, editorValue } = currentTarget.dataset;
			if (!editorName) return;
			editorCtx.current.format(editorName, editorValue);
		},
		[editorCtx.current]
	);
	//清空编辑器内容
	const handleClear = useCallback(() => {
		editorCtx.current.clear();
	}, [editorCtx.current]);
	//撤销
	const handleUndo = useCallback(() => {
		editorCtx.current.undo();
	}, [editorCtx.current]);
	// 恢复
	const handleRedo = useCallback(() => {
		editorCtx.current.redo();
	}, []);
	//监控输入
	const onInputtInit = (e) => {
		let html = e.data.topic.text;
		let text = e.data.topic.originText;
		querySelect
			.select(`#${editorId}`)
			.context((res) => {
				if (!res) return;
				res.context.setContents({
					html: html,
					text: text
				});
			})
			.exec();
	};
	const insertDivider = useCallback(() => {
		editorCtx.current.insertDivider();
	}, []);
	//监控输入
	const onInputChange = useCallback((e) => {
		let html = e.detail.html;
		let text = e.detail.text;
		// handleInput({
		//   html: html,
		//   text: text
		// })
	}, []);
	const handleUploadImg = useCallback(
		(tempFilePath: string) => {
			Taro.uploadFile({
				filePath: tempFilePath,
				url: uploadImageURL,
				name: 'files',
				success: (res: any) => {
					res = JSON.parse(res.data);
					Taro.hideLoading({
						success: () => {
							if (res.code === 0) {
								editorCtx.current.insertImage({
									src: res.url
								});
							} else {
								Taro.showToast({
									icon: 'error',
									title: '服务器错误,稍后重试！',
									mask: true
								});
							}
						}
					});
				}
			});
		},
		[editorCtx.current]
	);
	const handleStatusChange = useCallback(({ detail }) => {
		console.log(detail, 'formatText');
	}, []);
	const handleRemoveFormat = useCallback(() => {
		editorCtx.current.removeFormat();
	}, []);

	return (
		<View className={cls(cx[b('')], className)} style={styles}>
			<ScrollView scrollX scrollWithAnimation enableFlex r-if={showTabBar}>
				<View className={cx[b('toolbar')]}>
					<View className={cx[b('operate-item')]} onClick={addImage}>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="italic"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="blod"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="header"
						data-editor-value="h1"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="header"
						data-editor-value="h2"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="header"
						data-editor-value="h3"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="header"
						data-editor-value="h4"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="header"
						data-editor-value="h5"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="header"
						data-editor-value="h6"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="align"
						data-editor-value="left"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="align"
						data-editor-value="center"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="align"
						data-editor-value="right"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="align"
						data-editor-value="justify"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="list"
						data-editor-value="ordered"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="list"
						data-editor-value="bullet"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
					<View
						className={cx[b('operate-item')]}
						data-editor-name="list"
						data-editor-value="check"
						onClick={handleEditorFormat}
					>
						<Text className="iconfont icon-image"></Text>
					</View>
				</View>
			</ScrollView>
			<View className={cx[b('body')]}>
				<Editor
					id={editorId}
					className={cx[b('body-editor')]}
					placeholder={placeholder}
					onInput={onInputChange}
					onReady={editorReady}
					onStatusChange={handleStatusChange}
					showImgSize={showImgSize}
					showImgToolbar={showImgToolbar}
					readOnly={readOnly}
					showImgResize={showImgResize}
					{...resetProps}
				/>
			</View>
		</View>
	);
};

export default memo(UEditor);
