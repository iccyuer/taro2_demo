import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.less'

import Item from './components/item'

@inject('userStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '我的'
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

  changeName() {
    const { userStore } = this.props
    userStore.setUserInfo({ name: 'klkl' })
  }

  handleChange(e) {
    this.setState({
      counter: this.state.counter + 3
    })
  }

  go2ui() {
    Taro.navigateTo({
      url: '/pages/ui/index'
    })
  }

  render() {
    const { userStore: { userInfo } } = this.props
    return (
      <View className='index'>
        <View>{userInfo.name}</View>
        <Button onClick={this.changeName.bind(this)}>change name</Button>
        <Button onClick={this.go2ui.bind(this)}>go2ui</Button>
        <Item color="red" selected={true} count={23} onChange={this.handleChange} />
        <Item />
      </View>
    )
  }
}

export default Index
