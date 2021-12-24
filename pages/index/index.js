import React, { useState } from 'react'
import { render } from '../renderer/index'

function Index() {
  const [state, setState] = useState(1);

  return (
    <view>
      <view>hello world</view>
      <button hzmTap={() => setState(state => state + 1)}>+</button>
      <view>{state}</view>
      <button hzmTap={() => setState(state => state - 1)}>-</button>
    </view>
  )
}

Page({
  data: {
    vdom: null,
  },
  onLoad() {
    render(<Index />, {
      mounted: (vdom) => {
        console.log(vdom)
        this.setData({ vdom }) // 挂载阶段
      },
      updated: (vdom) => this.setData({ vdom }), // 更新阶段
    })
  },
})
