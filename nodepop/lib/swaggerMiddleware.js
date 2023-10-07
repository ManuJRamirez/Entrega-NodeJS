const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: 'NodePoP API',
      version:'1.0.0'
    },
    servers: [
      {
        url: 'http://127.0.0.1:3000'
      },
    ],
  },
  apis: ['./routes/**/*.js']
}


const especificacion = swaggerJSDoc(swaggerConfig);

module.exports = [swaggerUI.serve, swaggerUI.setup(especificacion)];
