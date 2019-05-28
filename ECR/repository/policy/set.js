const platform = require('connect-platform');

const aws = require('../../../connection');

platform.core.node({
  path: '/aws/ECR/repository/policy/set',

  public: false,

  method: 'GET',

  inputs: [ 'repositoryName', 'policy' ],
  outputs: ['repository'],

  controlOutputs: ['error'],

  hints: {
    node: 'Sets a <span class="hl-blue">policy</span> to a repository using the <span class="hl-blue">repositoryName</span>. <b>This replaces the old policy!</b>',

    inputs: {
      repositoryName: 'The <span class="hl-blue">repositoryName</span> to be created.',
      policy: 'The <span class="hl-blue">policy</span> to be set.'
    },

    outputs: {
      repository: 'the returned result object for the <span class="hl-blue">repository</span>.'
    },

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    if(typeof inputs.policy == 'object') inputs.policy = JSON.stringify(inputs.policy);
    var params = {
      policyText: inputs.policy,
      repositoryName: inputs.repositoryName,
      force: false
    };
    
    aws.ecr.setRepositoryPolicy(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        control('error');
      } else {
        platform.call('/aws/ECR/repository/policy/parse', { policyText: data.policyText })
        .then(response => {
          data.policy = response.data;
        })
        .catch(error => {
          console.log(error, error.stack); // an error occurred
          control('error');
        });
        output('repository', data);           // successful response
      }
    });
  }
);