export const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

export const getQuoteById = (arr, id) => {
  return arr.filter(quote => { return quote.id === id })
}