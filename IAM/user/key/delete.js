/**
 *
 * Delete access key for user IAM node
 *
 */
const platform = require('connect-platform');

const aws = require('../../../connection');

platform.core.node({
  path: '/aws/IAM/user/key/delete',

  public: false,

  method: 'GET',

  inputs: [ 'userName', 'accessKeyId' ],

  outputs: [ 'responseMetaData' ],

  controlOutputs: ['error'],

  hints: {
    node: 'Deletes an <span class="hl-blue">accessKey</span> for the user with <span class="hl-blue">userName</span>.',

    inputs: {
      userName: 'The <span class="hl-blue">userName</span> of the user for which the <span class="hl-blue">accessKey</span> is going to be deleted.',
      accessKeyId: 'The <span class="hl-blue">accessKeyId</span> that will be deleted.'
    },
    
    outputs: {
      responseMetaData: 'The returned result object for the deleted <span class="hl-blue">accessKey</span>.'
    },

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    var params = {
      UserName: inputs.userName,
      AccessKeyId: inputs.accessKeyId
    };
    
    aws.iam.deleteAccessKey(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        control('error');
      } else {
        output('responseMetaData', data.ResponseMetadata);           // successful response
      }
    });
  }
);