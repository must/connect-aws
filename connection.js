const platform = require('connect-platform');
const AWS = require('aws-sdk');

let options = platform.config.get('aws', {});

let credentials = new AWS.Credentials(options.credentials);

AWS.config = new AWS.Config({
  credentials: credentials, region: options.region
});

var accessors = [];

let configFunction = function(config) {
  var lowerCaseConfig = {};
  for(var property in config) {
    lowerCaseConfig[property.charAt(0).toLowerCase() + property.slice(1)] = config[property];
  }
  config = lowerCaseConfig;

  var key = options.credentials.accessKeyId;

  if('accessKeyId' in config) {
    key = config.accessKeyId;
  } else {
    config = {};
  }

  if(key in accessors) return accessors[key];

  accessors[key] = (function() {
    let ecr = null;
    let iam = null;
    let s3 = null;

    let lConfig = config; // Get a copy of the config
      
    return {
      get ecr() {
        if(ecr === null)
          ecr = new AWS.ECR(Object.assign(lConfig, { apiVersion: '2015-09-21' }));

        return ecr;
      },

      get iam() {
       if(iam === null)
         iam = new AWS.IAM(Object.assign(lConfig, { apiVersion: '2010-05-08' }));

       return iam;
      },

      get s3() {
        if(s3 === null)
          s3 = new AWS.S3(Object.assign(lConfig, { apiVersion: '2006-03-01' }));

        return s3;
      }
    }
  })();

  return accessors[key];
};

let aws = configFunction(options);
aws.config = configFunction;

module.exports = aws