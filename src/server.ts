import express from 'express';

const app = express();

app.get('/test', (request, response) => {
  return response.send('test get')
})

app.post('/test', (request, response) => {
  return response.send('test post')
})

app.listen(3333, () => console.log('Server up!'))