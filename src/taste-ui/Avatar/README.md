# Avatar 头像

### 介绍

显示用户头像、首字母或备用图标。

## 代码演示

### 基础用法

设置 `style` 可以修改,背景颜色

```tsx
<Avatar>P</Avatar>
<Avatar style={{ background: "green" }}>N</Avatar>
<Avatar style={{ background: "pink" }}>HP</Avatar>
```

### 尺寸

设置 `size` 属性后，可以选择四个大小。

```tsx
<Avatar src="https://joeschmoe.io/api/v1/random" size="mini" />
<Avatar src="https://joeschmoe.io/api/v1/random" size="small" />
<Avatar src="https://joeschmoe.io/api/v1/random" size="medium" />
<Avatar src="https://joeschmoe.io/api/v1/random" size="large" />
<Avatar src="https://joeschmoe.io/api/v1/random" size={32} />
<Avatar src="https://joeschmoe.io/api/v1/random" size={[120,58]} />
```

### 形状

通过 `variant` 属性来设置形状。

```tsx
<Avatar src="https://joeschmoe.io/api/v1/random" />
<Avatar src="https://joeschmoe.io/api/v1/random" shape="square" />
<Avatar src="https://joeschmoe.io/api/v1/random" shape="rounded" />
```

### 群组

最多显示 5 个。

```tsx
<Avatar.Group total={24}>
	<Avatar src="https://joeschmoe.io/api/v1/random" />
	<Avatar src="https://joeschmoe.io/api/v1/random" />
	<Avatar src="https://joeschmoe.io/api/v1/random" />
	<Avatar src="https://joeschmoe.io/api/v1/random" />
	<Avatar src="https://joeschmoe.io/api/v1/random" />
	<Avatar src="https://joeschmoe.io/api/v1/random" />
</Avatar.Group>
```

### 最大

通过 `max` 属性最大可展示数量,最多显示 5 个。

```tsx
<Avatar.Group max={3}>
	<Avatar src="https://joeschmoe.io/api/v1/random" />
	<Avatar src="https://joeschmoe.io/api/v1/random" />
	<Avatar src="https://joeschmoe.io/api/v1/random" />
	<Avatar src="https://joeschmoe.io/api/v1/random" />
	<Avatar src="https://joeschmoe.io/api/v1/random" />
	<Avatar src="https://joeschmoe.io/api/v1/random" />
</Avatar.Group>
```

### 图标

```tsx
<Avatar style={{ background: "red" }}>
  <Cross />
</Avatar>
<Avatar style={{ background: "pink" }}>
  <LocationOutlined />
</Avatar>
<Avatar style={{ background: "green" }}>
  <SettingOutlined />
</Avatar>
```

## API

### Avatar Props

| 参数  | 说明                                           | 类型     | 默认值   |
| ----- | ---------------------------------------------- | -------- | -------- |
| src   | 传入图片的链接,传入之后嵌套内容不展示          | _string_ | -        |
| alt   | 图片不显示时的文本内容                         | _string_ | -        |
| shape | 形状，可选值为 `square` `rounded` `circle`     | _string_ | `circle` |
| size  | 大小，可选值为 `mini` `small` `medium` `large` | _string_ | `medium` |

### Avatar.Group Props

| 参数    | 说明                                       | 类型     | 默认值   |
| ------- | ------------------------------------------ | -------- | -------- |
| shape   | 形状，可选值为 `square` `rounded` `circle` | _string_ | `circle` |
| spacing | 间距，可选值为 `small` `medium` `large`    | _string_ | `medium` |
| limit   | 显示的最大头像个数                         | _number_ | -        |
| total   | 头像总数。用于计算额外头像的数量。         | _string_ | -        |
