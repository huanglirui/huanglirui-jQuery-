//架构思路

(function () {

  [21, 94] : 定义了一些变量和函数 jQuery = function () {};
    var jQuery = function (selector, context) {
      return new jQuery.fn.init(selector, context, rootjQuery);
    },
    completed = function () {
      document.removeEventListener( "DOMContentLoaded", completed, false );
      window.removeEventListener( "load", completed, false );
      jQuery.ready();
    }
    ;

  [96, 283] : 给jQuery原型对象添加了一些方法和属性
    jQuery.fn = jQuery.prototype = {
      jquery: core_version,
      constructor: jQuery,
      init: function (selector, context, rootjQuery) {},
      selector: '',
      length: 0,
      toArrar: function () {},
      get: function (num) {},
      pushStacks: function (elems) {},
      each: function (callback, args) {},
      ready: function (fn) {},
      slice: function () {},
      first: function () {},
      last: function () {},
      eq: function (i) {},
      map: function (callback) {},
      end: function () {},
      push: core_push,
      sort: [].sort,
      splice: [].splice
    };
    jQuery.fn.init.prototype = jQuery.fn;
  [285， 347] : 实现了extend方法，jQuery的继承方法
    jQuery.extend = jQuery.fn.extend = function () {

    };

  [349, 817] : 使用jQuery,extend()方法给jQuery对象扩展了一下工具方法
    jQuery.extend({
      expando: 'jQuery' + (core_version + Math.random()).replace(/\D/g, ''),
      noConflict: function (deep) {},
      isReady: false,
      readyWait: 1,
      holdReady: function (hold) {},
      ready: function (wait) {},
      isFunction: function (obj) {},
      isArray: Array.isArray,
      isWindow: function (obj) {},
      isNumeric: function (obj) {},
      type: function (obj) {},
      isPlainObject: function (obj) {},
      isEmptyObject: function (obj) {},
      error: function (msg) {},
      parseHTML: function (data, context, keepScripts) {},
      parseJSON: JSON.parse,
      parseXML: function (data) {},
      noop: function () {},
      globalEval: function (code) {},
      camelCase: function (string) {},
      nodeName: function (elem, name) {},
      each: function (obj, callback, args) {},
      trim: function (text) {},
      makeArray: function (arr, results) {},
      inArray: function (elem, arr, i) {},
      merge: function (first, second) {},
      grep: function (elems, callback, inv) {},
      mao: function (elems, callback, arg) {},
      guid: 1,
      proxt: function (fn, context) {},
      access: function (elems, fn, key, value, chainable, emptyGet, raw) {},
      now: Date.now,
      swap: function (elem, options, callback, args) {}
    });
  
    jQuery.ready.promise = function (obj) {};
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
      class2type[ '[object' + name + ']' ] = name.toLowerCase()
    });
    function isArraylike (obj) {};
    rootjQuery = jQuery(document);

  [877, 2856] : Sizzle复杂选择器的实现

  [2880, 3042] : Callbacks，回调对象。对函数的统一管理
    var optionCache = {};
    function createOptions (options) {};
    jQuery.Callbacks = function (options) {
      var list = [],
          fire = function (data) {},
          self = {
            add: function () {},
            remove: function () {},
            has: function (fn) {},
            empty: function () {},
            disable: function () {},
            disabled: function () {},
            lock: function () {},
            locked: function () {},
            fireWith: function (context, arhs) {},
            fire: function () {},
            fired: function () {},
          }
          ;
      return self;    
    };

  [3043, 3183] : Deferred，延迟对象，对异步的统一管理
    jQuery.extend({
      Deferred: function (func) {
        var tuples = [
              [ 'resolve', 'done', jQuery.Callbacks('once memory'), 'resolved' ],
              [ 'reject', 'fail', jQuery.Callbacks('once memory'), 'rejected' ],
              [ 'notify', 'progress', jQuery.Callbacks('memory') ]
            ],
            state = 'pending',
            promise = {
              state: function () {},
              always: function () {
                deferred.done(arguments).fail(arguments);
                return this;
              },
              then: function (fnDone, fnFail) {
                var fns = arguments;
                return jQuery.Deferred().promise();
              },
              promise: function (obj) {
                return obj != null ? jQuery.extend( obj, promise ) : promise;
              },
            },
            deferred = {}
            ;
        promise.pipe = promise.then;
        jQuery.each(tuples, function (i, tuple) {
          var list = tuple[2];  //jQuery.Callbacks("once memory")
          deferred[ tuple[1] ] = list.add;  //done
          deferred[ tuple[0] ] = function () {};  //resolve
          deferred[ tuple[0] + 'With' ] = list.fireWith; //deferred.resolveWith = list.fireWith;
        });
        promise.promise(deferred);
        if (func) {
          func.call(deferred, deferred);
        }
        return deferred;
      },
      when: function () {
        var i = 0,
            resolveValues = core_slice.call( arguments ),
            length = resolveValues.length,
            //计数器，当等于0的时候说明所有的延迟对象都走的成功
            remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,
            //如果有多个延迟对象，则重新创建一个。
            deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
            updateFunc = function (i, contexts, values) {}
            ;
        return deferred.promise();
      }
    });

  [3184, 3295] : support，功能检测，检测浏览器的兼容
    jQuery.support = (function (support) {
      return support;
    })( {} );

  [3308, 3652] : data()，数据缓存
    var data_user, data_priv;
    function Data () { 
      this.cache = {
        0: {}
      };
      this.expando = jQuery.expando + Math.random();
    };
    Data.uid =  1;
    Data.accepts = function (owner) {};  //$('div')
    Data.prototype = {
      key: function (owner) {},
      set: function (owner, data, value) {},
      get: function (owner, key) {},
      access: function (owner, key, value) {},
      remove: function (owner, key) {},
      hasData: function (owner) {},
      discard: function (owner) {}
    };
    data_user = new Data();
    data_priv = new Data();
    jQuery.extend({
      acceptData: Data.accepts,
      hasData: function (elem) {},
      data: function (elem, name, data) {},
      removeData: function (ele, name) {},
      _data: function (elem, name, data) {},
      _removeData: function (elem, name) {}
    });
    jQuery.fn.extend({
      data: function (key, value) {},
      removeData: function (key) {}
    });
    function dataAttr (elem, key, data) {};

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