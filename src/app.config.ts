const tabBarConfig = require('./tabBar.config');

export default defineAppConfig({
	pages: [
		'pages/home-page/index',
		'pages/activity/index',
		'pages/mine/index',
    'pages/moka/index',
		'pages/land/index'
	],
	tabBar: tabBarConfig,
	subPackages: [
		{
			root: 'pagesUser',
			name: 'pagesUser',
			pages: [
				'pages/system-settings/index',
				'pages/login/index',
				'pages/code-login/index'
			]
		},
		{
			root: 'pagesActivity',
			name: 'pagesActivity',
			pages: ['pages/activity-detail/index']
		}
	],
	networkTimeout: {
		request: 20000,
		downloadFile: 10000
	},
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#FFFFFF',
		navigationBarTitleText: '',
		navigationBarTextStyle: 'black',
		backgroundColor: '#F7F8FA',
		homeButton: true
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
	animation: {
		duration: 196, // 动画切换时间，单位毫秒
		delay: 50 // 切换延迟时间，单位毫秒
	}
});
