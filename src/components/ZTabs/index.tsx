import React, { FC,memo, useEffect, useRef, useState } from 'react'
import cls from 'classnames'
import bem from 'utils/bem'
class Title {
  title = ''

  paneKey = ''

  disabled = false

  index = 0

  // eslint-disable-next-line no-useless-constructor
  constructor() {}
}
export type TabsSize = 'large' | 'normal' | 'small'
export interface TabsProps  {
  className: string
  style: React.CSSProperties
  tabStyle: React.CSSProperties
  value: string | number
  color: string
  background: string
  direction: string
  type: string
  titleScroll: boolean
  ellipsis: boolean
  animatedTime: number | string
  titleGutter: number | string
  size: TabsSize
  titleNode: () => JSX.Element[]
  onChange: (t: Title) => void
  onClick: (t: Title) => void
  autoHeight: boolean
  children?: React.ReactNode
}

const defaultProps = {
  tabStyle: {},
  value: 0,
  color: '',
  background: '',
  direction: 'horizontal',
  type: 'line',
  titleScroll: false,
  ellipsis: true,
  animatedTime: 300,
  titleGutter: 0,
  size: 'normal',
  autoHeight: false,
} as TabsProps
const pxCheck = (value: string | number): string => {
  return Number.isNaN(Number(value)) ? String(value) : `${value}px`
}

const ZTabs:FC<Partial<TabsProps>>=(props)=>{
  const {
    value,
    color,
    tabStyle,
    background,
    direction,
    type,
    titleScroll,
    ellipsis,
    animatedTime,
    titleGutter,
    size,
    titleNode,
    children,
    onClick,
    onChange,
    className,
    autoHeight,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  }
  const [currentItem, setCurrentItem] = useState<Title>({ index: 0 } as Title)
  const titles = useRef<Title[]>([])

  useEffect(() => {
    let currentIndex = 0
    titles.current = []
    // eslint-disable-next-line consistent-return
    React.Children.forEach(children, (child, idx) => {
      if (!React.isValidElement(child)) {
        return null
      }
      const title = new Title()
      const childProps = child?.props
      if (childProps?.title || childProps?.paneKey) {
        title.title = childProps?.title
        title.paneKey = childProps?.paneKey || idx
        title.disabled = childProps?.disabled
        title.index = idx
        if (title.paneKey === value) {
          currentIndex = idx
        }
      }
      titles.current.push(title)
    })
    setCurrentItem(titles.current[currentIndex])
  }, [children])

  const b = bem('tabs')
  const classes = cls(direction, b(''), className)
  const classesTitle = cls(
    {
      [type]: type,
      scrollable: titleScroll,
      [size]: size,
    },
    `${b('')}__titles`
  )

  const titleStyle = {
    marginLeft: pxCheck(titleGutter),
    marginRight: pxCheck(titleGutter),
  }

  const tabsActiveStyle = {
    color: type === 'smile' ? color : '',
    background: type === 'line' ? color : '',
  }

  const index = titles.current.findIndex((t) => t.paneKey === value)

  const contentStyle = {
    transform:
      direction === 'horizontal'
        ? `translate3d(-${index * 100}%, 0, 0)`
        : `translate3d( 0,-${index * 100}%, 0)`,
    transitionDuration: `${animatedTime}ms`,
  }

  const tabChange = (item: Title, index: number) => {
    onClick && onClick(item)
    if (item.disabled) {
      return
    }
    setCurrentItem(item)
    onChange && onChange(item)
  }

}
export default memo(ZTabs)