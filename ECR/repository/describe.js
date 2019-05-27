/**
 *
 * a sample 'hellow <x>' node. you can use this as a template for actual nodes of
 * your package, just remember to remove it or at least not include it in your
 * 'index.js' platform package config.
 *
 */

const platform = require('connect-platform');

const aws = require('../../connection');

/**
 *
 * lets define a new node for the platform.
 *
 */
platform.core.node({
  /**
   *
   * it should be accessible via '/test-package/hellow'
   *
   */
  path: '/aws/ECR/repository/describe',

  /**
   *
   * it should not be publicly accessible by default. note that if you
   * switch this to 'true', this node will also be accessible via web requests
   * for people who install your package.
   *
   */
  public: false,

  /**
   *
   * this is not necessary for non-public nodes. for the public nodes, this will
   * be the http method through which the node is publicly accessible, so either
   * 'GET', 'POST', 'PUT' or 'DELETE' (yeah we do not support other http methods).
   *
   */
  method: 'GET',

  /**
   *
   * the list of inputs for this node, in our case merely
   * a name we want to say 'hellow' to.
   *
   */
  inputs: ['name'],

  /**
   *
   * the possible list of outputs for your node. these are
   * different keys that can get different values, in case of
   * different scenarios that might happen. in this case,
   * we have only one scenario in which a 'message' containing
   * our 'hellow' message will be the output.
   *
   */
  outputs: ['repository'],

  /**
   *
   * these can be control outputs, i.e. outputs without any accompanying
   * data. if your node should not return any data, make sure to use
   * control outputs instead of outputs. these can also be used for exceptional
   * cases like errors or misconfigurations.
   *
   */
  controlOutputs: ['error'],

  /**
   *
   * these act as the documentation of your node. make sure to write explicit
   * and helpful documentation on what does this node do and what each input/output/controlOutput
   * is.
   *
   * you can use html tags in these descriptions. classes 'hl', 'hl-blue' and 'hl-green'
   * can be used to highlight stuff.
   */
  hints: {
    /**
     *
     * this is the description of the node in general.
     *
     */
    node: 'Gets an authorization tocken using the optional <span class="hl-blue">params</span>.',

    /**
     *
     * these are the descriptions of each input value.
     *
     */
    inputs: {
      name: '<span class="hl-blue">Name</span> of the repository to be searched for'
    },

    /**
     *
     * these are the descriptions of possible output values.
     *
     */
    outputs: {
      repository: 'the returned result object for the <span class="hl-blue">repository</span>.'
    },

    /**
     *
     * these are the descriptions of possible control outputs.
     *
     */
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