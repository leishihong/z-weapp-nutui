// import 'http://at.alicdn.com/t/c/font_3355232_qeqoodrx958.css';
// 模板里已引用css
import { CSSProperties } from 'react';
import bem from 'utils/bem';

interface IconFontProps {
	className?: string;
	style?: CSSProperties;
	name: string;
	fontClassName?: string;
	classPrefix?: string;
}

export default function IconFont(props: IconFontProps) {
	const {
		fontClassName = 'iconfont',
		classPrefix = 'icon',
		name,
		className = '',
		style = {},
		...resetProps
	} = props;

	const b = bem('');

	return (
		<i
			className={`${fontClassName} ${classPrefix}-${name} ${className}`}
			style={style}
			{...resetProps}
		/>
	);
}
