## API

### Props

| 字段                | 说明                                       | 类型    | 默认值   |
| ------------------- | ------------------------------------------ | ------- | -------- |
| source              | 视频地址和类型设置                         | Object  | -        |
| options             | 控制视频播放属性                           | Object  | required |
| options.autoplay    | 是否自动播放                               | Boolean | false    |
| options.poster      | 海报设置                                   | String  | -        |
| options.loop        | 是否循环播放                               | Boolean | false    |
| options.controls    | 是否展示操作栏                             | Boolean | true     |
| options.muted       | 是否静音                                   | Boolean | false    |
| options.playsinline | 是否设置为行内播放元素（解决安卓兼容问题） | Boolean | false    |

### Events

| 事件名称            | 说明         | 回调参数 |
| ------------------- | ------------ | -------- |
| onPlayFuc `v1.3.8`  | 播放         | --       |
| onPauseFuc `v1.3.8` | 暂停         | --       |
| onPlayend `v1.3.8`  | 播放完成回调 | --       |
