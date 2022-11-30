const express = require('express');
const serverless = require('serverless-http');
const fetch = require('node-fetch');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/characters', async (request, response) => {
  const { id } = request.query;

  let url = `https://netology-api-marvel.herokuapp.com/characters`;
  if (id) {
    url += `/${id}`;
  }

  let result = await fetch(url).then((response) => response.json());

  if (result && !result?.code) {
    if (Array.isArray(result)) {
      result = result.map((res) => ({
        id: res?.id,
        name: res?.name,
        description: res?.description,
        modified: res?.modified,
        thumbnail: res?.thumbnail,
        comics: res?.comics,
      }));
    }
    response.status(200).send(result);
  } else {
    response.status(404).send({ code: 404, message: 'Character not found' });
  }
});

module.exports.handler = serverless(app);
