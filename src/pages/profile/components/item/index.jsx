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
    onChange: () => { },
    onChange2: () => { }
  }

  handleClick(count, e) {
    this.setState({
      counter: count + 2
    })
  }

  innerFun(name) {
    console.log('inner', name)
  }

  render() {
    let { color, selected, onChange, onChange2 } = this.props
    let { name, counter } = this.state
    return (
      <View className="item">
        <Text className={color}>text</Text>
        <View>{name}</View>
        <View>{selected ? 'selected' : 'unselected'}</View>
        <View>Counter: {counter}</View>
        <Button onClick={this.handleClick.bind(this, counter)}>click me</Button>
        <Button onClick={onChange.bind(this, 2)}>handle out</Button>
        <Button onClick={onChange2.bind(this, 3)}>handle out2</Button>
      </View>
    )
  }
}

// defaultProps②
// Item.defaultProps = {
//   color: 'blue'
// }

export default Item
