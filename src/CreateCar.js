const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const middy = require('@middy/core');
const jsonBodyParser = require("@middy/http-json-body-parser");

const addCar = async(event) => {
  
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const {marca, modelo, año, color, carroceria, motor, transmision, kilometraje} = event.body;
  const createdAt = new Date();
  const id = v4();

  const newCar = {
    id: id,
    marca: marca,
    modelo: modelo,
    año: año,
    color: color,
    carroceria: carroceria,
    motor: motor,
    transmision: transmision,
    kilometraje: kilometraje,
    createdAt: createdAt
  }

  await dynamodb.put({
    TableName: 'CarTable',
    Item: newCar
  }).promise();

  return{
    statusCode: 200,
    body: JSON.stringify(newCar)
  }

}

module.exports = {
  addCar: middy(addCar).use(jsonBodyParser()),
}
