const AWS = require('aws-sdk');

AWS.config.update(
    {accessKeyId: 'AKIAJCTJSSOBTFUZZ3IA', 
    secretAccessKey: '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',
    region: 'us-west-1',
    });

var lambda = new AWS.Lambda();
var params = {
  FunctionName: 'webscraper_insert',
  Payload: JSON.stringify({
    'x': 1, 
    'y': 2,
    'z': 3,
  }),
};
lambda.invoke(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});