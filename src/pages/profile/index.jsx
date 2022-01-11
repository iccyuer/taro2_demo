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
    this.Item.innerFun('klklk')
  }

  handleChange(e) {
    console.log('e', e)
    console.log('this', this) // this->Item
    this.setState({
      counter: this.state.counter + 3
    })
  }
  handleChange2(e) {
    console.log('e', e)
    console.log('this', this) // this->this
  }

  go2ui() {
    Taro.navigateTo({
      url: '/pages/ui/index'
    })
  }

  go2goods() {
    Taro.navigateTo({
      url: '/pages/goods/list/index'
    })
  }

  render() {
    const { userStore: { userInfo } } = this.props
    return (
      <View className='index'>
        <View>{userInfo.name}</View>
        <Button onClick={this.changeName.bind(this)}>change name</Button>
        <Button onClick={this.go2ui.bind(this)}>go2ui</Button>
        <Button onClick={this.go2goods.bind(this)}>go2goods</Button>
        <Item color="red" selected={true} count={23} onChange={this.handleChange} onChange2={this.handleChange2.bind(this)} />
        <Item ref={ref => this.Item = ref}/>
      </View>
    )
  }
}

export default Index
