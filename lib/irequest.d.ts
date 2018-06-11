/// <reference types="request" />
import * as request from 'request';
export interface IParseJSON {
    (text: string): any;
}
/**
 * 网络请求基类
 *
 * @example RequestBase:success
  ```js
  const rb = new irequest.RequestBase()
  rb.request(`http://localhost:3030/api/user`).then(reply => {
    console.log(JSON.stringify(reply))
    // > {"name":"zswang","city":"beijing"}
    // * done
  })
  ```
* @example RequestBase:custom parse
  ```js
  const rb = new irequest.RequestBase()
  rb.request(`http://localhost:3030/api/list`, {}, s => s.split(',')).then(reply => {
    console.log(JSON.stringify(reply))
    // > ["z","s","w","a","n","g"]
    // * done
  })
  ```
 * @example RequestBase:parse error
  ```js
  const rb = new irequest.RequestBase()
  rb.request(`http://localhost:3030/api/name`).then(reply => {
  }).catch(err => {
    console.log(err.status)
    // > 400
    // * done
  })
  ```
 * @example RequestBase:parse error & debug
  ```js
  const rb = new irequest.RequestBase(true)
  rb.request(`http://localhost:3030/api/name`).then(reply => {
  }).catch(err => {
    console.log(err.status)
    // > 400
    // * done
  })
  ```
 * @example RequestBase:network error
  ```js
  const rb = new irequest.RequestBase()
  rb.request(`http://localhost:3033/none`).then(reply => {
  }).catch(err => {
    console.log(err.status)
    // > 500
    // * done
  })
  ```
 * @example RequestBase:network error & debug
  ```js
  const rb = new irequest.RequestBase(true)
  rb.request(`http://localhost:3033/none`).then(reply => {
  }).catch(err => {
    console.log(err.status)
    // > 500
    // * done
  })
  ```
 */
export declare class RequestBase {
    debug: boolean;
    constructor(debug?: boolean);
    /**
     * 发起 HTTP 请求
     */
    request(url: string, options?: request.UriOptions | request.CoreOptions, parse?: IParseJSON): Promise<any>;
}
