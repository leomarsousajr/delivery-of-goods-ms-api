/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/interfaces/http/presentations/orders/OrdersController')} ctx.ordersController
 * @param {import('src/domain/constants/HttpConstants')} ctx.httpConstants
 * @param {import('src/interfaces/http/schemas/orders/OrdersSchema')} ctx.ordersSchema
 */
module.exports = ({ ordersController, httpConstants, ordersSchema }) => [
  {
    method: 'get',
    path: '/orders',
    validation: {
      query: ordersSchema.query
    },
    handler: ordersController.findAll,
    responses: {
      [httpConstants.code.OK]: {
        description: 'Successful operation'
      },
      [httpConstants.code.BAD_REQUEST]: {
        description: 'Failed validation',
        schema: ordersSchema.responses[400]
      }
    },
    description: 'Busca todos os pedidos',
    summary: 'Busca todos os pedidos',
    tags: ['Orders']
  },
  {
    method: 'post',
    path: '/orders',
    validation: {
      body: ordersSchema.body
    },
    handler: ordersController.create,
    responses: {
      [httpConstants.code.CREATED]: {
        description: 'Successful operation'
      },
      [httpConstants.code.BAD_REQUEST]: {
        description: 'Failed validation',
        schema: ordersSchema.responses[400]
      }
    },
    description: 'Criar um Pedido',
    summary: 'Criar um Pedido',
    tags: ['Orders']
  }
];
