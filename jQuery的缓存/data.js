//缓存存在的意义 : 内存泄露
//data()、attr()、prop()方法的区别

jQuery.extend({
  acceptData  //返回节点的nodeType
  hasData
  data
  removeData
  _removeData  //私有的,内部使用的
  _data      //私有的,内部使用的
});

jQuery.fn.extend({
  data
  removeData  
});

Data.prototype={
  key  //让DOM元素的属性值与cache对象一一映射
  set
  get
  access
  remove
  hasData
  discard   //与remove差不多
};