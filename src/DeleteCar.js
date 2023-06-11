const AWS = require('aws-sdk');

const middy = require('@middy/core');
const jsonBodyParser = require("@middy/http-json-body-parser");

const deleteCar = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    await dynamodb.delete({
        TableName: 'CarTable',
        Key: {
            id: id
        }
    }).promise();
    

    return{
        statusCode: 200,
        body: JSON.stringify({message:'Car deleted'})
      }
}

module.exports = {
    deleteCar: middy(deleteCar).use(jsonBodyParser())
  }