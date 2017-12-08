import * as request from 'request'
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
            console.log('irequest/src/index.ts:21 err:', url, err)
          }
          reject({
            status: 500,
            stack: ['1740bbb94e20b0e007b806a80e4e3672'],
            desc: '网络错误',
          })
          return
        }
        let reply
        try {
          reply = JSON.parse(body)
          resolve(reply)
        } catch (ex) {
          if (this.debug) {
            console.log('irequest/src/index.ts:36 err:', url, ex)
          }
          reject({
            status: 400,
            stack: ['a58a9a88a5572092dd81b9b744bbeedd'],
            desc: '数据解析错误',
          })
        }
      })
    })
  }
}