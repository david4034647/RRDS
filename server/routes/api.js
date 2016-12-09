import request from 'request';
import qs from 'query-string';
//import {
//    INTERNAL_ERROR
//} from '../middlewares/responseHelper';
const domain = 'http://120.76.248.8:7001/API';

const modules = [
  'QueryADInfoList',
  'QueryCategoryList',
  'QueryWordInfoPageList',
  'QueryWordInfoPageListByUserId',
  'QueryWordInfoDetail',
  'QueryUserPageListByRecommendation'
]


function _request (uri, options) {
  return function (callback) {
    request.post({
      headers: {'content-type' : 'application/x-www-form-urlencoded'},
      url:     uri,
      body:    qs.stringify(options)
    }, function (error, response, body) {
      callback(error, response);
    })
  }
}



exports.default = function(router){
  // console.log(isEmpty(null));
  router.use('/', function *(next) {

    // console.log(url);
    const _url = this.request.url && this.request.url.replace('/api', '');
    this.url = `${domain}${_url}`;


    yield *next;
  });


  for (const module of modules) {
    const moduleUrl = `/${module}`;
    router.get(moduleUrl, function *() {
      const response = yield invoke(this.url);
      this.body = response.body

    }).post(moduleUrl, function *() {


      const response = yield invoke(this.url, this.request.body);

      this.body = JSON.parse(response.body);
      // this.body = {
      //   'code': 0
      // }
      // console.log(`${domain}${this.url}`);

    })
  }

  function* invoke(url, postData) {
    const newUrl = `${url}?${qs.stringify(postData)}`;

    console.log(`开始请求接口:${newUrl}`);

    // request.post({
    //   headers: {'content-type' : 'application/x-www-form-urlencoded'},
    //   url:     'http://localhost/test2.php',
    //   body:    "mes=heydude"
    // }, function(error, response, body){
    //   console.log(body);
    // });


    const response = yield _request(url, postData);

    console.log(JSON.parse(response.body));
    return response;
  }



};