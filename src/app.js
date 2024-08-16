const opts = {
  schema: {
    body: {
      type: 'object',
      required: ['room', 'temperature', 'timestamp'],
      properties: {
        room: { type: 'string' },
        temperature: { type: 'number' },
        humidity: {type: 'number'},
        timestamp: {type: 'string'}
      }
    }
  }
}

async function routes (fastify, options) {
  fastify.get('/', async (request, response) => {
    return "Piweather API"
  })
  
  fastify.get('/weather/data', async (request, reply) => {
    return { hello: 'weather data' }
  })
  
  fastify.post('/weather/data', opts, async (request, reply) => {
    //add to database
    return reply.code(201).send("OK")
  })
}

export default routes;