import Taro, { Component } from "@tarojs/taro"
import { View, Text, Image, Button } from "@tarojs/components"
import PropTypes from 'prop-types'
import "./index.less"

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: props.count
    }
  }

  static propTypes = {
    color: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }

  // defaultProps①
  static defaultProps = {
    color: 'blue',
    selected: false,
    count: 2,
    onChange: () => {}
  }

  handleClick(count, e) {
    this.setState({
      counter: count + 2
    })
  }

  render() {
    let { color, selected, onChange } = this.props
    let { name, counter } = this.state
    return (
      <View className="item">
        <Text className={color}>text</Text>
        <View>{name}</View>
        <View>{selected ? 'selected' : 'unselected'}</View>
        <View>Counter: {counter}</View>
        <Button onClick={this.handleClick.bind(this, counter)}>click me</Button>
        <Button onClick={onChange.bind(this)}>handle out</Button>
      </View>
    )
  }
}

// defaultProps②
// Item.defaultProps = {
//   color: 'blue'
// }

export default Item
