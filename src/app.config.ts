const tabBarConfig = require('./tabBar.config');

export default defineAppConfig({
	pages: [
		'pages/home-page/index',
		'pages/activity/index',
		'pages/community/index',
		'pages/mine/index',
		'pages/land/index'
	],
	tabBar: tabBarConfig,
	networkTimeout: {
		request: 20000,
		downloadFile: 10000
	},
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat',
		navigationBarTextStyle: 'black'
	},
	requiredPrivateInfos: [
		'getFuzzyLocation',
		'chooseLocation',
		'choosePoi',
		'chooseAddress'
	],
	permission: {
		'scope.useFuzzyLocation': {
			desc: '基于用户地理位置获得附近社团，同城活动推荐'
		}
		// 'scope.userLocation': {
		// 	desc: '基于用户地理位置获得附近社团，同城活动推荐'
		// },
	},
	requiredBackgroundModes: ['audio', 'location'],
	subPackages: [
		{
			root: 'pagesUser',
			name: 'pagesUser',
			pages: ['pages/system-settings/index']
		}
	]
});
