import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.less'

@inject('userStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: 'goods-list'
  }

  constructor() {
    this.state = {

    }
  }

  componentWillMount() { }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        goods-list
      </View>
    )
  }
}

export default Index
