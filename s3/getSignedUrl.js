/**
 *
 * Get User IAM node
 *
 */
const platform = require('connect-platform');

const aws = require('../connection');

platform.core.node({
  path: '/aws/S3/getSignedUrl',

  public: false,

  method: 'GET',

  inputs: [
    'operation',
    'bucket',
    'key',
    'expires'
  ],

  outputs: [ 'url' ],

  controlOutputs: [ 'error' ],

  hints: {
    node: 'Get a pre-signed URL for a given operation name.',

    inputs: {
      operation: 'The <span class="hl-blue">operation</span> to be performed.',
      bucket: 'The <span class="hl-blue">bucket</span> on which the operation should be performed.',
      key: 'The object <span class="hl-blue">key</span>',
      expires: 'The number of seconds for which the presigned policy should be valid.',
    },
    
    outputs: {
      url: 'The returned signed url.'
    },

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    var params = {
      Bucket: inputs.bucket,
      Key: inputs.key,
      Expires: inputs.expires,
    };

    aws.s3.getSignedUrl(inputs.operation, params, function(err, url) {
      if (err) {
        console.log(err, err.stack);
        control('error');
      } else {
        output('url', url);
      }
    });
  }
);