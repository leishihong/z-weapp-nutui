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
import { View, Button, ButtonProps } from '@tarojs/components';
import Taro from '@tarojs/taro';

import bem from 'utils/bem';

import cx from './index.module.scss';

type IOpenTypeKeys =
	| 'contact'
	| 'share'
	| 'getPhoneNumber'
	| 'getUserInfo'
	| 'launchApp'
	| 'openSetting'
	| 'feedback'
	| 'chooseAvatar'
	| undefined;

interface IProps {
	className: string;
	color: string;
	shape: ButtonShape;
	plain: boolean;
	loading: boolean;
	disabled: boolean;
	style: CSSProperties;
	type: ButtonType;
	size: ButtonSize;
	block: boolean;
	icon: string;
	children: any;
	formType: 'submit' | 'reset' | undefined;
	sessionFrom: string;
	sendMessageTitle: string;
	sendMessagePath: string;
	sendMessageImg: string;
	showMessageCard: boolean;
	appParameter: string;
	openType: IOpenTypeKeys;
	onClick?: (e: MouseEvent) => void;
	onGetPhoneNumber: (e: any) => void;
	onOpenSetting: (e: any) => void;
	onChooseAvatar: (e: any) => void;
	onGetUserInfo: (e: any) => void;
	onContact: (e: any) => void;
	onError: (e: any) => void;
	[key: string]: any;
}

export type ButtonType =
	| 'default'
	| 'primary'
	| 'info'
	| 'success'
	| 'warning'
	| 'danger';
export type ButtonSize = 'large' | 'normal' | 'small';
export type ButtonShape = 'square' | 'round';

const defaultProps = {
	className: '',
	color: '',
	shape: 'round',
	plain: false,
	loading: false,
	disabled: false,
	type: 'default',
	size: 'normal',
	block: false,
	openType: undefined,
	icon: '',
	style: {},
	children: undefined,
	formType: undefined,
	sessionFrom: '',
	sendMessageTitle: '',
	sendMessagePath: '',
	sendMessageImg: '',
	showMessageCard: false,
	appParameter: '',
	onClick: (e: MouseEvent) => {},
	onGetPhoneNumber: (e: any) => {},
	onOpenSetting: (e: any) => {},
	onChooseAvatar: (e: any) => {},
	onGetUserInfo: (e: any) => {},
	onContact: (e: any) => {},
	onError: (e: any) => {}
} as IProps;

const ZButton: FC<Partial<IProps>> = (props) => {
	const {
		color,
		shape,
		plain,
		loading,
		disabled,
		type,
		size,
		block,
		icon,
		children,
		openType,
		onClick,
		className,
		style,
		formType,
		sessionFrom,
		sendMessageTitle,
		sendMessagePath,
		sendMessageImg,
		showMessageCard,
		appParameter,
		onGetPhoneNumber,
		onOpenSetting,
		onChooseAvatar,
		onGetUserInfo,
		onContact,
		onError,
		...restProps
	} = props;
	const b = bem('button');
	const getStyle = useCallback(() => {
		const style: CSSProperties = {};
		if (color) {
			if (plain) {
				style.color = color;
				style.background = '#fff';
				if (!color?.includes('gradient')) {
					style.borderColor = color;
				}
			} else {
				style.color = '#fff';
				style.background = color;
			}
		}
		return style;
	}, [color, plain]);
	const classes = useCallback(() => {
		return [
			cx[b()],
			`${type ? cx[b(type)] : ''}`,
			`${size ? cx[b(size)] : ''}`,
			`${shape ? cx[b(shape)] : ''}`,
			`${plain ? cx[b('plain')] : ''}`,
			`${block ? cx[b('block')] : ''}`,
			`${disabled ? cx[b('disabled')] : ''}`,
			`${loading ? cx[b('loading')] : ''}`
		]
			.filter(Boolean)
			.join(' ');
	}, [block, disabled, loading, plain, shape, size, type]);

	const [btnName, setBtnName] = useState(classes());
	const [btnStyle, setBtnStyle] = useState(getStyle());
	useEffect(() => {
		setBtnName(classes());
		setBtnStyle(getStyle());
	}, [
		className,
		color,
		shape,
		plain,
		loading,
		disabled,
		style,
		type,
		size,
		block,
		icon,
		children,
		onClick,
		classes,
		getStyle
	]);

	const handleClick = useCallback((e: any) => {
		if (!loading && !disabled && onClick) {
			onClick(e);
		}
	}, []);

	return (
		<View
			className={`${btnName} ${className}`}
			{...restProps}
			style={{ ...btnStyle, ...style }}
			onClick={(e) => handleClick(e)}
		>
			<View className={cx[b('warp')]} style={getStyle()}>
				<Button
					className={cx[b('taro-button')]}
					formType={formType}
					sessionFrom={sessionFrom}
					sendMessageTitle={sendMessageTitle}
					sendMessagePath={sendMessagePath}
					sendMessageImg={sendMessageImg}
					showMessageCard={showMessageCard}
					appParameter={appParameter}
					openType={openType}
					onGetUserInfo={onGetUserInfo}
					onError={onError}
					onContact={onContact}
					onGetPhoneNumber={onGetPhoneNumber}
					onChooseAvatar={onChooseAvatar}
					onOpenSetting={onOpenSetting}
				/>
				<View className={icon || loading ? 'text' : ''} r-if={children}>
					{children}
				</View>
			</View>
		</View>
	);
};

ZButton.defaultProps = defaultProps;
export default memo(ZButton);
