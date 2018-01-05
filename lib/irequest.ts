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
  constructor(debug: boolean) {
    this.debug = debug
  }
  /**
   * 发起 HTTP 请求
   */
  request(url: string, options?: request.UriOptions | request.CoreOptions): Promise<object> {
    return new Promise((resolve, reject) => {
      request({
        ...{
          url: url
        },
        ...(options || {}),
      }, (err, res, body) => {
        if (err) {
          if (this.debug) {
            console.log('irequest/src/index.ts:79 err:', url, err)
          }
          reject({
            status: 500,
            stack: ['7a790f75773808122aae17a96cccfbf6'],
            desc: 'Network error.',
          })
          return
        }
        let reply
        try {
          reply = JSON.parse(body)
        } catch (ex) {
          if (this.debug) {
            console.log('irequest/src/index.ts:93 err:', url, ex)
          }
          reject({
            status: 400,
            stack: ['b9af657e5e9c0f25095b32c3644e045f'],
            desc: 'Data parsing error.',
          })
          return
        }
        resolve(reply)
      })
    })
  }
}