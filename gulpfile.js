/*jshint globalstrict: true*/
/*global require*/

'use strict'

const gulp = require('gulp')
const typescript = require('gulp-typescript')
const linenum = require('gulp-linenum')
const jdists = require('gulp-jdists')
const examplejs = require('gulp-examplejs')
const rename = require('gulp-rename')
const merge2 = require('merge2')
const pkg = require('./package')

gulp.task('build', function() {
  var tsResult = gulp
    .src('./src/*.ts')
    .pipe(
      linenum({
        prefix: `${pkg.name}/src/index.ts:`,
      })
    )
    .pipe(jdists())
    .pipe(gulp.dest('./lib'))
    .pipe(
      typescript({
        module: 'commonjs',
        target: 'es2015',
        declaration: true,
      })
    )

  return merge2([
    tsResult.dts.pipe(gulp.dest('./lib')),
    tsResult.js.pipe(gulp.dest('./lib')),
  ])
})

gulp.task('example', function() {
  return gulp
    .src([`src/${pkg.name}.ts`])
    .pipe(
      examplejs({
        header: `
global.${pkg.name} = require('../')
const http = require('http')
const server = http.createServer(function (req, res) {
  switch (req.url) {
    case '/api/user':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(JSON.stringify({ name: 'zswang', city: 'beijing' }))
      return
    case '/api/name':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('zswang')
      return
    case '/api/list':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('z,s,w,a,n,g')
      return
  }
  res.writeHead(404)
  res.end('Not Found')
})
server.listen(3030)
      `,
      })
    )
    .pipe(
      rename({
        extname: '.js',
      })
    )
    .pipe(gulp.dest('test'))
})

gulp.task('dist', ['build', 'example'])
