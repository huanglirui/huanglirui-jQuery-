//架构思路

(function () {

  [21, 94] : 定义了一些变量和函数 jQuery = function () {};

  [96, 283] : 给jQuery原型对象添加了一些方法和属性

  [285， 347] : 实现了extend方法，jQuery的继承方法

  [349, 817] : 使用jQuery,extend()方法给jQuery对象扩展了一下工具方法

  [877, 2856] : Sizzle复杂选择器的实现

  [2880, 3042] : Callbacks，回调对象。对函数的统一管理

  [3043, 3183] : Deferred，延迟对象，对异步的统一管理

  [3184, 3295] : support，功能检测，检测浏览器的兼容

  [3308, 3652] : data()，数据缓存

  [3653, 3797] : queue()，队列方法，对执行顺序的管理

  [3803, 4299] : attr()、prop()、val()、addClass()等对DOM元素属性的操作

  [4300, 5128] : on()、trigger()事件操作的相关方法

  [5140, 6057] : DOM操作:添加、删除、获取、包装、DOM筛选

  [6058, 6620] : css()，样式的操作

  [6621, 7854] : ajax()和提交数据，load()、getJSON()

  [7855, 8584] : animate()运动方法

  [8585, 8792] : offset()位置和尺寸的方法

  [8804, 8821] : jQuery对模块化的支持

  [8826] : 导出jQuery对象 : window.jQuery = window.$ = jQuery;

})()