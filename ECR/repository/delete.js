const platform = require('connect-platform');

const aws = require('../../connection');

platform.core.node({
  path: '/aws/ECR/repository/delete',

  public: false,

  method: 'GET',

  inputs: [ 'repositoryName', 'force' ],

  outputs: ['repository'],

  controlOutputs: ['error'],

  hints: {
    node: 'Created a new repository using the <span class="hl-blue">repositoryName</span>.',

    inputs: {
      repositoryName: 'The name of the repository to be created.',
      force: 'If a repository contains images, forces the deletion.'
    },

    outputs: {
      repository: 'The returned result object for the <span class="hl-blue">repository</span>.'
    },

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    aws.ecr.deleteRepository({ repositoryName: inputs.repositoryName, force: inputs.force }, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        control('error');
      } else {
        output('repository', data.repository);           // successful response
      }
    });
  }
);