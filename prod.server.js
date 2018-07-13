const express = require('express'); // 通过express导入路由
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

const app = express(); // 请求server

var router = express.Router();

router.get('/', function(req, res, next){
  req.url = '/index.html';
  next();
});

app.use(router);

var appData = require('./data.json');// 加载本地数据文件
var seller = appData.seller;// json卖家数据
var goods = appData.goods;// json商品数据
var ratings = appData.ratings;// json评论数据

var apiRouter = express.Router();// 编写路由

apiRouter.get('/seller', function (req, res) {
  // 服务端收到请求后返回给客户端一个json数据
  res.json({
    // 当我们数据正常时，我们通过传递errno字符为0表示数据正常
    errno: 0,
    // 返回json中的卖家数据
    data: seller
  });
});
apiRouter.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
});
apiRouter.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
});

// 所有通过接口相关的api都会通过api这个路由导向到具体的路由
app.use('/api',apiRouter);// 通过路由请求数据

app.use(express.static('./dist'));

module.exports = app.listen(port, function(err){
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:9000')
})