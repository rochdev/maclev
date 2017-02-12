'use strict'

const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const cache = {}

module.exports = {
  get: (env, file) => {
    cache[env] = cache[env] || {}
    cache[env][file] = cache[env][file] || new Promise((resolve, reject) => {
      s3.getObject({
        Bucket: `maclev-cache-${env}`,
        Key: `${file}`
      }, (err, result) => err ? reject(err) : resolve(JSON.parse(result.Body)))
    })

    return cache[env][file]
  },

  put: (env, file, obj) => {
    return new Promise((resolve, reject) => {
      s3.putObject({
        Bucket: `maclev-cache-${env}`,
        Key: `${file}`,
        Body: JSON.stringify(obj)
      }, err => err ? reject(err) : resolve())
    })
  }
}
