import Taro, { Component } from "@tarojs/taro"
import { View, Text, Image, Button } from "@tarojs/components"
import "./index.less"

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      scrollLeft: 0
    }
  }

  static defaultProps = {
    list: [
      { title: '热卖中' },
      { title: '10:00' },
      { title: '12:00' },
      { title: '16:00' },
      { title: '18:00' },
      { title: '20:00' },
      { title: '21:00' },
      { title: '明日预告' }
    ]
  }

  handleClick(count, e) {
    this.setState({
      counter: count + 2
    })
  }

  onClassificationScroll() {}

  switchCategory() {}

  render() {
    let { list } = this.props
    let { scrollLeft } = this.state
    return (
      <View className="time">
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
              return <View onClick={this.switchCategory.bind(this, index)} id={`cateName_` + index} className={`cateName ${activeIndex == index ? 'active' : ''}`} key={`categoryName_` + index}>
                {title}
              </View>
            })}
          {/* </View> */}
        </ScrollView>
      </View>
    )
  }
}

export default Item
