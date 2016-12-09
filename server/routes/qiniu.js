import qiniu from 'qiniu';


qiniu.conf.ACCESS_KEY = '';
qiniu.conf.SECRET_KEY = '';

const bucket = 'kidsj-img';

//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket);
  return putPolicy.token();
}

exports.default = function(router){
  router.use('/', function *(next) {
    yield *next;
  });


  router.get('/index', function *() {
    yield this.render('qiniu');
  });

  //获取uptoken
  router.get('/uptoken', function *() {
    //调用上面方法
    const uptokenString = uptoken(bucket);

    //输出json 格式{uptoken:'xxxxxxxxx'}
    this.body = {
      uptoken: uptokenString
    }
    // yield this.render('qiniu');
  });



};
