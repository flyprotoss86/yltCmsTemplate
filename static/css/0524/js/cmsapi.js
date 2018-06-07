function GetDTstr(dt){
  if(!dt.getFullYear)
    dt=new Date(Number(dt)*1000)
  return dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()
}
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]); return "";
}
var _catsbypidurl='//site.bjyihuilian.com/index.php?m=content&c=index&a=lists&catid=1412&pid='
var _catdbycidurl='//site.bjyihuilian.com/index.php?m=content&c=index&a=lists&catid=1464&cid='
var _itemsbycatidurl='//site.bjyihuilian.com/index.php?m=content&c=index&a=lists&catid=1413&cid='
var _itembycatandidurl='//site.bjyihuilian.com/index.php?m=content&c=index&a=lists&catid=1414&cid='
function getitembycidandid(cid,id,callback,err_callback){
  ajaxjson(_itembycatandidurl+cid+'&iid='+id,function(data){
    var ret=[]
    for(var key in data){
      ret.push(data[key])
    }
    if(ret.length>0)
      callback(ret[0])
    else
      err_callback && err_callback()
  },err_callback)
}
function getitemsbycid(cid,callback,err_callback){
  ajaxjson(_itemsbycatidurl+cid,function(data){
    var ret=[]
    for(var key in data){
      ret.push(data[key])
    }
    callback(ret)
  },err_callback)
}
function getcatsbypid(pid,callback,err_callback){
  ajaxjson(_catsbypidurl+pid,function(data){
    var ret=[]
    for(var key in data){
      ret.push(data[key])
    }
    callback(ret)
  },err_callback)
}
function getcatdbycid(cid,callback,err_callback){
  ajaxjson(_catdbycidurl+cid,function(data){
    var ret=[]
    for(var key in data){
      ret.push(data[key])
    }
    if(ret.length>0)
      callback(ret[0])
    else if(err_callback)
      err_callback()
  },err_callback)
}
function ajaxjson(url, succ_callback, error_callback) {
  $.ajax({
    url: url,
    type: 'get',
    dataType: 'jsonp',
    jsonpCallback: 'aa',
    timeout: 60000
  }).done(function(data){
    succ_callback(data)
  }).fail(function(e){
    // console.log(e)
    if(error_callback)
      error_callback(e)
  })
}