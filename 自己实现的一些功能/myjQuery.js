(function () {
function myjQuery (args) {
  this.elements = [];
  //传入的是字符串
  if (typeof args === "string") {
    //模拟css查找 : $('div p')
    if (args.indexOf(" ") != -1) {
      var elem = args.split(" ");  //['div', 'p']
      var childNodes = [];
      var node = [];
      for (var i=0, len1 = elem.length; i < len1; i++) {
        if (node.length == 0) {
          node.push(document);
        };
        switch (elem[i].charAt(0)) {
        case "#":
          childNodes = [];
          childNodes.push(this.getId( elem[i].substring(1)) );
          node = childNodes;
          break;
        case ".":
          childNodes = [];
          for (var j=0, len2 = node.length; j < len2; j++) {
            var temps = this.getClass(elem[i].substring(1), node[j]);
            for (var k=0, len3=temps.length; k<len3; k++) {
              childNodes.push(temps[k]);
            };
          };
          node = childNodes;
          break;
        default:
          childNodes = [];
          for (var j=0, len2 = node.length; j<len2; j++) {
            var temps = this.getTagName(elem[i], node[j]);
            for (var k=0, len3 = temps.length; k<len3; k++) {
              childNodes.push(temps[k]);
            };
          };
          node = childNodes;
        };
      };
      this.elements = childNodes;
    }else {
      //模拟$('div')  $('.div')  $('#div')
      switch (args.charAt(0)) {
      case "#":
        this.elements.push( this.getId(args.substring(1)) );
        break;
      case ".":
        var temps = this.getClass( args.substring(1) );
        this.elements = temps;
        break;
      default:
        var temps = this.getTagName(args);
        this.elements = temps;
      };
    };
  }else if (typeof args === "object"){
    //传入的是this
    this.elements[0] = args;
  };

};


myjQuery.prototype={
  constructor:myjQuery,
  //ID获取
  getId: function  (id) {
    return document.getElementById(id);
  },
  //类名获取
  getTagName: function  (tagName, parentNode) {
    var temps = [];
    var node = null;
    if (parentNode) {
      node = parentNode;
    }else {
      node = document;
    };
    var tags = node.getElementsByTagName(tagName);
    for (var i=0, len = tags.length; i < len; i++) {
      temps.push(tags[i]);
    };
    return temps;
  },
  //节点获取
  getClass: function  (className, parentNode) {
    var temps = [];
    var node = null;
    if (parentNode) {
      node = parentNode;
    }else {
      node = document;
    }
    var alls = node.getElementsByTagName("*");
    for (var i=0,len=alls.length; i<len; i++) {
      if ( (new RegExp("(\\s|^)"+className+"(\\s|$)")).test(alls[i].className) ) {
        temps.push(alls[i]);
      };
    };
    return temps;
  },
  //设置css样式
  css: function  (attr, val) {
    for (var i=0,len=this.elements.length; i<len; i++) {
      if (arguments.length == 1) {
        
          return this.elements[i].currentStyle?this.elements[i].currentStyle[attr]:getComputedStyle(this.elements[i], null)[attr];
    
      }else {
        this.elements[i].style[attr] = val;
      }
    };
    return this;
  },
  //改变节点内容
  html: function  (str) {
    for (var i=0,len=this.elements.length; i<len; i++) {
      if (arguments.length == 1) {
        this.elements[i].innerHTML = str;
      }else {
        return this.elements[0].innerHTML;
      };
    };
    return this;
  },
  //获取指定位置的元素，但返回的是myjQuery对象，支持链式操作
  eq: function  (num) {
    var elem = this.elements[num];
    this.elements = [];
    this.elements.push(elem);
    return this;
  },
  //获取指定位置的元素，返回元素对象，支持js操作
  get: function  (num) {
    return this.elements[num];
  },
  //添加类名
  addClass: function  (className) {
    for (var i=0,len=this.elements.length; i<len; i++) {
      if (!this.elements[i].className.match(new RegExp("(\\s|^)"+className+"(\\s|$)"))) {
        this.elements[i].className += " "+className;
      }
    };
    return this;
  },
  //移除类名
  removeClass: function  (className) {
    for (var i=0,len=this.elements.length; i<len; i++) {
      if (!className) {
        this.elements[i].className = "";
      }else {
        if (this.elements[i].className.match(new RegExp("(\\s|^)"+className+"(\\s|$)"))) {
          this.elements[i].className = this.elements[i].className.replace(new RegExp("(\\s|^)"+className+"(\\s|$)"), "")
        };
      }
    };
    return this;
  },
  //返回长度
  length: function  () {
    return this.elements.length;
  },
  //获取元素的索引号
  index: function  () {
    var childs = this.elements[0].parentNode.children;
    for (var i=0,len=childs.length; i<len; i++) {
      if (this.elements[0] == childs[i]) {
        return i;
      };
    };
  },
  //获取元素属性
  attr: function  (attr, val) {
    for (var i=0,len=this.elements.length; i<len; i++) {
      if (arguments.length == 1) {
        return this.elements[i].getAttribute(attr);
      }else if(arguments.length == 2){
        this.elements[i].setAttribute(attr, val)
      };
    };
    return this;
  },
  //查找下一个节点
  next: function  () {
    for (var i=0,len=this.elements.length; i<len; i++) {
      this.elements[i] = this.elements[i].nextSibling;
      if (this.elements[i] == null) {
        throw new Error("下一个节点为空");
      }else if(this.elements[i].nodeType == 3){
        this.next();
      };
    };
    return this;
  },
  //查找下上一个节点
  prev: function  () {
    for (var i=0,len=this.elements.length; i<len; i++) {
      this.elements[i] = this.elements[i].previousSibling;
      if (this.elements[i] == null) {
        throw new Error("上一个节点为空");
      }else if(this.elements[i].nodeType == 3){
        this.prev();
      };
    };
    return this;
  },
  //操作样式表
  addRule: function  (num, selector, cssText, position) {
    var sheet = document.styleSheets[num];
    sheet.insertRule?sheet.insertRule(selector+"{"+cssText+"}", position):sheet.addRule(selector, cssText, position);
    return this;
  },
  //按照行数删除
  removeRule: function  (num, position) {
    var sheet=document.styleSheets[num];
    sheet.deleteRule?sheet.deleteRule(position):sheet.removeRule(position);
    return this;
  },
  //绑定事件
  bind: function  (type, fn) {
    for (var i=0,len=this.elements.length; i<len; i++) {
      this.elements[i].addEventListener(type, fn, false);
    };
  },
  //解除事件
  unbind: function  (type, fn) {
    for (var i=0,len=this.elements.length; i<len; i++) {
      this.elements[i].removeEventListener(type, fn, false);
    };
  },
  //层级查找
  find: function  (str) {
    var childNodes = [];
    for (var i=0,len=this.elements.length; i<len; i++) {
      if (typeof str === "string") {
        switch (str.charAt(0)) {
        case "#":
          childNodes.push( this.getId(str.substring(1)) );
          break;
        case ".":
          var temps=this.getClass(str.substring(1), this.elements[i]);
          for (var j=0,len2=temps.length; j<len2; j++) {
            childNodes[j] = temps[j];
          }
          break;
        default:
          var temps = this.getTagName(str, this.elements[i]);
          for (var j=0,len2=temps.length; j<len2; j++) {
            childNodes[j] = temps[j];
          };
        };
      }
    };
    this.elements = childNodes;
    return this;
  },
  //插件接口
  extend: function  (name, fn) {
    myjQuery.prototype[name] = fn;
  }
};

var $ = function (args) {
  return new myjQuery(args);
};

window.$ = $;


//缓存 : 为了把某个元素的队列加在他自己的身上
//<div 16548484546="1">   Data = { div[id]: {'fx': []} }
var Data = {
  cache: {},
  unid: 0,
  expando: +new Date(),
  setData: function  (elem, key, val) {
    var id = elem[this.expando];
    if (!id) {
      id = ++this.unid;
      elem[this.expando] = id;
    };
    if (!this.cache[id]) {
      this.cache[id] = {};
    };
    if (val) {
      this.cache[id][key] = val;
    };
    return this.cache[id][key];
  }
};
//队列 : 用于管理函数执行顺序，就是一个数组，避免回调函数那样的方法执行对一个元素的动画操作
var Queue = {
  queue:function  (elem, key, val) {
    key=key?key: "fx";
    var q = Data.setData(elem, key);
    if (!val) {
      return q || [];
    }
    if (!q) {
      q = Data.setData(elem, key, []);
    }
    if (val instanceof Array) {
      q = Data.setData(elem, key, val)
    }else {
      q.push(val);
    };
    if (q[0] != "mark" && key === "fx") {
      this.dequeue(elem, key);
    };
    return q;
  },
  stop: function (elem, key) {
    this.queue(elem, key, []);
  },
  wait: function (elem, key, num) {
    this.queue(elem,key,function  () {
    var t = setTimeout(function  () {
         clearTimeout(t)
                Queue.dequeue(elem, key)
       },num);
      });
  },
  timeout: function (elem, key) {
    this.queue(elem, key).unshift("timeout");
  },
  dequeue: function (elem, key) {
    key = key ? key : "fx";
    var queue = Data.setData(elem, key);
    var fn = queue.shift();
    if (fn === "timeout") {
      return ;
    }
    if (fn === "mark") {
      fn = queue.shift();
    };
    if (fn) {
      if (key === "fx") {
        queue.unshift("mark");
      };
      fn.call(elem);
    }
  }
 };

//动画的方法，结合动画的算法
function myAnimate (obj, json, duration, fn, callback){
  var tween = null;
  var callFn = null;
  if (arguments.length === 4) {
    if (fn.length >= 4) {
      tween = fn;
      callFn = null;
    } else {
      tween = Tween.Quad.easeIn;
      callFn = fn;
    };
  } else {
    tween = fn ? fn : Tween.Quad.easeIn;
    callFn = callback ? callback : null;
  };
  Queue.queue(obj, "fx", function  () {
    var start = []; //开始值数组
    var changes = [];//变化量数组
    var times = 0;//变化的时间
    for (var attr in json){
      if (attr === "opacity") {
        start[attr] = parseInt( getStyle(obj, attr)*100 );
        changes[attr] = json[attr] - start[attr];
      } else {
        start[attr] = parseInt( getStyle(obj, attr) );
        changes[attr] = json[attr] - start[attr];
      }
    };
    obj.timer = setInterval(function () {
      var ok = true;
      if (times < duration) {
        ok = false;
        for(var attr in json){
          if (attr === "opacity") {
            obj.style[attr] = tween(times, start[attr], changes[attr], duration) / 100;
          }else {
            obj.style[attr] = tween(times, start[attr], changes[attr], duration) + "px";
          }
        }
      }
      if (ok) {
        for(var attr in json){
          if (attr === "opacity") {
            obj.style.opacity = json[attr] / 100;
          } else {
            obj.style[attr] = json[attr] + "px";
          }
        }
        clearInterval(obj.timer);
        if (callback) {
          callFn.call(obj);
        }
        Queue.dequeue(obj, "fx");
        obj.timer = null;
      }
      times += 30;
    }, 30);
  })
};

//事件绑定和移除
//IE中的兼容性 : 
//1、执行顺序的问题，可能是逆序，也可能无序
//2、this关键字的问题，IE6、7、8指向window（不指向ele）
function addEvent (ele, type, fn) {
  if (document.addEventListener) {
    ele.addEventListener(type, fn, false);
  }else if (document.attachEvent) {
    //更改this指向
    var bindFn = function () {fn.call(ele);};
    //给函数加一个标识，在移除的时候能找到对应的函数
    bindFn.photo = fn;
    //把新函数存储起来，未来移除能找到
    if (typeof ele[type + 'bind'] != 'object') {
      ele[type + 'bind']  = [];
    }
    //避免重复添加
    for (var i=0,len=ele[type + 'bind'].length;i<len;i++) {
      if (ele[type + 'bind'][i].photo == fn) {
        return ;
      };
    };
    ele[type + 'bind'] .push(bindFn);
    ele.attachEvent('on' + type, bindFn);

  }else{
    ele['on' + type] = fn;
  };
};
function removeEvent (ele, type, fn) {
  if (document.removeEventListener) {
    ele.removeEventListener(type, fn, false);
  }else if (document.detachEvent) {

    var arrBind = ele[type + 'bind'];
    var len = arrBind.length;
    while (len--) {
      var item = arrBind[len];
      //找到对应的标识，在移除
      if (item.photo === 'fn') {
        ele.detachEvent('on' + type, item);
        arrBind.splice(len, 1);
        break;
      };
    }

  }else{
    ele['on' + type] = null;
  };
};


//ajax
function ajax (obj) {
  var xhr=(function  () {
    if (XMLHttpRequest) {
      return new XMLHttpRequest();
    }else if(ActiveXObject){
      var version = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft XMLHTTP"];
      for (var i=0,len=version.length; i<len; i++) {
        try {
          return new ActiveXObject(version[i]);
        }
        catch (e) {
          //跳过
        }
      };
    }else {
      throw new Error("您的浏览器不支持XHR对象");
    };
  })();
  obj.url = obj.url+"?mytime="+new Date();
  obj.data = (function  (data) {
    var arr=[];
    for(attr in data){
      arr.push(attr+"="+data[attr]);
    };
    return arr.join("&");
  })(obj.data);

  if (obj.method == "get"){
    obj.url += obj.url.indexOf("?") == -1?"?"+obj.data:"&"+obj.data;
  };
  xhr.open(obj.method, obj.url, obj.async);
  if (obj.async) {
    xhr.onreadystatechange=function(){
      if (xhr.readyState == 4) {
        callback();
      };
    };
  };
  if (obj.method == "post") {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(obj.data);
  }else if(obj.method == "get"){
    xhr.send(null); 
  };
  if (!obj.async) {
    callback();
  };
  function callback () {
    if (xhr.status == 200) {
      obj.success(xhr.responseText);
    }else {
      obj.fail(xhr.status, xhr.statusText);
    }
  };

};
})();