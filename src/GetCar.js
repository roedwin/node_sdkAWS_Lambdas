const AWS = require('aws-sdk');

const middy = require('@middy/core');
const jsonBodyParser = require("@middy/http-json-body-parser");

const getCar = async(event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    const result = await dynamodb.get({
        TableName: 'CarTable',
        Key: {
            id: id
        }
    }).promise();


    const car = result.Item;

    if(car){
        return{
            statusCode: 200,
            body: JSON.stringify(car)
          }
    } else{
        return{
            statusCode: 200,
            body: JSON.stringify({message: "car does not exist"})
          }
    }

}

module.exports = {
    getCar: middy(getCar).use(jsonBodyParser())
  }