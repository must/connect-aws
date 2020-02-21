/**
 *
 * Get User IAM node
 *
 */
const platform = require('connect-platform');

const aws = require('../connection');

platform.core.node({
  path: '/aws/S3/createPresignedPost',

  public: false,

  method: 'GET',

  inputs: [
    'bucket',
    'expires',
    'conditions',
    'fields'
  ],

  outputs: [ 'data' ],

  controlOutputs: [ 'error' ],

  hints: {
    node: 'Get a pre-signed POST policy to support uploading to S3 directly from an HTML form.',

    inputs: {
      bucket: 'The <span class="hl-blue">bucket</span> to which the post should be uploaded.',
      expires: 'The number of seconds for which the presigned policy should be valid.',
      conditions: 'An array of conditions that must be met for the presigned policy to allow the upload. This can include required tags, the accepted range for content lengths, etc.',
      fields: 'Fields to include in the form. All values passed in as fields will be signed as exact match conditions.'
    },
    
    outputs: {
      data: 'The returned data object for the policy.'
    },

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    var params = {
      Bucket: inputs.bucket,
      Expires: inputs.expires,
      Conditions: inputs.conditions,
      Fields: inputs.fields
    };

    aws.s3.createPresignedPost(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        control('error');
      } else {
        output('data', data);
      }
    });
  }
);