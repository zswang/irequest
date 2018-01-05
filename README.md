irequest
-----------

# [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

request to class

## Install 安装

```sh
$ npm install --save irequest
```

## Usage 使用方法

### Bind and trigger events 绑定和触发事件

```js
const rb = new irequest.RequestBase()

rb.request(`http://localhost:3000/api/user`).then((reply) => {
  console.log(reply)
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