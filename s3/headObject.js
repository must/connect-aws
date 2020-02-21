/**
 *
 * Get User IAM node
 *
 */
const platform = require('connect-platform');

const aws = require('../connection');

platform.core.node({
  path: '/aws/S3/headObject',

  public: false,

  method: 'GET',

  inputs: [
    'bucket',
    'key',
    'extra'
  ],

  outputs: [ 'data' ],

  controlOutputs: [ 'error' ],

  hints: {
    node: 'The HEAD operation retrieves metadata from an object without returning the object itself.',

    inputs: {
      bucket: 'The <span class="hl-blue">bucket</span> to which the head request should be sent.',
      key: 'The object <span class="hl-blue">key</span>.',
      extra: 'Extra parameters check documentation <a href="https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#headObject-property">here</a>.'
    },
    
    outputs: {
      data: 'The returned data object for the head request.'
    },

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    var params = Object.assign(
      inputs.extra, {
        Bucket: inputs.bucket,
        Key: inputs.key
      }
    );

    aws.s3.headObject(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        control('error');
      } else {
        output('data', data);
      }
    });
  }
);