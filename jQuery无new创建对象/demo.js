//jQuery无new创建对象
(function () {
  function jQuery (args) {
    return new jQuery.fn.init(args);
  };

  jQuery.prototype = jQuery.fn;
  jQuery.fn.init = function () {};
  jQuery.fn.init.prototype = jQuery.fn;

  //执行jQuery方法就会创建一个对象

})();