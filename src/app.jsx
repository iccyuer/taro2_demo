import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import counterStore from './store/counter'
import userStore from './store/user'

import './app.less'
import "@tarojs/async-await";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore,
  userStore
}

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/home/index',
      'pages/profile/index',
      'pages/ui/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#BBBBBB",
      selectedColor: "#000000",
      borderStyle: "white",
      list: [
        {
          pagePath: "pages/home/index",
          text: "首页",
          iconPath: "./images/tabbar/home@2x.png",
          selectedIconPath: "./images/tabbar/home_active@2x.png"
        },
        {
          pagePath: "pages/profile/index",
          text: "我的",
          iconPath: "./images/tabbar/my@2x.png",
          selectedIconPath: "./images/tabbar/my_active@2x.png"
        }
      ]
    },
    "subPackages": [
      {
        "root": "pages/goods",
        "name": "goods",
        "pages": [
          "list/index", // 注册
        ]
      }
    ],
    preloadRule: {
      "pages/index/index": {
        network: "all",
        packages: [
          'pages/goods'
        ]
      }
    },
  }

  globalData = {
    rpxToPx: 0,
    pxToRpx: 0
  };

  componentDidMount() {
    console.log('app-componentDidMount')
    this.init()
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  init() {
    // 初始化其他的信息
    Taro.getSystemInfo({
      success: res => {
        console.log("statusBarHeight", res);
        this.globalData.rpxToPx = res.windowWidth / 750;
        this.globalData.pxToRpx = 750 / res.windowWidth;
      }
    })
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
