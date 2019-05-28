const platform = require('connect-platform');

platform.core.node({
  path: '/aws/ECR/repository/policy/create/allowPushPull',

  public: false,

  method: 'GET',

  inputs: [
    'repositoryName',
    'awsAccountId',
    'users'
   ],

  outputs: ['policy'],

  controlOutputs: [],

  hints: {
    node: 'Creates a push/pull repository <span class="hl-blue">policy</span>.',

    inputs: {
      repositoryName: 'The <span class="hl-blue">repositoryName</span> to be created.',
      awsAccountId: 'The <span class="hl-blue">awsAccountId</span> to be used.',
      users: 'The user to be granted permission.'
    },

    outputs: {
      policy: 'The generated policy for the <span class="hl-blue">repositoryName</span>, <span class="hl-blue">awsAccountId</span> and <span class="hl-blue">user</span>.'
    },

    controlOutputs: { }
  }
},
  (inputs, output, control) => {
    const usersInput = Array.isArray(inputs.users) ? inputs.users : [inputs.users];
    let users = [];

    for(var user in usersInput) {
      users.push("arn:aws:iam::" + inputs.awsAccountId + ":user/" + usersInput[user]);
    }

    const policy = {
      "Version": "2008-10-17",
      "Statement": [
        {
          "Sid": "AllowPushPull",
          "Effect": "Allow",
          "Principal": {
            "AWS": users
          },
          "Action": [
            "ecr:GetDownloadUrlForLayer",
            "ecr:BatchGetImage",
            "ecr:BatchCheckLayerAvailability",
            "ecr:PutImage",
            "ecr:InitiateLayerUpload",
            "ecr:UploadLayerPart",
            "ecr:CompleteLayerUpload"
          ]
        }
      ]
     };

    output('policy', policy);
  }
);