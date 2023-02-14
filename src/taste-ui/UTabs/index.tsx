import React, {
  FC,
  memo,
  CSSProperties,
  isValidElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react';
import cls from 'classnames';
import { View, Block, ScrollView } from '@tarojs/components';
import { map, isEmpty } from 'lodash';

import bem from 'utils/bem';

import cx from './index.module.scss';

export interface TabsProps {
  className: string;
  style: CSSProperties;
  tabStyle: CSSProperties;
  value: string | number;
  color: string;
  background: string;
  titleScroll: boolean;
  ellipsis: boolean;
  animatedTime: number | string;
  titleGutter: number | string;
  titleNode: ReactNode;
  justify: 'center' | 'end' | 'start';
  onChange: (t: any) => void;
  onClick: (t: any) => void;
  autoHeight: boolean;
  dataSource: any;
  valueKey: string;
  valueLabel: string;
  tabExtra: ReactNode;
  children?: ReactNode;
}

const defaultProps = {
  tabStyle: {},
  value: 0,
  color: '',
  background: '',
  titleScroll: false,
  ellipsis: true,
  animatedTime: 300,
  titleGutter: 0,
  autoHeight: false,
  valueKey: '',
  valueLabel: '',
  dataSource: [],
  justify: 'start'
} as TabsProps;

const pxCheck = (value: string | number): string => {
  return Number.isNaN(Number(value)) ? String(value) : `${value}px`;
};

const UTabs: FC<Partial<TabsProps>> = (props) => {
  const {
    value,
    color,
    tabStyle,
    background,
    titleScroll,
    tabExtra,
    ellipsis,
    animatedTime,
    titleGutter,
    titleNode,
    children,
    onClick,
    onChange,
    className,
    autoHeight,
    dataSource,
    valueKey,
    valueLabel,
    justify,
    ...rest
  } = {
    ...defaultProps,
    ...props
  };
  const b = bem('tabs');

  const titleStyle = {
    marginLeft: pxCheck(titleGutter),
    marginRight: pxCheck(titleGutter),
    ...(justify === 'center' ? { flex: 'auto' } : {})
  };

  const findInd = useMemo(() => dataSource.findIndex((t: any) => t[valueKey] == value), [dataSource, value]);

  const tabChange = useCallback((item: any, index: number) => {
    onClick && onClick(item);
    if (item.disabled) {
      return;
    }
    onChange && onChange(item);
  }, []);

  return (
    <View className={cls(cx[b()], className)} {...rest}>
      <View
        className={cls(cx[b('tab')], {
          [cx['scrollable']]: titleScroll
        })}
        style={{ ...tabStyle, background }}
      >
        <Block r-if={isValidElement(titleNode)}>{titleNode}</Block>
        <ScrollView
          scrollX
          scrollWithAnimation
          enableFlex
          className={cx[b('tab-scroll-view')]}
          r-if={!isValidElement(titleNode)}
        >
          {map(dataSource, (item, index: number) => {
            return (
              <View
                style={titleStyle}
                onClick={() => tabChange(item, index)}
                className={cls(
                  {
                    [cx['active']]: item[valueKey] == value
                  },
                  cx[b('tab-item')]
                )}
                key={item[valueKey]}
              >
                <View className={cx[b('tab-item__line')]} style={{ background: color }} />
                <View
                  className={cls(cx[b('tab-item__text')], {
                    ellipsis: ellipsis && !titleScroll
                  })}
                >
                  {item[valueLabel]}
                </View>
              </View>
            );
          })}
        </ScrollView>
        <Block className={cx[b('tab-extra')]} r-if={tabExtra}>
          {tabExtra}
        </Block>
      </View>
      <View className={`${b('')}__content__wrap`}>
        <View
          className={`${b('')}__content`}
          style={{
            transform: `translate3d( 0,-${findInd * 100}%, 0)`,
            transitionDuration: `${animatedTime}ms`
          }}
        >
          {children}
        </View>
      </View>
    </View>
  );
};
export default memo(UTabs);
