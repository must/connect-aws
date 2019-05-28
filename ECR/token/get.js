/**
 *
 * Get authorization token
 *
 */

const platform = require('connect-platform');

const aws = require('../../connection');

platform.core.node({
  path: '/aws/ECR/token/get',

  public: false,

  method: 'GET',

  inputs: ['params'],

  outputs: ['authorizationData'],

  controlOutputs: ['error'],

  hints: {
    node: 'Gets an authorization tocken using the optional <span class="hl-blue">params</span>.',

    inputs: {
      params: 'the parameters as an object which includes optionally a registeryIds field.',
    },

    outputs: {
      authorizationData: 'the returned result object for the <span class="hl-blue">query</span>.'
    },
    
    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    aws.ecr.getAuthorizationToken(inputs.params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        control('error');
      } else {
        output('authorizationData', data.authorizationData);           // successful response
      }
    });
  }
);