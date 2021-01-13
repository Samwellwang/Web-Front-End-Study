
var b = [{"key":"price_band","stamp":0,"title":"价格带","visable":true,"readOnly":true,"data_type":"text"},{"key":"stockorg#小区","stamp":0,"title":"小区","visable":true,"readOnly":true,"data_type":"text"},{"key":"temperature_zone","stamp":0,"title":"温区","visable":true,"readOnly":true,"data_type":"text"},{"key":"restraint","stamp":0,"title":"约束方式","visible":true,"readOnly":true,"data_type":"text"},{"key":"type","stamp":0,"title":"约束类型","visible":true,"readOnly":true,"data_type":"text"},{"key":"standard_value","stamp":0,"title":"标准值","visible":true,"readOnly":true,"data_type":"text"},{"key":"down_limit","stamp":0,"title":"下限","visible":true,"readOnly":true,"data_type":"text"},{"key":"upper_limit","stamp":0,"title":"上限","visible":true,"readOnly":true,"data_type":"text"}];
var header=[];
for(let i in b){
    let obj ={};
    obj.id = parseInt(i)+2;
    obj.name = b[i][title];
    if(i==1&&b[i].key=='brand'){
      obj.label = 'brandCode';
    }else{
      obj.label = b[i].key;
    }
    obj.width='17%';
    obj.textAlign='left';
    header.push(obj);
  }
  var obj2={id:1,name:'序号',label:'index',width:'17%',textAlign:'left'};
  header.unshift(obj2);
  var obj1={ id: header.length+1, name: '操作', label: 'button', width: '40%', textAlign: 'center' };
  header.push(obj1);
  console.log('header',header);