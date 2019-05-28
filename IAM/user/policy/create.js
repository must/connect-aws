/**
 *
 * Create IAM policy node
 *
 */
const platform = require('connect-platform');

const aws = require('../../../connection');

platform.core.node({
  path: '/aws/IAM/user/policy/create',

  public: false,

  method: 'GET',

  inputs: ['name', 'document'],

  outputs: ['policy'],

  controlOutputs: ['error'],

  hints: {
    node: 'Create a <span class="hl-blue">policy</span> with the <span class="hl-blue">name</span> and <span class="hl-blue">document</span>.',

    inputs: {
      name: 'The <span class="hl-blue">name</span> of the policy that is going to be created.',
      document: 'The policy <span class="hl-blue">document</span>.'
    },
    
    outputs: {
      policy: 'The returned result object for the created <span class="hl-blue">policy</span>.'
    },

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    if(typeof inputs.document == 'object') inputs.document = JSON.stringify(inputs.document);
    var params = {
      PolicyName: inputs.name,
      PolicyDocument: inputs.document
    };
    
    aws.iam.createPolicy(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        control('error');
      } else {
        output('policy', data.Policy);           // successful response
      }
    });
  }
);