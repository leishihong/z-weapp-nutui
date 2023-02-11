export default {
	namespace: 'tabBarState',
	state: {
		selectedIndex: 0,
		showTabBar: false,
    popupVisible:false,
		tabList: [
			{
				text: '发现',
				pageName: 'home',
				pagePath: '/pages/home-page/index',
				iconPath: '/assets/tab-bar/home-icon.png',
				selectedIconPath: '/assets/tab-bar/home-selected-icon.png'
			},
			{
				text: '活动',
				pageName: 'activity',
				pagePath: '/pages/activity/index',
				iconPath: '/assets/tab-bar/home-icon.png',
				selectedIconPath: '/assets/tab-bar/home-selected-icon.png'
			},
			{
				text: '',
				pageName: 'publish',
				pagePath: '/pages/land/index',
				iconPath: '/assets/tab-bar/home-icon.png',
				selectedIconPath: '/assets/tab-bar/home-icon.png',
				divClass: 'custom-item-view'
			},
			{
				text: 'MO卡',
				pageName: 'community',
				pagePath: '/pages/community/index',
				iconPath: '/assets/tab-bar/home-icon.png',
				selectedIconPath: '/assets/tab-bar/home-selected-icon.png'
			},
			{
				text: '我的',
				pageName: 'mine',
				pagePath: '/pages/mine/index',
				iconPath: '/assets/tab-bar/mine-icon.png',
				selectedIconPath: '/assets/tab-bar/mine-selected-icon.png'
			}
		]
	},
	effects: {},
	reducers: {
		setState(state, { payload }) {
			return { ...state, ...payload };
		}
	}
};
