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
            console.log('^linenum err:', url, err)
          }
          reject({
            status: 500,
            stack: ['<!--jdists encoding="md5">^linenum</jdists-->'],
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
            console.log('^linenum err:', url, ex)
          }
          reject({
            status: 400,
            stack: ['<!--jdists encoding="md5">^linenum</jdists-->'],
            desc: '数据解析错误',
          })
        }
      })
    })
  }
}