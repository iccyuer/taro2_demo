import { observable } from 'mobx'

const userStore = observable({
  userInfo: {
    name: 'lihi'
  },

  setUserInfo(data) {
    this.userInfo = Object.assign({}, this.userInfo, data)
  }
})
export default userStore
