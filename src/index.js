class Plugin {
  constructor () {
    this._syncPluginQueueId = 0 // 同步插件队列id
    this._syncPluginQueueMapping = {} // 同步插件队列集合
  }
  /**
   * 安装插件
   * @param {Object} plugin
   */
  use (plugins) {
    Array.isArray(plugins) ? plugins.forEach((plugin) => {
      plugin.install(this)
    }) : plugins.install(this)
  }
  /**
   * 以同步的形式安装一组插件
   * @param {Object} plugins
   */
  useSync (plugins) {
    if (!Array.isArray(plugins)) {
      plugins = [plugins]
    }
    this._syncPluginQueueMapping[++this._syncPluginQueueId] = plugins
    // 启动队列插件安装
    this.next(this._syncPluginQueueId)
  }
  /**
   * 指定某个同步插件队列安装队列的下一个插件
   * @param {Number} queueId
   */
  next (queueId) {
    let plugin = this._syncPluginQueueMapping[queueId].shift()
    if (plugin) {
      plugin.install(this, this.next.bind(this, queueId))
    } else {
      delete this._syncPluginQueueMapping[queueId]
    }
  }
  /**
   * 绑定不可更改属性，防止属性被篡改
   * @param {String} property
   * @param {Any} value
   */
  bindImmutable (property, value) {
    Plugin.prototype[property] = value
    Object.defineProperty(Plugin.prototype, property, {
      writable: false
    })
  }
}
export default Plugin
