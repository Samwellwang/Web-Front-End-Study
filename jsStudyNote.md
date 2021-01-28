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