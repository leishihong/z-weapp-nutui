## API

### Props

| 字段                | 说明               | 类型                                                        | 默认值                |
| ------------------- | ------------------ | ----------------------------------------------------------- | --------------------- |
| height              | 电梯区域的高度     | Number、String                                              | `200px`               |
| acceptKey           | 索引 key 值        | String                                                      | `title`               |
| indexList           | 索引列表           | Array（item 需包含 id、name 属性, name 支持传入 html 结构） | `[{id: 0, name: ''}]` |
| isSticky`v1.2.1`    | 索引是否吸顶       | Boolean                                                     | `false`               |
| spaceHeight`v1.2.1` | 右侧锚点的上下间距 | Number                                                      | `23`                  |
| titleHeight`v1.2.1` | 左侧索引的高度     | Number                                                      | `35`                  |

### Event

| 名称                     | 说明     | 回调参数                               |
| ------------------------ | -------- | -------------------------------------- |
| onClickItem`v1.3.2`      | 点击内容 | key: string, item: { id: 0, name: '' } |
| onClickIndex`v1.3.2`     | 点击索引 | key: string                            |
| clickItem`v1.3.2(废弃)`  | 点击内容 | key: string, item: { id: 0, name: '' } |
| clickIndex`v1.3.2(废弃)` | 点击索引 | key: string                            |
