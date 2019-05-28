const platform = require('connect-platform');

const aws = require('../../connection');

platform.core.node({
  path: '/aws/ECR/repository/create',

  public: false,

  method: 'GET',

  inputs: ['repositoryName'],

  outputs: ['repository'],

  controlOutputs: ['error'],

  hints: {
    node: 'Created a new repository using the <span class="hl-blue">repositoryName</span>.',

    inputs: {
      repositoryName: 'the name of the repository to be created.',
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
    aws.ecr.createRepository({ repositoryName: inputs.repositoryName }, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        control('error');
      } else {
        output('repository', data.repository);           // successful response
      }
    });
  }
);