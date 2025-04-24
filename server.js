const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes', (req, res, next) => {
  const person = req.query.person
  if (person) {
    const personQuotes = quotes.filter(quote => { return quote.person === person })
    res.send({ quotes: personQuotes })
    return
  }
  res.send({ quotes: quotes })
})

app.get('/api/quotes/random', (req, res, next) => {
  const quote = { quote: getRandomElement(quotes) }
  res.send(quote)
})

app.post('/api/quotes', (req, res, next) => {
  const data = req.query
  console.log(data)
  if (data.quote && data.person) {
    const quote = {
      quote: data.quote,
      person: data.person
    }
    quotes.push(quote)
    res.status(201).send({ quote: quote })
  } else {
    res.status(400).send()
  }
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})