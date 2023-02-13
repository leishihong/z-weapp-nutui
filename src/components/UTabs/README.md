:::

## API

### Tabs Props

| 参数             | 说明                                          | 类型                  | 默认值     |
|----------------|-----------------------------------------------|---------------------|------------|
| value          | 绑定当前选中标签的标识符                      | number,string       | 0          |
| color          | 标签选中色                                    | string              | #1a1a1a    |
| background     | 标签栏背景颜色                                | string              | #f5f5f5    |
| direction      | 使用横纵方向 可选值 horizontal、vertical      | string              | horizontal |
| type           | 选中底部展示样式 可选值 line、smile           | string              | line       |
| titleScroll    | 标签栏是否可以滚动                            | boolean             | false      |
| ellipsis       | 是否省略过长的标题文字                        | boolean             | true       |
| animatedTime   | 切换动画时长,单位 ms 0 代表无动画              | number,string       | 300        |
| titleGutter    | 标签间隙                                      | number,string       | 0          |
| titleNode      | 自定义导航区域                                 | `() => JSX.Element[]` | 0          |
| size           | 标签栏字体尺寸大小 可选值 large normal small | string              | normal     |
| autoHeight`v1.2.1` | 自动高度。设置为 true 时，nut-tabs 和 nut-tabs__content 会随着当前 nut-tabpane 的高度而发生变化。 | boolean             | false     |
| tabStyle`v1.3.8` | 标签栏样式 | React.CSSProperties | {}     |

## Tabs Children

| 名称    | 说明           |
|---------|----------------|
| default | 自定义内容     |

### Tabs Events

| 事件名 | 说明                     | 回调参数                 |
|--------|--------------------------|--------------------------|
| onClick  | 点击标签时触发           | {title,paneKey,disabled} |
| onChange | 当前激活的标签改变时触发 | {title,paneKey,disabled} |

