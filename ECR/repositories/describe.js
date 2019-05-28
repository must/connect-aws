const platform = require('connect-platform');

const aws = require('../../connection');

platform.core.node({
  path: '/aws/ECR/repositories/describe',

  public: false,

  method: 'GET',

  inputs: [],

  outputs: ['repositories'],

  controlOutputs: ['error'],

  hints: {
    node: 'Gets an authorization tocken using the optional <span class="hl-blue">params</span>.',

    inputs: { },

    outputs: {
      repositories: 'the returned result object for the <span class="hl-blue">repositories</span>.'
    },

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    aws.ecr.describeRepositories({ }, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        control('error');
      } else {
        output('repositories', data.repositories);           // successful response
      }
    });
  }
);