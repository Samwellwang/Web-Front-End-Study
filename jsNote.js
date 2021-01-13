
//滚动触发函数
if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}
   window.onmousewheel = document.onmousewheel = function(){};

//顶部距离：vue或者CSS3恒为0的兼容方案
let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset

DOM元素.offsetTop-document.body.scrollTop;