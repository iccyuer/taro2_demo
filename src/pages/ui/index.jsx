import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtCountdown, AtTimeline } from 'taro-ui'

import './index.less'
import "taro-ui/dist/style/components/countdown.scss";
import "taro-ui/dist/style/components/timeline.scss";
import "taro-ui/dist/style/components/icon.scss";

@inject('userStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: 'ui'
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

  onTimeUp() {
    Taro.showToast({
      title: '时间到',
      icon: 'success',
      duration: 2000
    })
  }

  render() {
    return (
      <View className='index'>
        <AtCountdown
          format={{ hours: ':', minutes: ':', seconds: '' }}
          seconds={10}
          onTimeUp={this.onTimeUp.bind(this)}
        />

        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots>
          <SwiperItem>
            <View className='demo-text-1'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
            <View className='demo-text-2'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-3'>3</View>
          </SwiperItem>
        </Swiper>
        <AtTimeline
          items={[
            { title: '刷牙洗脸' },
            { title: '吃早餐' },
            { title: '上班' },
            { title: '睡觉' }
          ]}
        >
        </AtTimeline>
      </View>
    )
  }
}

export default Index
