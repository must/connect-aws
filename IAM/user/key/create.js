/**
 *
 * Create access key for user IAM node
 *
 */
const platform = require('connect-platform');

const aws = require('../../../connection');

platform.core.node({
  path: '/aws/IAM/user/key/create',

  public: false,

  method: 'GET',

  inputs: ['userName'],

  outputs: ['accessKey'],

  controlOutputs: ['error'],

  hints: {
    node: 'Create an <span class="hl-blue">accessKey</span> for the user with <span class="hl-blue">userName</span>.',

    inputs: {
      userName: 'The <span class="hl-blue">userName</span> of the user for which the <span class="hl-blue">accessKey</span> is going to be created.'
    },
    
    outputs: {
      accessKey: 'The returned result object for the created <span class="hl-blue">accessKey</span>.'
    },

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    var params = {
      UserName: inputs.userName
    };
    
    aws.iam.createAccessKey(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        control('error');
      } else {
        output('accessKey', data.AccessKey);           // successful response
      }
    });
  }
);