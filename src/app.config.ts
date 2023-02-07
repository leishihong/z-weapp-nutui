const tabBarConfig = require('./tabBar.config');

export default defineAppConfig({
  pages: [
    'pages/home-page/index',
    'pages/activity/index',
    'pages/community/index',
    'pages/mine/index',
    'pages/index/index'
  ],
  tabBar: tabBarConfig,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  permission: {
    'scope.userLocation': {
      desc: '基于用户地理位置获得附近社团，同城活动推荐'
    }
    // 'scope.useFuzzyLocation': {
    //   desc: '基于用户地理位置获得附近社团，同城活动推荐'
    // }
  }
})
