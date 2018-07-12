export function saveToLocal (id, key, value) {
  let seller = localStorage.__seller__;
  if (!seller) { // 缓存中没有保存seller相关数据
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller); // 将字符串转化为对象
    if (!seller[id]) { // 判断是否有存储当前商家信息
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  localStorage.__seller__ = JSON.stringify(seller); // localStorage存储的是一个字符串
};

export function loadFromLocal (id, key, def) {

};