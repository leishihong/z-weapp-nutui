import { FC, memo, useMemo, useCallback } from 'react';
import { View, Image, Block } from '@tarojs/components';
import Taro from '@tarojs/taro';
import cls from 'classnames';

import { jumpWebview, jumpSetCallback } from 'utils/utils';
import { URL } from 'constants/router';
import { UWithNaming } from 'utils/bem';

import cx from './index.module.scss';

interface IProps {
	capsuleStatus?: '0' | '1'; // 胶囊图是否开启（0-停用 1-启用）
	capsuleUrl?: string;
	capsuleLinks?: string;
	capsuleType: unknown;
	className: string;
}

const defaultProps = {
	capsuleStatus: '0',
	capsuleUrl: 'https://s1.ax1x.com/2022/10/23/x2CQQe.png',
	capsuleLinks: '',
	capsuleType: null,
	className: ''
} as IProps;

const bem = UWithNaming({ n: 'advertise-' });
const b = bem('area');

const AdvertiseArea: FC<Partial<IProps>> = (props) => {
	const {
		capsuleStatus,
		capsuleUrl = 'https://s1.ax1x.com/2022/10/23/x2CQQe.png',
		capsuleLinks,
		capsuleType,
		className
	} = props;

	const handleClickCapsule = useCallback(() => {
		const accessToken = Taro.getStorageSync('X_AUTH_TOKEN');
		if (capsuleLinks) {
			// 0图片 1原生页面 2站内h5页面 3站外h5页面
			if (capsuleType === 0) {
				const fileExtension = (capsuleLinks as any)
					.split('.')
					.pop()
					.toLowerCase();
				if (
					[
						'jpg',
						'jpeg',
						'png',
						'gif',
						'bmp',
						'webp',
						'tiff',
						'pjpeg',
						'apng',
						'GIF',
						'JPG',
						'PNG',
						'JPEG'
					].includes(fileExtension)
				) {
					Taro.navigateTo({
						url: URL['capsule-activity'] + `?capsuleLinks=${capsuleLinks}`
					});
				}
			} else if (capsuleType === 2) {
				if (accessToken) {
					jumpWebview({ url: capsuleLinks });
				} else {
					jumpSetCallback({
						url: capsuleLinks,
						type: 'webview',
						webviewType: 'redirect'
					});
					Taro.navigateTo({ url: URL['login'] });
				}
			} else if (capsuleType === 3) {
				jumpWebview({ url: capsuleLinks, isNeedLogin: false });
			}
		}
	}, [capsuleLinks]);
	// 胶囊图是否开启（0-启用 1-停用）
	return useMemo(
		() =>
			capsuleStatus === '0' ? (
				<View className={cls(cx[b()], className)} onClick={handleClickCapsule}>
					<View className={cx[b('image')]}>
						<Image src={capsuleUrl} mode="aspectFill" />
					</View>
				</View>
			) : (
				<Block />
			),
		[capsuleStatus, capsuleUrl]
	);
};

AdvertiseArea.defaultProps = defaultProps;

export default memo(AdvertiseArea);
