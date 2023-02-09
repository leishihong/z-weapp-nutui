import React, { FC, PropsWithChildren, useEffect } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import { Provider } from 'react-redux';
import { handleUpdate } from 'utils/taroUpdateManager';
import store from 'store/index';
import { getSystemInfo } from 'utils/getSystemInfo';

import './app.scss';

const App: FC<PropsWithChildren> = (props) => {
  const dispatch = store.dispatch;

  useDidShow(() => {
    // if (inWeApp) {
    //   const tabBar = Taro.getTabBar<any>(page);
    //   tabBar?.setSelected(tabBarState.selectedIndex);
    // }
    // dispatch({ type: 'tabBarState/setState', payload: { selectedIndex: tabBarState.selectedIndex } });
    handleUpdate();
  });
  Taro.onPageNotFound((options) => {
    console.log('on page not found', options);
    Taro.redirectTo({
      url: URL['404']
    });
  });
  useEffect(() => {
    dispatch({ type: 'globalsState/getAccountInfoSync' });
    dispatch({ type: 'globalsState/setSystem', payload: { system: getSystemInfo() } });
    dispatch({ type: 'globalsState/getStorageInfo' });
    dispatch({ type: 'globalsState/getNetworkType' });
    Taro.onNetworkStatusChange((res) => {
      console.log(Boolean(res.isConnected), 'Boolean(res.isConnected)');
      dispatch({ type: 'globalsState/getNetworkType' });
    });
  }, []);
	return <Provider store={store}>{props.children}</Provider>;
};
export default App;
