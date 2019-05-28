const platform = require('connect-platform');

platform.core.node({
  path: '/aws/IAM/user/policy/create/iam/getAuthorizationToken',

  public: false,

  method: 'GET',

  inputs: [],

  outputs: ['policy'],

  controlOutputs: [],

  hints: {
    
    node: 'Creates a getAuthorizationToken <span class="hl-blue">policy</span>.',

    inputs: {},

    outputs: {
      policy: 'The generated policy for the <span class="hl-blue">repositoryName</span>, <span class="hl-blue">awsAccountId</span> and <span class="hl-blue">user</span>.'
    },

    controlOutputs: {
    }
  }
},
  (inputs, output, control) => {
    const policy = {
      "Version": "2012-10-17",
      "Statement": [{
        "Effect": "Allow",
        "Action": [
          "ecr:GetAuthorizationToken"
        ],
        "Resource": "*"
      }]
    };

    output('policy', policy);
  }
);