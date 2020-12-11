function(a,b){

  var first = [],table=[];
  var firstRow = ['品类','2019年SPU','2019年收藏人数','2019年购买人数','2019年销量','2019销售额','2020年SPU','2020年收藏人数','2020年购买人数','2020年销量','2020销售额','SPU同比','收藏人数同比','购买人数同比','销售额同比','趋势预测'];


  for(let i in firstRow){
    first[i]={item:firstRow[i]};
  }
  for(let i in b){
  let obj = [{item:b[i].type_name},
             {item:(b[i].SPU?b[i].SPU:0)},
             {item:(b[i].collected_number?b[i].collected_number:0)},
             {item:999},
             {item:(b[i].sales_volume?b[i].sales_volume:0)},
             {item:(b[i].sales_volume*b[i].price?b[i].sales_volume*b[i].price:0)},
             {item:(a[i]?a[i].SPU:0)},
             {item:(a[i]?a[i].collected_number:0)},
             {item:999},
             {item:(a[i]?a[i].sales_volume:0)},
             {item:(a[i]?(a[i].sales_volume*a[i].price?a[i].sales_volume*a[i].price:0):0)},
             {item:b[i].SPU?(parseInt(((a[i]?a[i].SPU:0)/(b[i].SPU))*100)+'%'):'100%'},
             {item:b[i].collected_number?(parseInt(((a[i]?a[i].collected_number:0)/(b[i].collected_number))*100)+'%'):'100%'},
             {item:b[i].SPU?(parseInt(((a[i]?a[i].SPU:0)/(b[i].SPU))*100)+'%'):'100%'},
             {item:b[i].SPU?(parseInt(((a[i]?a[i].SPU:0)/(b[i].SPU))*100)+'%'):'100%'},
             {item:b[i].SPU?(parseInt(((a[i]?a[i].SPU:0)/(b[i].SPU))*100)+'%'):'100%'}
            ];
  table[i]={items:obj};
  }
  for(let i in table){
      for(let k in table[i].items){
          if(!table[i].items[k].item){
            table[i].items[k].item=0;
          }
      }
  }

   var objarr = [{a:1,b:2},{a:2,b:3}];
   var arr1 =[]
   for(let i in objarr){
        if(i<1){
            arr1[i]=objarr[i];
        }
   }

   5fc466cfd3e4e95b04190d9d////5fc462b27a4b7958a7091d8e
   {
    "_id": "5fc4c2bc4953591850096089",
    "goods_id": "[\"5fc462b27a4b7958a7091d8e\",\"5fc4696e4554ea5ba0b32703\"]"
  },
  {
    "_id": "5fc4c3abc6c1b1191bba9d7c",
    "goods_id": "[\"5fc462b27a4b7958a7091d8e\"]"
  },
  {
    "_id": "5fc4c75b405e7b1c24c9b037",
    "goods_id": "[\"5fc4696e4554ea5ba0b32703\",\"5fc4b572a3b9b50773f887fc\"]"
  },
  {
    "_id": "5fc4c7cc1a8ebe1c6978da04",
    "goods_id": "[\"5fc4696e4554ea5ba0b32703\"]"
  },
  {
    "_id": "5fc4c7f106fbcf1c9856b91d",
    "goods_id": "[\"5fc4696e4554ea5ba0b32703\"]"
  },
  {
    "_id": "5fc4c8007a7b661cafa33202",
    "goods_id": "[\"5fc4696e4554ea5ba0b32703\"]"
  },
  {
    "_id": "5fc4cb53e18f521fbd17a6a9",
    "goods_id": "[\"5fc462b27a4b7958a7091d8e\",\"5fc4696e4554ea5ba0b32703\",\"5fc4b572a3b9b50773f887fc\"]"
  },
  {
    "_id": "5fc4e7b4498e802f3cc4b37e",
    "goods_id": "[\"5fc4b572a3b9b50773f887fc\"]"
  },
  {
    "_id": "5fc4e7ece8d8b92f48e9f009",
    "goods_id": "[\"5fc4696e4554ea5ba0b32703\"]"
  },
  {
    "_id": "5fc4eb5eba1b38307ce4e46a",
    "goods_id": "[\"5fc4696e4554ea5ba0b32703\"]"
  },
  {
    "_id": "5fc4ec0087490430da615f23",
    "goods_id": [
      "5fc462b27a4b7958a7091d8e"
    ]
  }

  table.unshift({items:first});
  return table;
}//(#a#,#b#)  a: content_list  b:contentBefor_list