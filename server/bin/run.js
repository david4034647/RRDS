/**
 * Created by shanjie on 16/9/25.
 */
import app from '../app';
//import mongoConnection from '../db/connection';

(async ()=>{
  //try {
  //  await mongoConnection();
  //} catch (e) {
  //  console.error('ERROR:', e);
  //  return;
  //}
  app.listen(3002, '127.0.0.1', ()=>{
    console.log('server listen');
  });
})();
