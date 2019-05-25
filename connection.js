const platform = require('connect-platform');
const AWS = require('aws-sdk');

let options = platform.config.get('aws', {});

let credentials = new AWS.Credentials(options.credentials);

console.log({
  credentials: credentials, region: options.region
});

AWS.config = new AWS.Config({
  credentials: credentials, region: options.region
});

let ecr = new AWS.ECR({apiVersion: '2015-09-21'});

module.exports = ecr