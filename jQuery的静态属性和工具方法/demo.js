//通过extend方法拷贝
jQuery.extend({
  expando : 生成唯一JQ字符串(内部)
  noConflict() : 防止冲突
  isReady : DOM是否加载完(内部)
  readyWait : 等待多少文件的计数器(内部)
  holdReady() : 推迟DOM触发
  ready() : 准备DOM触发
  isFunction() : 是否为函数
  isArray() : 是否为数组
  isWindow() : 是否为window
  isNumeric() : 是否为数字 
  type() : 判断数据类型
  isPlainObject() : 是否为对象自变量//判断是否为{}和new Object()类型,Object的原型下面有个isPrototypeOf方法,这是唯一的
  isEmptyObject() : 是否为空的对象
  error() : 抛出异常
  parseHTML() : 解析节点//有true参数时会解析script标签,解析的是字符串
  parseJSON() : 解析JSON
  parseXML() : 解析XML
  noop() : 空函数
  globalEval() : 全局解析JS
  camelCase() : 转驼峰(内部)
  nodeName() : 是否为指定节点名(内部)
  each() : 遍历集合
  trim() : 去前后空格
  makeArray() : 类数组转真数组
  inArray() : 数组版indexOf
  merge() : 合并数组
  grep() : 过滤新数组  //grep( arr, function (n, i) {}, true)
  map() : 映射新数组  //map( arr, function (n, i) {} )
  guid : 唯一标识符(内部)
  proxy() : 改this指向
  access() : 多功能值操作(内部)  //get()和set()方法
  now() : 当前时间
  swap() : CSS交换(内部)  //获取隐藏节点的属性(偷梁换柱的感觉)
  
});