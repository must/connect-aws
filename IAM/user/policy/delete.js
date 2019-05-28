/**
 *
 * Create IAM policy node
 *
 */
const platform = require('connect-platform');

const aws = require('../../../connection');

platform.core.node({
  path: '/aws/IAM/user/policy/delete',

  public: false,

  method: 'GET',

  inputs: ['arn'],

  outputs: ['response'],

  controlOutputs: ['error'],

  hints: {
    node: 'Deletes a <span class="hl-blue">policy</span> identified by the policy <span class="hl-blue">arn</span>.',

    inputs: {
      name: 'The policy <span class="hl-blue">arn</span> of the policy that is going to be deleted.'
    },
    
    outputs: {
      response: 'The returned result object for the created <span class="hl-blue">policy</span>.'
    },

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    var params = {
      PolicyArn: inputs.arn
    };
    
    aws.iam.deletePolicy(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        control('error');
      } else {
        output('response', data.ResponseMetadata);           // successful response
      }
    });
  }
);