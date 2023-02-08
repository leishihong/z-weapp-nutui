## 代码演示

### 基础用法

通过 `children` 属性设置通知栏的内容，通过 `UNoticeBar.Icon` 组件设置通知栏左侧的图标。

```tsx
<UNoticeBar scrollable>
	<UNoticeBar.Icon>
		<VolumeOutlined />
	</UNoticeBar.Icon>
	在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
</UNoticeBar>
```

### 滚动播放

通知栏的内容长度溢出时会自动开启滚动播放，通过 `scrollable` 属性可以控制该行为。

```tsx
<!-- 文字较短时，通过设置 scrollable 属性开启滚动播放 -->
<van-notice-bar scrollable text="技术是开发它的人的共同灵魂。" />
<UNoticeBar scrollable>技术是开发它的人的共同灵魂。</UNoticeBar>
<!-- 文字较长时，通过禁用 scrollable 属性关闭滚动播放 -->
<UNoticeBar scrollable={false}>
  在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
</UNoticeBar>
```

### 多行展示

文字较长时，可以通过设置 `wrapable` 属性来开启多行展示。

```tsx
<UNoticeBar wrapable scrollable={false}>
	在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
</UNoticeBar>
```

### 通知栏模式

通过 `UNoticeBar.Action` 组件可以显示不同的通知栏模式。

```tsx
<UNoticeBar scrollable={false}>
  技术是开发它的人的共同灵魂。
  <UNoticeBar.Action>
    <Cross />
  </UNoticeBar.Action>
</UNoticeBar>
<WhiteSpace />
<UNoticeBar scrollable={false}>
  技术是开发它的人的共同灵魂。
  <UNoticeBar.Action>
    <ArrowRight />
  </UNoticeBar.Action>
</UNoticeBar>
```

### 自定义样式

通过 `style` 属性设置文本颜色和背景色。

```tsx
<UNoticeBar style={{ color: '#1989fa', background: '#ecf9ff' }}>
	<UNoticeBar.Icon>
		<InfoOutlined />
	</UNoticeBar.Icon>
	技术是开发它的人的共同灵魂。
</UNoticeBar.Icon>
```

### 垂直滚动

搭配 UNoticeBar 和 Swiper 组件可以实现垂直滚动的效果。

```tsx
<UNoticeBar>
	<UNoticeBar.Icon>
		<VolumeOutlined />
	</UNoticeBar.Icon>
	<Swiper className="notice-swiper" direction="vertical" autoplay={3000}>
		<Swiper.Item>内容 1</Swiper.Item>
		<Swiper.Item>内容 2</Swiper.Item>
		<Swiper.Item>内容 3</Swiper.Item>
	</Swiper>
</UNoticeBar>
```

```scss
.notice-swiper {
	height: 40px * 2;
	line-height: 40px * 2;
}
```

## API

### Props

| 参数       | 说明                                                          | 类型               | 默认值  |
| ---------- | ------------------------------------------------------------- | ------------------ | ------- |
| className  | 通知栏自定义类名                                              | _string_           | -       |
| style      | 通知栏自定义样式                                              | _CSSProperties_    | -       |
| children   | 通知文本内容                                                  | _ReactNode_        | -       |
| delay      | 动画延迟时间 (ms)                                             | _number \| string_ | `1000`  |
| speed      | 滚动速率 (px/s)                                               | _number \| string_ | `60`    |
| scrollable | 是否开启滚动播放，内容长度溢出时默认开启                      | _boolean_          | `false` |
| wrapable   | 是否开启文本换行，只在禁用滚动时生效                          | _boolean_          | `false` |
| closeMode  | 是否启用右侧关闭图标，可以通过 slot[name=rightIcon]自定义图标 | Boolean            | false   |

### Slots

| 参数      | 说明                                                                    |
| --------- | ----------------------------------------------------------------------- |
| default   | 通知文本的内容                                                          |
| rightIcon | 自定义右侧图标                                                          |
| leftIcon  | 自定义左侧图标，垂直滚动模式下默认无左侧图标，配置后展示，配置为"close" |

### Events

| 事件名   | 说明                         | 回调参数            |
| -------- | ---------------------------- | ------------------- |
| onClick  | 点击通知栏时触发             | _event: MouseEvent_ |
| onReplay | 每当滚动栏重新开始滚动时触发 | -                   |
