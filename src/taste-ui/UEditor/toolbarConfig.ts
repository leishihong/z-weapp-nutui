import { map } from 'lodash';

interface IKeys {
	[key: string]: string;
}
export const alignInfo: IKeys = {
	left: '居左',
	center: '居中',
	right: '居右',
	justify: '两端'
};

export interface IFormatInfo {
	name: string;
	list: string[];
}
export interface IToolbarItem {
	title: string;
	icon: string;
	checkedIcon: string;
	formatInfo: IFormatInfo;
}

export const toolbarConfig: IToolbarItem[] = [
	{
		title: '加粗',
		icon: '',
		checkedIcon: '',
		formatInfo: { name: 'bold', list: [] }
	},
	{
		title: '斜体',
		icon: '',
		checkedIcon: '',
		formatInfo: { name: 'italic', list: [] }
	},
	{
		title: '下划线',
		icon: '',
		checkedIcon: '',
		formatInfo: { name: 'underline', list: [] }
	},
	{
		title: '删除线',
		icon: '',
		checkedIcon: '',
		formatInfo: { name: 'strike', list: [] }
	},
	{
		title: '标题',
		icon: '',
		checkedIcon: '',
		formatInfo: {
			name: 'header',
			list: map(
				Array.from({ length: 6 }, (v, k) => k + 1),
				(item) => `h${item}`
			)
		}
	},
	{
		title: '对其方式',
		icon: '',
		checkedIcon: '',
		formatInfo: {
			name: 'align',
			list: ['left', 'center', 'right', 'justify']
		}
	},
	{
		title: '列表',
		icon: '',
		checkedIcon: '',
		formatInfo: {
			name: 'list',
			list: ['ordered', 'bullet', 'check']
		}
	}
];
