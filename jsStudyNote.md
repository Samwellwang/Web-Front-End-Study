### 深拷贝
#### slice是深拷贝么？
#### 如何实现深拷贝
* JSON.stringify() 和 JSON.parse
    function deepCopy(obj){
        var temp = JSON.stringify(obj);
        let result = JSON.parse(temp);
        return result;
    }
* 递归实现
    function deepCopy(obj){
        let objClone = Array.isArray(obj)?[]:{};
        if(obj&&typeof obj ==="object"){
            for(var i in obj ){
                if(obj.hasOwnProperty(i)){
                    if(obj[i]&&typeof obj[i]==="object"){
                        objClone[i]=deepCopy(obj[i])
                    }else{
                        objClone[i]=obj[i];
                    }
                }
            }   
        }
        return objClone;
    }
#### JSON.stringify()的几种妙用
1.判断数组是否包含某对象，或者判断对象是否相等。//并不行，不能保证顺序
2.让localStorage/sessionStorage可以存储对象。
3.实现对象深拷贝
#### arr.forEach()
arr.forEach(function(self,index,arr){},this);
数组去重：
arr.forEach(function(item,index){
    arr.indexOf(item)===index?arr2.push(item):null
})
1.forEach删除自身元素index不会被重置，因为在forEach中隐含着 index++；
2.forEach的break不好使
#### arr.slice(start,howMany)和arr.splice(start,end)
slice不会改变原数组元素
splice会改变原数组
#### arr.filter()
#### ES6的扩展运算符【...】
对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
可以将数组转换为参数序列
#### this 指向问题
this指向与申明无关，永远指向距离自己最近的最终调用者。
#### Array的push unshift pop shift四个方法
#### 正则表达式的lastindex带来的影响。
用全局匹配 /g 加test会触发lastindex属性
#### margin 坍塌和合并

#### CSS img标签下用content替换scr，div用background-image换背景

#### debounce和throttle函数 防抖和节流

#### 1 一个MVVM框架和jQuery操作DOM节点有什么区别？

JQ操作DOM节点是要用$符号对dom节点进行属性改变，事件注册，事件触发，例如，

Hello, BatMan!

var name = 'Homer'; $('#name').text(name);
而，MVVM框架来实现同样的功能，我们首先并不关心DOM的结构，而是关心数据如何存储。最简单的数据存储方式是使用JavaScript对象：
var person = {
name: ‘BatMan’
}
我们把变量person看作Model，把HTML某些DOM节点看作View，并假定它们之间被关联起来了。
要改变name的值，只需通过对象访问属性即可
person.name = ‘Homer’;
这让我们的关注点从如何操作DOM变成了如何更新JavaScript对象的状态，而操作JavaScript对象比DOM简单多了！
这就是MVVM的设计思想：关注Model的变化，让MVVM框架去自动更新DOM的状态（例如，VUE会生成虚拟DOM，虚拟DOM可以看成对象，里面有url和文本，孩子节点，而每当我们数据发生变化，生成的新的虚拟DOM会对比旧虚拟DOM，通过最小的代价（事件绑定，代理，DOM操作）来更新节点），从而把开发者从操作DOM的繁琐步骤中解脱出来！
 
#### [v-cloak]{
    {
    display: none;
} //vue未来得及渲染的时会显示vue代码。。加上防止抖动

#### 关注分离（separation of concern）

#### DOP 和 OOP