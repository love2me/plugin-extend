import Plugin from './index'
class PluginExample extends Plugin {
  constructor (options = {}) {
    super()
  }
}
const instance = new PluginExample()
instance.use({
  install () {
    console.log(1)
  }
})
instance.useSync([{
  install (ins, next) {
    setTimeout(() => {
      console.log(2)
      next()
    }, 2000)
  }
}, {
  install (ins, next) {
    setTimeout(() => {
      console.log(3)
      next()
    }, 1000)
  }
}])
instance.use({
  install (ins, next) {
    console.log(4)
  }
})
export default PluginExample
