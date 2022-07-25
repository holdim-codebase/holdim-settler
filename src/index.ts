import { server } from './server'

server.listen({
  host: '0.0.0.0',
  port: parseInt(process.env.PORT ?? '8080'),
}, ( error, address ) => {
  if (error) { console.error(error) }
  console.log(`Listening on ${address}`)
})
