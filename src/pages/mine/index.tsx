import React from 'react';
import Taro from '@tarojs/taro';

import { URL, TAB } from 'constants/router';

import { PageContainer } from 'components/index';
import { Avatar } from 'taste-ui/index';

import cx from './index.module.scss';

const Index = () => {
	return (
		<PageContainer>
			<div className={cx['nutui-react-demo']}>
				<div className={cx['index']}>
					欢迎使用 NutUI React 开发 Taro 多端项目。
				</div>
				<Avatar
					onAvatar={() => Taro.navigateTo({ url: URL['system-settings'] })}
					src="https://s1.ax1x.com/2022/11/01/x7224g.png"
					shape="square"
					size={44}
				/>
			</div>
		</PageContainer>
	);
};

export default Index;
