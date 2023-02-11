import { memo, FC, CSSProperties, ReactNode, useMemo, isValidElement } from 'react';
import { View, Block } from '@tarojs/components';
import { ViewProps } from '@tarojs/components/types/View';
import cls from 'classnames';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';
import { preventDefault } from 'utils/dom/event';
import {isEmpty,map,isUndefined,isNumber} from 'lodash';

import { Avatar } from 'taste-ui/index';
import Transition, { TransitionName } from '../Transition';

import { PopupPlacement } from './type';

import cx from './index.module.scss';

function toTransactionName(placement?: PopupPlacement) {
  if (placement === 'top') {
    return TransitionName.SlideDown;
  }

  if (placement === 'bottom') {
    return TransitionName.SlideUp;
  }

  if (placement === 'right') {
    return TransitionName.SlideRight;
  }

  if (placement === 'left') {
    return TransitionName.SlideLeft;
  }

  return TransitionName.Fade;
}

interface IFooterBtnList {
  title: string;
  type?: any;
  btnCls?: string;
  onClick?: () => void;
}

export interface PopupProps extends ViewProps {
  visible?: boolean;
  placement?: PopupPlacement;

  title?: string | ReactNode;
  customTitle?: ReactNode;

  mask?: boolean;
  maskClosable?: boolean;
  maskStyle?: CSSProperties;
  popupRender?: ReactNode;

  onCancel?: () => void;
  onConfirm?: () => void;

  cancelText?: string;
  confirmText?: string;

  showToolbar?: boolean;
  showHeaderBtn?: boolean;

  footer?: ReactNode|any;
  footerBtnList?: Array<IFooterBtnList>;

  closeable?: boolean;
  closeIcon?: ReactNode | string;
  closeIconStyle?: { shape: any; size: any; [key: string]: any };

  rootCls?: string;
  style?: CSSProperties;

  wrapCls?: string;
  wrapStyle?: CSSProperties;
  headerCls?: CSSProperties;
  bodyCls?: string;
  bodyStyle?: string;
  footerCls?: string;

  rounded?: boolean;
  children?: ReactNode;

  duration?: number;
  mountOnEnter?: boolean;
  transaction?: string;
  transactionTimeout?: number | { appear?: number; enter?: number; exit?: number };
  transitionAppear?: boolean;

  onTransitionEnter?: EnterHandler<HTMLElement>;
  onTransitionEntered?: EnterHandler<HTMLElement>;
  onTransitionExited?: ExitHandler<HTMLElement>;
}
export type PopupClosePlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

function popupClosePlacement(placement?: PopupClosePlacement | any) {
  switch (placement) {
    case 'right':
      return 'top-right';
    case 'left':
      return 'top-left';
    default:
      return 'top-right';
  }
}

