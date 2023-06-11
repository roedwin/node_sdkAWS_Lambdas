const AWS = require('aws-sdk');

const middy = require('@middy/core');
const jsonBodyParser = require("@middy/http-json-body-parser");

const getCars = async(event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb.scan({
        TableName: 'CarTable'
    }).promise();

    const cars = result.Items;

    return{
        statusCode: 200,
        body: JSON.stringify(cars)
      }
}

module.exports = {
    getCars: middy(getCars).use(jsonBodyParser())
}