import Taro, { Component } from "@tarojs/taro"
import { View, Text, Image, Button } from "@tarojs/components"
import "./index.less"

class SeckillCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.init()
  }

  render() {
    let { } = this.props
    let {  } = this.state
    return (
      <View></View>
    )
  }
}

export default Item
