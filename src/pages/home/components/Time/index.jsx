import Taro, { Component } from "@tarojs/taro"
import { View, Text, Image, Button } from "@tarojs/components"
import "./index.less"

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0, // 选中tab
      timeIndex: 0, // timetab
      scrollLeft: 0,
      list: [
        { title: '热卖中', content: '不能错过', begin: 0, end: 35099000 }, // 0~09:44:59
        { title: '10:00', begin: 35100000, end: 42299000 }, // 09:45~11:44:59
        { title: '12:00', begin: 42300000, end: 56699000 }, // 11:45~15:44:59
        { title: '16:00', begin: 56700000, end: 63899000 }, // 15:45~17:44:59
        { title: '18:00', begin: 63900000, end: 71099000 }, // 17:45~19:44:59
        { title: '20:00', begin: 71100000, end: 74699000 }, // 19:45~20:44:59
        { title: '21:00', begin: 74700000, end: 85499000 }, // 20:45~23:44:59
        { title: '明日预告', content: '不能错过', begin: 85500000, end: 86399000 } // 23:45~23:59:59
      ]
    }
  }

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
    this.init()
  }

  onClassificationScroll() { }

  async switchCategory(index, event) {
    let domOffsetLeft = event.currentTarget.offsetLeft
    console.log('domOffsetLeft', domOffsetLeft)
    await this.classificationScrollCenter(index)
    this.calScrollLeft(domOffsetLeft)
    this.setState({
      activeIndex: index
    })
  }

  init() {
    const { list } = this.state;
    console.log('list', list)
    this.timer = setInterval(() => {
      let _day = new Date(new Date().toLocaleDateString()).getTime()
      let _now = new Date().getTime();
      list.some((time, index) => {
        // console.log(_now, _day + time.activeTime, _now >= _day + time.activeTime)
        if (_now >= _day + time.begin && _now < _day + time.end) {
          this.setState({
            activeIndex: index,
            timeIndex: index
          })
          return true;
        }
      })
    }, 0)
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
    let { list, scrollLeft, activeIndex } = this.state
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
          let { title } = item
          return <View onClick={this.switchCategory.bind(this, index)} id={`timeName_` + index} className={`timeName ${activeIndex == index ? 'active' : ''}`} key={`timeName` + index}>
            <View>{title}</View>
            <View>{title}</View>
          </View>
        })}
        {/* </View> */}
      </ScrollView>
      // </View>
    )
  }
}

export default Item
