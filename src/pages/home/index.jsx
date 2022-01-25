import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Time from './components/Time'

import './index.less'


@inject('userStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() {
    // console.error('idnex#####')
    let app = Taro.getApp()
    console.log('g', app.globalData)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { userStore: { userInfo } } = this.props
    return (
      <View className='index'>
        home
        <View>{userInfo.name}</View>
        <Time></Time>
      </View>
    )
  }
}

export default Index
