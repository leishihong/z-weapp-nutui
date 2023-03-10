import { FC, memo, ReactNode, useState, useMemo, useEffect, useCallback } from 'react';
import { View, Block, Image } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import Taro, {
  showModal,
  showToast,
  useDidShow,
  usePageScroll,
  useTabItemTap,
  useReady,
  useShareAppMessage,
  ShareAppMessageObject,
  useDidHide,
  nextTick
} from '@tarojs/taro';
import cls from 'classnames';

import { TaroNavigationBar } from 'components/index';
import { UPopup } from 'taste-ui/index';
import { NavigationBarProps } from 'components/TaroNavigationBar/type';
import { TXReverseGeocoder } from 'utils/TX-map';
import { storageCache } from 'utils/storageCache';

import cx from './index.module.scss';

interface IProps extends NavigationBarProps {
  title: string;
  children: ReactNode;
  isCustomNavBar: boolean;
  showNavBar: boolean;
  selectedIndex: number;
}

const defaultProps = {
  isCustomNavBar: false,
  showNavBar: false,
  selectedIndex: 0
} as IProps;

const PageContainer: FC<Partial<IProps>> = (props) => {
  const { children, title, isImmersive, isCustomNavBar, showNavBar, selectedIndex, ...resetProps } = props;

  const dispatch = useDispatch();
  const tabBarState = useSelector(({ tabBarState }) => tabBarState);
  const { system } = useSelector(({ globalsState }) => globalsState);
  const { navBarHeight, navBarExtendHeight } = useMemo(() => system, []);

  const [isAuthLocation, setIsAuthLocation] = useState<any>(false);

  console.log(isAuthLocation, 'isAuthLocation');

  const [navBarInfo, setNavBarInfo] = useState<any>({
    isImmersive,
    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)`,
    title
  });
  useEffect(() => {
    dispatch({ type: 'tabBarState/setState', payload: { selectedIndex } });
    getFuzzyLocation();
    getUserAuthLocation();
  }, []);
  const getUserAuthLocation = async () => {
    const res = await storageCache('userAuthLocation');
    console.log(res, 'userAuthLocation');
    setIsAuthLocation(['reject', 'fail'].includes(res) && res);
  };

  const getFuzzyLocation = async () => {
    try {
      const locationRes: Taro.getFuzzyLocation.SuccessCallbackResult = await Taro.getFuzzyLocation({ type: 'gcj02' });
      if (locationRes?.errMsg.indexOf('ok') !== -1) {
        const { status, result }: any = await TXReverseGeocoder(locationRes);
        if (status === 0) {
          console.log(result, 'result');
          await storageCache('userAuthLocation', { value: result, cacheTime: 36000 * 24 * 7 });
        }
      }
    } catch (error: any) {
      if (error?.errMsg.indexOf('deny') !== -1) {
        console.log('????????????????????????');
        await storageCache('userAuthLocation', { value: 'reject' });
      } else {
        await storageCache('userAuthLocation', { value: 'fail' });
      }
      console.log(error, '---');
    }
  };
  useDidHide(() => {
    handleClosePopup();
  });
  usePageScroll((payload) => {
    const { scrollTop } = payload;
    const navOp = scrollTop / (navBarHeight + navBarExtendHeight);
    if (isCustomNavBar && showNavBar) {
      setNavBarInfo((preState) =>
        Object.assign({}, preState, {
          background:
            scrollTop > 10
              ? `rgba(255, 255, 255, ${navOp > 1 ? 1 : navOp})`
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)',
          title: scrollTop > 10 ? title : ''
        })
      );
    }
  });

  const handleClosePopup = useCallback(() => {
    dispatch({
      type: 'tabBarState/setState',
      payload: { popupVisible: false, showTabBar: false }
    });
  }, []);

  return (
    <Block>
      <TaroNavigationBar {...resetProps} {...navBarInfo} r-if={isCustomNavBar && showNavBar} />
      {children}
      <UPopup
        visible={tabBarState.popupVisible}
        placement='bottom'
        rounded
        maskClosable
        showToolbar={false}
        footer={null}
        onCancel={handleClosePopup}
      >
        <View className={cx['publish']}>
          <View className={cx['publish-body']}>
            <View className={cx['publish-grid']}>
              <View className={cx['publish-grid-avatar']}>
                <Image src='https://s1.ax1x.com/2023/02/13/pSo8yOs.png' lazyLoad mode='aspectFill' />
              </View>
              <View className={cx['publish-grid-desc']}>
                <View className={cx['publish-grid--desc-title']}>????????????</View>
                <View className={cx['publish-grid--desc-subtitle']}>??????????????????</View>
              </View>
            </View>
            <View className={cx['publish-grid']}>
              <View className={cx['publish-grid-avatar']}>
                <Image src='https://s1.ax1x.com/2023/02/13/pSo8syj.png' lazyLoad mode='aspectFill' />
              </View>
              <View className={cx['publish-grid-desc']}>
                <View className={cx['publish-grid--desc-title']}>????????????</View>
                <View className={cx['publish-grid--desc-subtitle']}>????????????????????????</View>
              </View>
            </View>
          </View>
          <View className={cx['publish-close']} onClick={handleClosePopup}>
            <Image src='https://s1.ax1x.com/2023/02/13/pSo8cmn.png' lazyLoad mode='aspectFill' />
          </View>
        </View>
      </UPopup>
    </Block>
  );
};

PageContainer.defaultProps = defaultProps;

export default memo(PageContainer);
