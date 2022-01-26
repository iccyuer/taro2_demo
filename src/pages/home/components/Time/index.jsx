import Taro, { Component } from "@tarojs/taro"
import { View, Text, Image, Button } from "@tarojs/components"
import "./index.less"

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeIndex: 0, // timetab
      activeIndex: 0, // 选中tab
      autoIndex: 0,
      manualIndex: 0,
      scrollLeft: 0,
      list: [
        { title: '热卖中', content: '不能错过', begin: 0, end: 35099000, timeBegin: 0, timeEnd: 35999000 }, // 0~09:44:59  0~09:59:59
        { title: '10:00', begin: 35100000, end: 42299000, timeBegin: 36000000, timeEnd: 43199000 }, // 09:45~11:44:59  10:00~11:59:59
        { title: '12:00', begin: 42300000, end: 56699000, timeBegin: 43200000, timeEnd: 57599000 }, // 11:45~15:44:59  12:00~15:59:59
        { title: '16:00', begin: 56700000, end: 63899000, timeBegin: 57600000, timeEnd: 64799000 }, // 15:45~17:44:59  16:00~17:59:59
        { title: '18:00', begin: 63900000, end: 71099000, timeBegin: 64800000, timeEnd: 71999000 }, // 17:45~19:44:59  18:00~19:59:59
        { title: '20:00', begin: 71100000, end: 74699000, timeBegin: 72000000, timeEnd: 75599000 }, // 19:45~20:44:59  20:00~20:59:59
        { title: '21:00', begin: 74700000, end: 81899000, timeBegin: 75600000, timeEnd: 82799000 }, // 20:45~22:44:59  21:00~22:59:59
        { title: '明日预告', content: '不能错过', begin: 81900000, end: 86399000, timeBegin: 82800000, timeEnd: 86399000 } // 22:45~23:59:59   23:00~23:59:59
      ]
    }
  }

  timer = null
  rpxToPx = 0
  classificationItemWidth = 0

  static defaultProps = {}

  componentWillMount() {
    console.log('ee-componentWillMount')
  }

  componentDidMount() {
    console.log('ee-componentDidMount')
    let app = Taro.getApp()
    this.rpxToPx = app.globalData && app.globalData.rpxToPx
    this.classificationScrollCenter(0)
    this.init()
  }

  onClassificationScroll() { }

  async switchCategory(index, event) {
    let domOffsetLeft = 0
    if (event) {
      domOffsetLeft = event.currentTarget.offsetLeft
    } else {
      domOffsetLeft = index * this.classificationItemWidth
    }
    console.log('domOffsetLeft', domOffsetLeft)
    await this.classificationScrollCenter(index)
    this.calScrollLeft(domOffsetLeft)
    this.setState({
      manualIndex: index
    })
  }

  init() {
    const { list } = this.state;
    console.log('list', list)
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      let _day = new Date(new Date().toLocaleDateString()).getTime()
      let _now = new Date().getTime()
      let bol_1 = false
      let bol_2 = false
      list.some((time, index) => {
        if (_now >= _day + time.begin && _now < _day + time.end) {
          bol_1 = true
          if (this.state.autoIndex != index) {
            this.setState({ autoIndex: index })
            if (this.state.manualIndex != index) {
              this.setState({ manualIndex: index })
              this.switchCategory(index)
            }
          }
        }
        if (_now >= _day + time.timeBegin && _now < _day + time.timeEnd) {
          bol_2 = true;
          if (this.state.timeIndex != index) {
            this.setState({ timeIndex: index })
          }
        }
        return bol_1 && bol_2;
      })
    }, 1000)
  }

  calScrollLeft(domOffsetLeft) {
    let winWidth = (750 - 60) * this.rpxToPx
    let scrollLeft = domOffsetLeft - winWidth / 2 + this.classificationItemWidth / 2
    this.setState({ scrollLeft })
  }

  classificationScrollCenter(index) {
    return new Promise((resolve, reject) => {
      let query = wx.createSelectorQuery().in(this.$scope)
      query.select(`#timeName_` + index).boundingClientRect(rect => {
        console.log('rect', rect)
        const { width = 0 } = rect;
        this.classificationItemWidth = width
        resolve(width)
      }).exec();
    })
  }

  render() {
    let { } = this.props
    let { list, scrollLeft, activeIndex, autoIndex, manualIndex } = this.state
    return (
      // <View className="time">
      <ScrollView
        className='_Time'
        scrollX={true}
        scrollAnchoring={true}
        scrollLeft={scrollLeft}
        enableFlex={true}
        onScroll={this.onClassificationScroll.bind(this)}
        scrollWithAnimation={true}
      >
        {/* <View className='cont'> */}
        {list.map((item, index) => {
          let { title, content } = item
          return <View onClick={this.switchCategory.bind(this, index)} id={`timeName_` + index} className={`timeName ${manualIndex == index ? 'active' : ''}`} key={`timeName` + index}>
            <View>{title}</View>
            <View>{content ? content : timeIndex >= index ? '抢购中' : '即将开始'}</View>
          </View>
        })}
        {/* </View> */}
      </ScrollView>
      // </View>
    )
  }
}

export default Item
