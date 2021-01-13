function(a, b) {
  var result = [];
  var header = [];
  for (let i in b) {
    let obj = {};
    obj.id = parseInt(i) + 2;
    obj.name = b[i].title;
    if (i == 1 && b[i].key == 'brand') {
      obj.label = 'brandCode';
    } else {
      obj.label = b[i].key;
    }
    obj.width = '17%';
    obj.textAlign = 'left';
    header.push(obj);
  }
  var obj2 = { id: 1, name: '序号', label: 'index', width: '17%', textAlign: 'left' };
  header.unshift(obj2);
  var obj1 = { id: header.length + 1, name: '操作', label: 'button', width: '40%', textAlign: 'center' };
  header.push(obj1);
  result.push(header);
  console.log('header', header);

  var temp = [];
  for (let i in a) {
    var obj = {};
    obj._id = a[i]._id;
    for (let j in header) {

      if (header[j].label == 'index') {
        obj[header[j].label] = i;
      } else if (header[j].label == 'restraint' || header[j].label == 'type' || header[j].label == 'standard_value' || header[j].label == 'down_limit' || header[j].label == 'upper_limit') {
        let labeltemp = '';
        labeltemp = header[j].label;
        obj[labeltemp] = a[i].config_info[labeltemp];
      } else if (header[j].label == 'button') {
        obj[header[j].label] = [{ name: '编辑' }];
      } else {
        //不确定的列的数据：
        var unCertain = a[i].config_info.dim_infos.length;
        for (let k = 0; k < unCertain; k++) {
          if (a[i].config_info.dim_infos[k].name == header[j].label) {
            obj[header[j].label] = a[i].config_info.dim_infos[k].code;
          }

        }

      }
    }
    for (let j in header) {
      //不确定的列的数据：
      var unCertain = a[i].config_info.dim_infos.length;
      for (let k = 0; k < unCertain; k++) {

        obj[header[j].label] = a[i].config_info.dim_infos[k].code;
      }
    }

    /* obj[header[0].label]=i;
    obj[header[1].label]=a[i].config_info.dim_infos[0].name;
    obj.brandCode=a[i].config_info.dim_infos[0].code;
    obj[header[3].label]=a[i].config_info.dim_infos[0].name;
    obj[header[4].label]=a[i].config_info.restraint;//约束方式
    obj[header[5].label]=a[i].config_info.type;//约束类型
    obj[header[6].label]=a[i].config_info.standard_value;
    obj[header[7].label]=a[i].config_info.down_limit;
    obj[header[8].label]=a[i].config_info.upper_limit;
    obj[header[9].label] = [{name: '编辑'}];*/
    temp.push(obj);
  }
  result.push(temp);
  return result;
} (#a#,#b#)






"dim_header_config":



{
  "_id": "5fea91e698c1e41cefbbb714",
    "id": 92,
      "type_id": 97,
        "config_info": "{\"type\":\"宽度\",\"restraint\":\"占比\",\"standard_value\":\"1\",\"down_limit\":\"1\",\"upper_limit\":\"1\",\"dim_infos\":[{\"name\":\"价格带结构约束\",\"code\":\"价格带结构约束\"},{\"name\":\"品类结构约束\",\"code\":\"品类结构约束\"},{\"name\":\"品类结构约束\",\"code\":\"品类结构约束\"}]}",
          "is_deleted": false,
            "hex_create_time": 1609208294886,
              "hex_update_time": 1609208294886
}





[{ id: 1, name: '序号', label: 'index', width: '17%', textAlign: 'left' },
{ id: 2, name: '约束集名称', label: 'name', width: '11%', textAlign: 'left' },
{ id: 3, name: '备注', label: 'remark', width: '20%', textAlign: 'center' },
{ id: 5, name: '是否启用', label: 'isApply', width: '10%', textAlign: 'left', type: 'switch' },
{ id: 6, name: '操作', label: 'button', width: '40%', textAlign: 'center' }
]





[{
  "children": [],
  "exclude_list": [],
  "checked": true,
  disableCheckbox: false,
  "title": "价格带",
  "value": "price_band"

}, {
  "children": [{
    "children": [],
    "exclude_list": ["product_class_longcode#中类", "product_class_longcode#小类"],
    "title": "大类",
    checked: false,
    disableCheckbox: false,
    "value": "product_class_longcode#大类"
  }, {
    "children": [],
    disableCheckbox: false,
    "exclude_list": ["product_class_longcode#大类", "product_class_longcode#小类"],
    "title": "中类",
    checked: false,
    "value": "product_class_longcode#中类"
  }, {
    "children": [],
    "exclude_list": ["product_class_longcode#大类", "product_class_longcode#中类"],
    "title": "小类",
    checked: false,
    disableCheckbox: false,
    "value": "product_class_longcode#小类"
  }],
  "exclude_list": [],
  "title": "产品级别",
  "value": "product_class_longcode"
}, {
  "children": [],
  "exclude_list": ["store_type", "store_level", "biz_district", "temperature_zone", "store_area_level", "store_category", "manager", "province", "city", "manager_area", "stockorg#小区", "store"],
  "title": "品牌（所有门店）",
  disableCheckbox: false,
  checked: false,
  "value": "brand"
}, {
  "children": [],
  "exclude_list": ["brand", "stockorg#小区", "store"],
  "title": "管理区域",
  disableCheckbox: false,
  checked: false,
  "value": "manager_area"
}, {
  "children": [{
    "children": [],
    "exclude_list": ["brand", "store", "manager_area"],
    "title": "小区",
    disableCheckbox: false,
    checked: false,
    "value": "stockorg#小区"
  }, {
    "children": [],
    "exclude_list": ["brand", "stockorg#小区", "store_type", "store_level", "biz_district", "temperature_zone", "store_area_level", "store_category", "manager", "province", "city", "manager_area"],
    "title": "门店",
    disableCheckbox: false,
    checked: false,
    "value": "store"
  }],
  "exclude_list": [],
  "title": "组织层级",
  "value": "stockorg"
}, {
    "children": [{
      "children": [],
      "exclude_list": ["store", "brand"],
      "title": "门店类型",
      disableCheckbox: false,
      checked: false,
      "value": "store_type"
    }, {
      "children": [],
      "exclude_list": ["store", "brand"],
      "title": "门店等级",
      disableCheckbox: false,
      checked: false,
      "value": "store_level"
    }, {
      "children": [],
      "exclude_list": ["store", "brand"],
      "title": "商圈",
      disableCheckbox: false,
      checked: false,
      "value": "biz_district"
    }, {
      "children": [],
      "exclude_list": ["store", "brand"],
      "title": "温区",
      disableCheckbox: false,
      checked: false,
      "value": "temperature_zone"
    }, {
      "children": [],
      "exclude_list": ["store", "brand"],
      "title": "门店面积等级",
      disableCheckbox: false,
      checked: false,
      "value": "store_area_level"
    }, {
      "children": [],
      "exclude_list": ["store", "brand"],
      "title": "门店类别",
      disableCheckbox: false,
      checked: false,
      "value": "store_category"
    }, {
      "children": [],
      "exclude_list": ["store", "brand"],
      "title": "管理人",
      disableCheckbox: false,
      checked: false,
      "value": "manager"
    }, {
      "children": [],
      "exclude_list": ["store", "brand"],
      "title": "省份",
      disableCheckbox: false,
      checked: false,
      "value": "province"
    }, {
      "children": [],
      "exclude_list": ["store", "brand"],
      "title": "城市",
      disableCheckbox: false,
      checked: false,
      "value": "city"
    }],
    "exclude_list": [],
    "title": "门店属性",
    disableCheckbox: false,
    checked: false,
    "value": "store_attribute"
  }]






function convert(object, map) {
  for (let key in object) {
    if (map[key]) {
      object[map[key]] = object[key];
      delete object[key];
    }
  }
  return object;
}

var map = {
  '序号': 'index',
  '价格带': 'price_band',
  '约束方式': 'restraint',
  '约束类型': 'type',
  '标准值': 'standard_value',
  '下限': 'down_limit',
  '上限': 'upper_limit',
  '大类': 'product_class_longcode#大类',
  '中类': 'product_class_longcode#中类',
  '小类': 'product_class_longcode#小类',
  '产品级别': 'product_class_longcode',
  '品牌（所有门店）': 'brand',
  '管理区域': 'manager_area',
  '小区': 'stockorg#小区',
  '门店': 'store',
  '组织层级': 'stockorg',
  '门店类型': 'store_type',
  '门店等级': 'store_level',
  '商圈': 'biz_district',
  '温区': 'temperature_zone',
  '门店面积等级': 'temperature_zone',
  '门店类别': 'store_category',
  '管理人': 'manager',
  '省份': 'province',
  '城市': 'city',
  '门店属性': 'store_attribute'
}

console.log('更该上传控件后返回格式', res_1_0);
var result = res_1_0.map(function (item) {
  return convert(item, map)
});

console.log('转化完字段——*result*', result);



var result = [{ PRODUCT_ID: '1', PRODUCT_NAME: '名称', PRODUCT_TYPE_CODE: '类型1', PRODUCT_STATE: '状态1', NET_TYPE_CODE: '网别1', GROUP_BRAND_CODE: '品牌1', CREATE_DATE: '2021-01-04' }, { PRODUCT_ID: '2', PRODUCT_NAME: '名称2', PRODUCT_TYPE_CODE: '类型2', PRODUCT_STATE: '状态2', NET_TYPE_CODE: '网别2', GROUP_BRAND_CODE: '品牌2', CREATE_DATE: '2021-01-05' }];




function(){
  function changeColor(id){
   var domArr=document.getElementsByClassName('item_select');
for(var i in domArr){
  if(domArr[i].id==id){
    let domObj = domArr[i];
    if(domObj.childElementCount==1){
      let childArr=domObj.children[0].children;
        childArr[0].children[0].style.backgroundColor='#E50017';
      childArr[0].children[1].style.backgroundColor='#E50017';
        childArr[1].style.color='#E50017';
    }
    if(domObj.childElementCount==2){
      let childArr=domObj.children;
        childArr[0].style.backgroundColor='#E50017';
        childArr[1].style.color='#E50017';
    }
  }else{
          let domObj = domArr[i];
    if(domObj.childElementCount==1){
      let childArr=domObj.children[0].children;
        childArr[0].children[0].style.backgroundColor='#FFADAD';
      childArr[0].children[1].style.backgroundColor='#FFADAD';
        childArr[1].style.color='#FFADAD';
    }
    if(domObj.childElementCount==2){
      let childArr=domObj.children;
        childArr[0].style.backgroundColor='#FFADAD';
        childArr[1].style.color='#FFADAD';
    }
  }
}
  }
};
function oper() {
var one=  document.getElementById("Clqibbxzp07qcyio00").offsetTop;
  var two = 
  document.getElementById("Csthk8l33cx7ps1c00").offsetTop;
  var three =
  document.getElementById("Cbhxpfs5kr1z5eqg00").offsetTop;
  var four = 
  document.getElementById("Cilci49vqrfkuw3c0").offsetTop;
  var currHeight =document.body.scrollTop;
  console.log('距离顶部的高度为',currHeight);
  if(currHeight>0&&currHeight<two){
        let domObj = document.getElementById('Cuwtgestxvr5crjc00');
changeColor('Cuwtgestxvr5crjc00');
  }else if(currHeight>two&&currHeight<three){
                 let domObj = document.getElementById('Cehkmhnzhex6378g00');
changeColor('Cehkmhnzhex6378g00');
          }else if(currHeight>three&&currHeight<four){
                             let domObj = document.getElementById('Cokzz87i7jk0xvhw0');
            changeColor('Cokzz87i7jk0xvhw0');
                   }else if(currHeight>four){
                             let domObj = document.getElementById('Cypjyerlls3le99s00');   
                    changeColor('Cypjyerlls3le99s00');

}
window.onmousewheel  = oper;

}










console.log('dadadadad');
function changeColor(id) {
  var domArr = document.getElementsByClassName('item_select');
  for (var i in domArr) {
    if (domArr[i].id == id) {
      let domObj = domArr[i];
      if (domObj.childElementCount == 1) {
        let childArr = domObj.children[0].children;
        childArr[0].children[0].style.backgroundColor = '#E50017';
        childArr[0].children[1].style.backgroundColor = '#E50017';
        childArr[1].style.color = '#E50017';
      }
      if (domObj.childElementCount == 2) {
        let childArr = domObj.children;
        childArr[0].style.backgroundColor = '#E50017';
        childArr[1].style.color = '#E50017';
      }
    } else {
      let domObj = domArr[i];
      if (domObj.childElementCount == 1) {
        let childArr = domObj.children[0].children;
        childArr[0].children[0].style.backgroundColor = '#FFADAD';
        childArr[0].children[1].style.backgroundColor = '#FFADAD';
        childArr[1].style.color = '#FFADAD';
      }
      if (domObj.childElementCount == 2) {
        let childArr = domObj.children;
        childArr[0].style.backgroundColor = '#FFADAD';
        childArr[1].style.color = '#FFADAD';
      }
    }
  }

};

function oper() {
  var one = document.getElementById("Clqibbxzp07qcyio00").offsetTop;
  var two =
    document.getElementById("Csthk8l33cx7ps1c00").offsetTop;
  var three =
    document.getElementById("Cbhxpfs5kr1z5eqg00").offsetTop;
  var four =
    document.getElementById("Cilci49vqrfkuw3c0").offsetTop;
  var currHeight = document.body.scrollTop;
  console.log('距离顶部的高度为', currHeight);
  if (currHeight > 0 && currHeight < two) {
    let domObj = document.getElementById('Cuwtgestxvr5crjc00');
    changeColor('Cuwtgestxvr5crjc00');
  } else if (currHeight > two && currHeight < three) {
    let domObj = document.getElementById('Cehkmhnzhex6378g00');
    changeColor('Cehkmhnzhex6378g00');
  } else if (currHeight > three && currHeight < four) {
    let domObj = document.getElementById('Cokzz87i7jk0xvhw0');
    changeColor('Cokzz87i7jk0xvhw0');
  } else if (currHeight > four) {
    let domObj = document.getElementById('Cypjyerlls3le99s00');
    changeColor('Cypjyerlls3le99s00');

  }
}
window.onmousewheel = oper();

{ "msg": "成功", "code": "0000", "data": { "rows": [{ "paraCode": "para013", "paraName": "网别", "paraKey": "1L", "paraValue": "郊区业务" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "2L", "paraValue": "VSAT证券" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "30", "paraValue": "固话业务" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "33", "paraValue": "WCDMA" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "3L", "paraValue": "生成资源建设单" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "40", "paraValue": "互联网接入业务" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "42", "paraValue": "合同月租" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "46", "paraValue": "96556虚拟帐户" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "4L", "paraValue": "大数据" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "50", "paraValue": "移网业务" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "51", "paraValue": "虚拟卡移网" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "52", "paraValue": "虚拟卡固网" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "53", "paraValue": "虚拟卡虚拟" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "5L", "paraValue": "租用业务" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "60", "paraValue": "广电宽带" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "61", "paraValue": "集团短号" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "62", "paraValue": "集客专线产品" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "64", "paraValue": "宝视通" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "65", "paraValue": "集团短彩信" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "66", "paraValue": "IDC业务" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "67", "paraValue": "其他业务" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "6L", "paraValue": "图像" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "70", "paraValue": "广电电视" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "71", "paraValue": "17969业务" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "72", "paraValue": "上海外包呼叫中心" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "7L", "paraValue": "总机服务" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "90", "paraValue": "IPTV/NETV主产品网别" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "95", "paraValue": "智慧到家" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "96", "paraValue": "96556" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "CP", "paraValue": "融合业务" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "IC", "paraValue": "互联网通信" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "L1", "paraValue": "电话会议" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "L2", "paraValue": "WIFI上网认证" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "L3", "paraValue": "电话导航" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "L4", "paraValue": "集团业务--北京二级研发使用" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "L5", "paraValue": "云总机" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "L6", "paraValue": "互联网增值业务" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "L7", "paraValue": "遗留业务B类" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "L8", "paraValue": "WCDMA--北京二级研发使用" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "L9", "paraValue": "遗留业务A类" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "LB", "paraValue": "LB" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "QP", "paraValue": "切片商城" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "S1", "paraValue": "互联网专线" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "S2", "paraValue": "校园宽带" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "S3", "paraValue": "燕化产品" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "S4", "paraValue": "付费宽带" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "S5", "paraValue": "乐云宽带" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "S6", "paraValue": "虚拟用户--北京二级研发使用" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "S7", "paraValue": "基础专线" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "S8", "paraValue": "线路出租" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "S9", "paraValue": "其他业务--北京二级研发使用" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "WV", "paraValue": "集团业务" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "XN", "paraValue": "虚拟用户" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "Y1", "paraValue": "二级综合业务" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "Y2", "paraValue": "广东无线固话" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "Y3", "paraValue": "广东无线公话" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "Y4", "paraValue": "上海特殊无欠费业务" }, { "paraCode": "para013", "paraName": "网别", "paraKey": "Y5", "paraValue": "上海特殊有欠费业务" }], "totalCount": 58 } }


//属性列表赋值

function(a){
  return [
      {
        "attrCode": "123",
        "attrValue": "属性值",
        "commodityClassId": "type1",
        "selected": ["1","2"],
        'is_selected':'0',
        "appName": [
          {
            "text": "触点1",
            "value": "1",
            "checked":false
          },
          {
            "text": "触点2",
            "value": "2",
            "checked":false
          }
        ],
         "appName2": [
          {
            "text": "子1",
            "value": "3",
            "checked":false
          },
          {
            "text": "子2",
            "value": "2",
            "checked":false
          }
        ]
      },
    {
        "attrCode": "456",
        "attrValue": "属性值",
        "commodityClassId": "type1",
        "selected": ["1","2"],
        'is_selected':'0',
        "appName": [
          {
            "text": "触点1",
            "value": "1",
            "checked":false
          },
          {
            "text": "触点2",
            "value": "2",
            "checked":false
          }
        ],
         "appName2": [
          {
            "text": "子1",
            "value": "3",
            "checked":false
          },
          {
            "text": "子2",
            "value": "2",
            "checked":false
          }
        ]
      },
    {
        "attrCode": "789",
        "attrValue": "属性值",
        "commodityClassId": "type1",
        "selected": ["1","2"],
        'is_selected':'0',
        "appName": [
          {
            "text": "触点1",
            "value": "1",
            "checked":false
          },
          {
            "text": "触点2",
            "value": "2",
            "checked":false
          }
        ],
         "appName2": [
          {
            "text": "子1",
            "value": "3",
            "checked":false
          },
          {
            "text": "子2",
            "value": "2",
            "checked":false
          }
        ]
      },
    {
        "attrCode": "098",
        "attrValue": "属性值",
        "commodityClassId": "type1",
        "selected": ["1","2"],
        'is_selected':'0',
        "appName": [
          {
            "text": "触点1",
            "value": "1",
            "checked":false
          },
          {
            "text": "触点2",
            "value": "2",
            "checked":false
          }
        ],
         "appName2": [
          {
            "text": "子1",
            "value": "3",
            "checked":false
          },
          {
            "text": "子2",
            "value": "2",
            "checked":false
          }
        ]
      },
    {
        "attrCode": "222",
        "attrValue": "属性值",
        "commodityClassId": "type1",
        "selected": ["1","2"],
        'is_selected':'0',
        "appName": [
          {
            "text": "触点1",
            "value": "1",
            "checked":false
          },
          {
            "text": "触点2",
            "value": "2",
            "checked":false
          }
        ],
         "appName2": [
          {
            "text": "子1",
            "value": "3",
            "checked":false
          },
          {
            "text": "子2",
            "value": "2",
            "checked":false
          }
        ],
      }
];
}


function getDifferenceSetB(arr1,arr2,typeName){
  return Object.values(arr1.concat(arr2).reduce((acc,cur) => {
      if (acc[cur[typeName]] && acc[cur[typeName]][typeName] === cur[typeName]) {
          delete acc[cur[typeName]];
      }else{
          acc[cur[typeName]] = cur;
      }
      return acc ;
  },{}));
}