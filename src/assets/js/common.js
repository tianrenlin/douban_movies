 //统一请求
 import axios from 'axios'
 import Vue from 'vue'

const Get = function (url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(function (response) {
        resolve(response.data)
      })
      .catch(function (err) {
        alert('获取数据失败！')
      })
    })
  }
  // async/await方法
  const Get2 = async url =>{
    return await axios.get(url)
  }
  // 获取当前搜索页面的ID
  const getID=function(){
    // 获取id
    let href=window.location.href
    let id=window.location.href.substring(href.search(/=/)+1,href.length)
    return id
  }
  // Web存储
  const setSion=function(sionKey,sionValue){
    window.sessionStorage.setItem(sionKey,sionValue);
  }
  const getSion=function(sionKey){
    return window.sessionStorage.getItem(sionKey);
  }
  const remSion=function(sionKey){
    return window.sessionStorage.removeItem(sionKey);
  }
  // 数组去重
  const unique=function(arr){
    return Array.from(new Set(arr))
  }
  // json数组合并
  const jsonArr=function(oldArr,newArr){
    let o = JSON.parse(oldArr)
    let n = JSON.parse(newArr)
    return JSON.stringify(uniqueJson(o.concat(n),'id'))
  }
  // json数组去重
  function uniqueJson(array, key){
    var result = [array[0]];
    for(var i = 1; i < array.length; i++){
      var item = array[i];
      var repeat = false;
      for (var j = 0; j < result.length; j++) {
        if (item[key] == result[j][key]) {
          repeat = true;
          break;
        }
      }
      if (!repeat) {
        result.push(item);
      }
    }
    return result;
  }
  // json数组查找对应内容
  function searchJson(arr,id){
    console.log(arr)
    if(!arr || arr==null || arr==undefined){
      return false
    }
    else{
      for(var i=0;i<arr.length;i++){
        if(arr[i].id==id){
          return 1
          break
        }
      }
      return false
    }
  }
  //  操作想看、看过的sion
  function setWantWatchedSion(wKey,json){ // 数组合并
      let sionArr=json
      if(getSion(wKey)){
          let oldSionArr=getSion(wKey)
          sionArr=jsonArr(oldSionArr,sionArr)
      }  
      setSion(wKey,sionArr)
  }
  function remWantWatchedSion(wKey,arr,id){ // 删除数组中对应的数据
      arr.forEach((item,index)=>{
          if(item.id==id){
              arr.splice(index,1)
          }
      })
      if(arr.length>0){
          setSion(wKey,JSON.stringify(arr))
      }
      else{
          remSion(wKey)
      }
  }

  const wserv='https://images.weserv.nl/?url='
  export default{
    wserv,
    Get,
    getID,
    setSion,
    getSion,
    remSion,
    unique,
    jsonArr,
    uniqueJson,
    searchJson,
    setWantWatchedSion,
    remWantWatchedSion,
  }