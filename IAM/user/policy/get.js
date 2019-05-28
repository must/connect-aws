/**
 *
 * Get Policy IAM node
 *
 */
const platform = require('connect-platform');

const aws = require('../../../connection');

platform.core.node({
  path: '/aws/IAM/user/policy/get',

  public: false,

  method: 'GET',

  inputs: ['arn'],

  outputs: ['policy'],

  controlOutputs: ['not_found', 'error'],

  hints: {
    node: 'Get a <span class="hl-blue">policy</span> using the <span class="hl-blue">arn</span>.',

    inputs: {
      arn: 'The <span class="hl-blue">arn</span> of the policy to be retrieved.'
    },
    
    outputs: {
      policy: 'The returned result object of the requested <span class="hl-blue">policy</span>.'
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
    
    aws.iam.getPolicy(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        console.log(err.code)
        if(err.code == 'NoSuchEntity') {
          control('not_found');
          return;
        }
        control('error');
      } else {
        output('policy', data.Policy);
      }
    });
  }
);