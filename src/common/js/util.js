module.exports = urlParse;
function urlParse () { // 解析url参数 example:[?id=1234&a=b] return:[Object {id:1234,a:b}]
  let url = window.location.serach;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg); // 返回一个数组[?id=1234,&a=b];
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('='); // 把首字符删掉.split
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}
