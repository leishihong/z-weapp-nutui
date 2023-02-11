import React from 'react';
import { PageContainer } from 'components/index';

import cx from './index.module.scss';

const Index = () => {
	return (
		<PageContainer>
			<div className={cx['nutui-react-demo']}>
				<div className={cx['index']}>
					欢迎使用 NutUI React 开发 Taro 多端项目。
				</div>
				<div className={cx['index']}></div>
			</div>
		</PageContainer>
	);
};

export default Index;
