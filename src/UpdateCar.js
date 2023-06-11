const AWS = require('aws-sdk');

const updateCar = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
  
    let updateExpression = 'set';
    const expressionAttributeValues = {};
  
    if (event.body) {
      const { marca, modelo, color, carroceria, motor, transmision, kilometraje } = JSON.parse(event.body);
  
      if (marca) {
        updateExpression += ' marca = :marca,';
        expressionAttributeValues[':marca'] = marca;
      }
  
      if (modelo) {
        updateExpression += ' modelo = :modelo,';
        expressionAttributeValues[':modelo'] = modelo;
      }
  
      if (color) {
        updateExpression += ' color = :color,';
        expressionAttributeValues[':color'] = color;
      }
  
      if (carroceria) {
        updateExpression += ' carroceria = :carroceria,';
        expressionAttributeValues[':carroceria'] = carroceria;
      }
  
      if (motor) {
        updateExpression += ' motor = :motor,';
        expressionAttributeValues[':motor'] = motor;
      }
  
      if (transmision) {
        updateExpression += ' transmision = :transmision,';
        expressionAttributeValues[':transmision'] = transmision;
      }
  
      if (kilometraje) {
        updateExpression += ' kilometraje = :kilometraje,';
        expressionAttributeValues[':kilometraje'] = kilometraje;
      }
  
      updateExpression = updateExpression.slice(0, -1); // Eliminar la coma al final
    }
  
    await dynamodb
      .update({
        TableName: 'CarTable',
        Key: {
          id: id,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      })
      .promise();
  
    const result = await dynamodb
      .get({
        TableName: 'CarTable',
        Key: {
          id: id,
        },
      })
      .promise();
  
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
};
  

module.exports = {
    updateCar
  }