var cb = $.Callbacks("once memory unique stopOnFalse");
    //参数
    once  //fire只能触发一次->for(list数组)
    memory  //fire触发所有函数,无论是什么位置调用的add()->add
    unique  //避免函数重复触发->add
    stopOnFalse  //false后的函数不会执行->for(list数组)


    add
    remove
    has
    empty
    disable  //阻止后续的fire的触发
    disabled
    lock
    locked
    fireWith
    fire  //->fireWidth->fire:function (data) {};
    fired