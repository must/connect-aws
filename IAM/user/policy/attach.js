/**
 *
 * Attach a Policy to a user IAM node
 *
 */
const platform = require('connect-platform');

const aws = require('../../../connection');

platform.core.node({
  path: '/aws/IAM/user/policy/attach',

  public: false,

  method: 'GET',

  inputs: ['arn', 'userName'],

  outputs: ['reponseMetadData'],

  controlOutputs: ['error'],

  hints: {
    node: 'Get a <span class="hl-blue">policy</span> using the <span class="hl-blue">arn</span>.',

    inputs: {
      arn: 'The <span class="hl-blue">arn</span> of the policy to be retrieved.',
      userName: 'The <span class="hl-blue">userName</span> of user to which the policy should be attached.'
    },
    
    outputs: {
      reponseMetadData: 'The returned result object <span class="hl-blue">reponseMetadData</span>.'
    },

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    var params = {
      PolicyArn: inputs.arn,
      UserName: inputs.userName
    };
    
    aws.iam.attachUserPolicy(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        control('error');
      } else {
        output('reponseMetadData', data.ResponseMetadata);
      }
    });
  }
);