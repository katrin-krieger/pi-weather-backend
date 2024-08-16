"use strict";

// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Require the framework
import Fastify from "fastify";
 
import { Unauthorized } from 'http-errors'

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(import("../src/app.js"));

export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
}

  
const apiKeys = new Map()  
apiKeys.set('123456789', 'secret1')  
apiKeys.set('987654321', 'secret2')  
  
app.register(require('fastify-api-key'), {  
  getSecret: (request, keyId, callback) => {  
    const secret = apiKeys.get(keyId)  
    if (!secret) {  
      return callback(Unauthorized('Unknown client'))  
    }  
    callback(null, secret)  
  },  
})  
  
app.addHook('onRequest', async (request, reply) => {  
  try {  
    await request.apiKeyVerify()  
  } catch (err) {  
    reply.send(err)  
  }  
})  
  