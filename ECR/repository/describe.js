const platform = require('connect-platform');

const aws = require('../../connection');

platform.core.node({
  path: '/aws/ECR/repository/describe',

  public: false,

  method: 'GET',

  inputs: ['name'],

  outputs: ['repository'],

  controlOutputs: ['error'],

  hints: {
    node: 'Gets an authorization tocken using the optional <span class="hl-blue">params</span>.',

    inputs: {
      name: '<span class="hl-blue">Name</span> of the repository to be searched for'
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
    aws.ecr.describeRepositories({ repositoryNames: [ inputs.name ] }, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        control('error');
      } else {
        output('repository', data.repositories[0]);
      }
    });
  }
);