const Popup: FC<PopupProps> = (props) => {
  const {
    visible = false,
    placement,
    rounded = false,
    rootCls,
    style,

    mask = true,
    maskClosable = true,
    maskStyle,
    popupRender,

    onCancel,
    onConfirm,
    cancelText = '取消',
    confirmText = '确定',

    showToolbar = true,
    showHeaderBtn = false,

    footer,
    footerBtnList,

    closeable = false,
    closeIcon,
    closeIconStyle = {},

    title,
    customTitle,

    wrapStyle,
    wrapCls,
    headerCls,
    bodyCls,
    bodyStyle,
    footerCls,

    children,
    duration = 300,

    transaction,
    transactionTimeout,
    transitionAppear = true,
    mountOnEnter = true,
    onTransitionEnter,
    onTransitionEntered,
    onTransitionExited,
    ...restProps
  } = props;

  const ctxPlacement = useMemo(() => popupClosePlacement(placement), [placement]);

  const transactionName = useMemo(() => transaction ?? toTransactionName(placement), [transaction, placement]);

  const durationStyle = useMemo(
    () => (isNumber(duration) ? { 'animation-duration': `${duration as number}ms` } : {}),
    [duration]
  );

  const renderMask = useMemo(() => {
    return (
      mask && (
        <Transition in={visible} appear mountOnEnter name="fade">
          <View
            className={cls(cx['backdrop'], {
              [cx['backdrop--open']]: visible
            })}
            style={{
              ...durationStyle,
              ...maskStyle
            }}
            catchMove
            onClick={() => maskClosable && onCancel?.()}
            onTouchMove={preventDefault}
            {...restProps}
          />
        </Transition>
      )
    );
  }, [mask, maskClosable, visible, durationStyle, maskStyle]);

  // 渲染closeIcon
  const renderClose = useMemo(() => {
    if (closeable) {
      const { shape = 'circle', size = 52, src }: any = closeIconStyle;
      const closeSrc: any = closeIcon ?? (src || 'https://s1.ax1x.com/2022/11/12/ziJces.png');
      return (
        <View className={cls(cx['popup__close'], [cx[`popup__close-${ctxPlacement}`]])} onClick={onCancel}>
          {isValidElement(closeIcon) ? closeIcon : <Avatar src={closeSrc} shape={shape} size={size} />}
        </View>
      );
    }
  }, [closeable, closeIcon, ctxPlacement]);

  const renderHeader = useMemo(() => {
    if (showToolbar) {
      return (
        <View className={cls(cx['u-popup__header-wrap'], headerCls)}>
          {showHeaderBtn && (
            <View className={cls(cx['u-popup__header-btn'], cx['cancelBtn'])} onClick={onCancel}>
              {cancelText}
            </View>
          )}
          {title ? (
            <View className={cls(cx['u-popup__header-title'])} style={{ paddingRight: closeable ? '32rpx' : '0' }}>
              {title}
            </View>
          ) : (
            customTitle
          )}
          {showHeaderBtn && (
            <View className={cls(cx['u-popup__header-btn'], cx['confirmBtn'])} onClick={onConfirm}>
              {confirmText}
            </View>
          )}
        </View>
      );
    }
  }, [showToolbar, closeable, title, customTitle, confirmText, cancelText]);

  const renderFooter = useMemo(() => {
    let footerElement: any = '';
    if (!isEmpty(footerBtnList)) {
      footerElement = map(footerBtnList, (item) => (
        <View className={item.btnCls} {...item}>
          {item.title}
        </View>
      ));
    } else if (footer === undefined) {
      footerElement = (
        <Block>
          <View className={cls(cx['u-popup__footer-btn'], cx['cancelBtn'])} onClick={onCancel}>
            {cancelText}
          </View>
          <View className={cls(cx['u-popup__footer-btn'], cx['confirmBtn'])} onClick={onConfirm}>
            {confirmText}
          </View>
        </Block>
      );
    } else {
      footerElement = footer;
    }

    return (
      footerElement && (
        <View
          className={cls(cx['u-popup__footer-wrap'], { 'safe-area-inset-bottom': placement === 'bottom' }, footerCls)}
        >
          {footerElement}
        </View>
      )
    );
  }, [footer, footerBtnList]);

  return (
    <Block>
      <Transition
        in={visible}
        name={transactionName}
        appear={transitionAppear}
        timeout={transactionTimeout}
        mountOnEnter={mountOnEnter}
        onEnter={onTransitionEnter}
        onEntered={onTransitionEntered}
        onExited={onTransitionExited}
      >
        <View
          className={cls(
            cx['popup'],
            {
              [cx['popup--rounded']]: rounded,
              [cx['popup--center']]: isUndefined(placement),
              [cx['popup--top']]: placement === 'top',
              [cx['popup--right']]: placement === 'right',
              [cx['popup--bottom']]: placement === 'bottom',
              [cx['popup--left']]: placement === 'left'
            },
            rootCls
          )}
          style={{
            ...durationStyle,
            ...style
          }}
          catchMove
          onTouchMove={preventDefault}
          {...restProps}
        >
          {popupRender ? (
            popupRender
          ) : (
            <View className={cls(cx['u-popup'], wrapCls)} style={wrapStyle}>
              {/* 关闭按钮 */}
              {renderClose}
              {/* 头部内容 */}
              <View className={cls(cx['u-popup__header'])}>{renderHeader}</View>
              {/* 内容区域 */}
              <View
                className={cls(
                  cx['u-popup__content'],
                  {
                    'safe-area-inset-bottom': placement === 'bottom' && isEmpty(footerBtnList) && !footer
                  },
                  bodyCls
                )}
                style={bodyStyle}
              >
                {children}
              </View>
              {/* 底部btn按钮 */}
              <View className={cx['u-popup__footer']}>{renderFooter}</View>
            </View>
          )}
        </View>
      </Transition>
      {renderMask}
    </Block>
  );
};

export default memo(Popup);
