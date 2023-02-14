import { FC } from 'react';
import Taro from '@tarojs/taro';
import { ScrollView, View, Block } from '@tarojs/components';
import cls from 'classnames';

import { PageContainer, TaroNavigationBar } from 'components/index';
import { Avatar, UCard, UCell } from 'taste-ui/index';

import { UWithNaming } from 'utils/bem';
import { URL } from 'constants/router';

import cx from './index.module.scss';

const bem = UWithNaming({ n: 'mine-' });
const b = bem('page');

const MinePage: FC = () => {
  return (
    <PageContainer selectedIndex={4}>
      <TaroNavigationBar background='transparent' renderLeft={<Block />} />
      <View className={cls(cx[b()])}>
        <View className={cls(cx[b('user')])}>
          <Avatar
            onAvatar={() => Taro.navigateTo({ url: URL['system-settings'] })}
            src='https://s1.ax1x.com/2023/02/14/pST9tKJ.png'
            size={220}
          />
          <View className={cx[b('user-info')]}>
            <View className={cls(cx[b('user-info-header')], 'ellipsis')}>JEANJEAN</View>
            <View className={cx[b('user-info-signature')]}>一段个人简介描述~</View>
          </View>
          <View className={cx[b('user-edit')]}>
            <Avatar
              rootCls={cx[b('user-edit-icon')]}
              onAvatar={() => Taro.navigateTo({ url: URL['system-settings'] })}
              src='https://s1.ax1x.com/2023/02/14/pSoHnBD.png'
              shape='rounded'
              size={32}
            />
            编辑
          </View>
        </View>
        <View className={cx[b('body')]}>
          <UCard
            title='我的社团'
            className={cx[b('community')]}
            extra={
              <View className={cx[b('community-extra')]}>
                我的社团
                <Avatar src='https://s1.ax1x.com/2023/02/14/pSoLGg1.png' shape='square' size={32} />
              </View>
            }
          >
            <View className={cx[b('community-body')]}>
              <Avatar
                onAvatar={() => Taro.navigateTo({ url: URL['system-settings'] })}
                src='https://s1.ax1x.com/2022/11/01/x7224g.png'
                shape='rounded'
                size={44}
              />
              <View className={cx[b('community-name')]}>社团名称社团名称</View>
            </View>
            <View className={cx[b('community-activity')]}>快来发布活动吧</View>
          </UCard>
          <UCard title='我加入的社团' className={cx[b('join-community')]}>
            <ScrollView scrollX scrollWithAnimation enableFlex className={cx[b('join-community-scroll')]}>
              <View className={cx[b('join-community-grid')]}>
                <View className={cx[b('join-community-grid-item')]}>
                  <Avatar
                    onAvatar={() => Taro.navigateTo({ url: URL['system-settings'] })}
                    src='https://s1.ax1x.com/2022/11/01/x7224g.png'
                    shape='rounded'
                    size={100}
                  />
                  <View className={cx[b('join-community-grid-item-title')]}>加入的社团</View>
                </View>
                <View className={cx[b('join-community-grid-item')]}>
                  <Avatar
                    onAvatar={() => Taro.navigateTo({ url: URL['system-settings'] })}
                    src='https://s1.ax1x.com/2022/11/01/x7224g.png'
                    shape='rounded'
                    size={100}
                  />
                  <View className={cx[b('join-community-grid-item-title')]}>加入的社团</View>
                </View>
                <View className={cx[b('join-community-grid-item')]}>
                  <Avatar
                    onAvatar={() => Taro.navigateTo({ url: URL['system-settings'] })}
                    src='https://s1.ax1x.com/2022/11/01/x7224g.png'
                    shape='rounded'
                    size={100}
                  />
                  <View className={cx[b('join-community-grid-item-title')]}>加入的社团</View>
                </View>
                <View className={cx[b('join-community-grid-item')]}>
                  <Avatar
                    onAvatar={() => Taro.navigateTo({ url: URL['system-settings'] })}
                    src='https://s1.ax1x.com/2022/11/01/x7224g.png'
                    shape='rounded'
                    size={100}
                  />
                  <View className={cx[b('join-community-grid-item-title')]}>加入的社团</View>
                </View>
                <View className={cx[b('join-community-grid-item')]}>
                  <Avatar
                    onAvatar={() => Taro.navigateTo({ url: URL['system-settings'] })}
                    src='https://s1.ax1x.com/2022/11/01/x7224g.png'
                    shape='rounded'
                    size={100}
                  />
                  <View className={cx[b('join-community-grid-item-title')]}>加入的社团</View>
                </View>
              </View>
            </ScrollView>
          </UCard>
          <UCard className={cx[b('activity')]} showCardHeader={false}>
            <View className={cx[b('activity-body')]}>
              <View className={cx[b('activity-grid')]}>
                <Avatar
                  onAvatar={() => Taro.navigateTo({ url: URL['system-settings'] })}
                  src='https://s1.ax1x.com/2023/02/14/pSoHmnO.png'
                  shape='square'
                  size={68}
                />
                <View className={cx[b('activity-grid-title')]}>主办的活动</View>
              </View>
              <View className={cx[b('activity-grid')]}>
                <Avatar
                  onAvatar={() => Taro.navigateTo({ url: URL['system-settings'] })}
                  src='https://s1.ax1x.com/2023/02/14/pSoHZjK.png'
                  shape='square'
                  size={68}
                />
                <View className={cx[b('activity-grid-title')]}>报名的活动</View>
              </View>
            </View>
          </UCard>
          <UCard className={cx[b('settings')]} showCardHeader={false}>
            <UCell title='用户协议' />
            <UCell
              title='账户设置'
              bordered={false}
              onClickPress={() => Taro.navigateTo({ url: URL['system-settings'] })}
            />
          </UCard>
        </View>
      </View>
    </PageContainer>
  );
};

export default MinePage;
