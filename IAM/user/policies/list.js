/**
 *
 * Create IAM policy node
 *
 */
const platform = require('connect-platform');

const aws = require('../../../connection');

platform.core.node({
  path: '/aws/IAM/user/policies/list',

  public: false,

  method: 'GET',

  inputs: [],

  outputs: ['policies'],

  controlOutputs: ['error'],

  hints: {
    node: 'Return the list of <span class="hl-blue">policies</span>.',

    inputs: {
    },
    
    outputs: {
      policies: 'The returned result object for the retrieved <span class="hl-blue">policies</span>.'
    },

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    var params = {};
    
    aws.iam.listPolicies(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        control('error');
      } else {
        output('policies', data.Policies);           // successful response
      }
    });
  }
);