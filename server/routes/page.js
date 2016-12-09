// import isEmpty from 'lodash/isEmpty';


exports.default = function(router){
  router.use('/', function *(next) {

    yield *next;
  });


  //查询自己状态接口
  router.get('/', function *() {
    yield this.render('index');
  });




};
