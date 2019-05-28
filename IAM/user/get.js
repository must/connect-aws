/**
 *
 * Get User IAM node
 *
 */
const platform = require('connect-platform');

const aws = require('../../connection');

platform.core.node({
  path: '/aws/IAM/user/get',

  public: false,

  method: 'GET',

  inputs: ['name'],

  outputs: ['user'],

  controlOutputs: ['error'],

  hints: {
    node: 'Get a <span class="hl-blue">user</span> using the <span class="hl-blue">name</span>.',

    inputs: {
      name: 'The <span class="hl-blue">name</span> of the user to be retrieved.'
    },
    
    outputs: {
      user: 'The returned result object for the creator <span class="hl-blue">user</span>.'
    },

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    var params = {
      UserName: inputs.name
    };
    
    aws.iam.getUser(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        control('error');
      } else {
        output('user', data.User);           // successful response
      }
    });
  }
);