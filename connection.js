const platform = require('connect-platform');
const AWS = require('aws-sdk');

let options = platform.config.get('aws', {});

let credentials = new AWS.Credentials(options.credentials);

AWS.config = new AWS.Config({
  credentials: credentials, region: options.region
});

let ecr = null;
let iam = null;

let aws = {
  get ecr() {
    if(ecr === null)
      ecr = new AWS.ECR({apiVersion: '2015-09-21'})

    return ecr;
 }

 get iam() {
   if(iam === null)
     iam = new AWS.IAM({apiVersion: '2010-05-08'});

   return iam;
 }
};

module.exports = aws