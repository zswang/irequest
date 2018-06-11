import * as request from 'request'
export interface IParseJSON {
  (text: string): any
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
export class RequestBase {
  debug: boolean
  constructor(debug: boolean = false) {
    this.debug = debug
  }
  /**
   * 发起 HTTP 请求
   */
  request(
    url: string,
    options: request.UriOptions | request.CoreOptions = {},
    parse?: IParseJSON
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      request(
        {
          url: url,
          ...options,
        },
        (err, res, body) => {
          if (err) {
            if (this.debug) {
              console.log('irequest/src/index.ts:97 err:', url, err)
            }
            reject({
              status: 500,
              stack: ['98281d86f415da59ef7dfb4d749aba59'],
              desc: 'Network error.',
            })
            return
          }
          let reply
          try {
            if (parse) {
              reply = parse(body)
            } else {
              reply = JSON.parse(body)
            }
          } catch (ex) {
            if (this.debug) {
              console.log('irequest/src/index.ts:115 err:', url, ex)
            }
            reject({
              status: 400,
              stack: ['f00938cbc8adde0ad013bb85acc08ec3'],
              desc: 'Data parsing error.',
            })
            return
          }
          resolve(reply)
        }
      )
    })
  }
}
