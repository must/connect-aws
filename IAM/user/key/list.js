/**
 *
 * Create access key for user IAM node
 *
 */
const platform = require('connect-platform');

const aws = require('../../../connection');

platform.core.node({
  path: '/aws/IAM/user/key/list',

  public: false,

  method: 'GET',

  inputs: ['userName'],

  outputs: ['accessKeys'],

  controlOutputs: ['error'],

  hints: {
    node: 'Lists the <span class="hl-blue">accessKeys</span> for the user with <span class="hl-blue">userName</span>.',

    inputs: {
      userName: 'The <span class="hl-blue">userName</span> of the user for which the <span class="hl-blue">accessKey</span> is going to be listed.'
    },
    
    outputs: {
      accessKeys: 'The returned result object for the listed <span class="hl-blue">accessKeys</span>.'
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
    
    aws.iam.listAccessKeys(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        control('error');
      } else {
        output('accessKeys', data.AccessKeyMetadata);           // successful response
      }
    });
  }
);