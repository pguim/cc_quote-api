import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();

import { quotes } from './data.js';
import { getRandomElement, getQuoteById } from './utils.js';

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
  if (data.quote && data.person) {
    const quote = {
      id: uuidv4(),
      quote: data.quote,
      person: data.person
    }
    quotes.push(quote)
    res.status(201).send({ quote: quote })
  } else {
    res.status(400).send()
  }
})

app.put('/api/quotes/:id', (req, res, next) => {

  const { id } = req.params
  const { quote, person } = req.query

  if (id && quote && person) {

    const [modifQuote] = getQuoteById(quotes, id)
    if (Object.keys(modifQuote)) {
      modifQuote.quote = quote
      modifQuote.person = person
      res.send(modifQuote)
    } else {
      res.status(404).send()
    }
  } else {
    res.status(400).send()
  }
})

app.delete('/api/quotes/:id', (req, res, next) => {
  const { id } = req.params
  if (id) {
    const newQuotes = quotes.filter(quote => { return quote.id !== id })
    res.send(newQuotes)
  } else {
    res.status(400).send()
  }
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})