import * as request from 'request'
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
export class RequestBase {
  debug: boolean
  constructor(debug: boolean = false) {
    this.debug = debug
  }
  /**
   * 发起 HTTP 请求
   */
  request(url: string, options: request.UriOptions | request.CoreOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      request({
        url: url,
        ...options,
      }, (err, res, body) => {
        if (err) {
          if (this.debug) {
            console.log('irequest/src/index.ts:77 err:', url, err)
          }
          reject({
            status: 500,
            stack: ['bb17a7ca42d10965843af36542e44e4d'],
            desc: 'Network error.',
          })
          return
        }
        let reply
        try {
          reply = JSON.parse(body)
        } catch (ex) {
          if (this.debug) {
            console.log('irequest/src/index.ts:91 err:', url, ex)
          }
          reject({
            status: 400,
            stack: ['018c068b3d50c538a9415a44101863db'],
            desc: 'Data parsing error.',
          })
          return
        }
        resolve(reply)
      })
    })
  }
}