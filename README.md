irequest
-----------

# [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

request to class

## Install 安装

```sh
$ npm install --save irequest
```

## Usage 使用方法

### 绑定和触发事件 bind and trigger events

```js
var rb = new irequest.RequestBase()

rb.request(`https://localhost:8080/api/user`).then((relpy) => {
  console.log(relpy)
})
```

## License

MIT © [zswang](http://weibo.com/zswang)

[npm-url]: https://npmjs.org/package/irequest
[npm-image]: https://badge.fury.io/js/irequest.svg
[travis-url]: https://travis-ci.org/zswang/irequest
[travis-image]: https://travis-ci.org/zswang/irequest.svg?branch=master
[coverage-url]: https://coveralls.io/github/zswang/irequest?branch=master
[coverage-image]: https://coveralls.io/repos/zswang/irequest/badge.svg?branch=master&service=github