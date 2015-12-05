//对执行顺序的管理
jQuery.extend({
  queue    //push()
  dequeue  //shift()
  _queueHooks   //内部使用,清理一下缓存
}); 

jQuery.extend({
  queue
  dequeue
  delay  //延迟队列的执行,事件可以自己定
  clearQueue
  promise   //定义队列结束之后调用的函数
});