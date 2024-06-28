const express = require('express')
const { query, validationResult, matchedData } = require('express-validator')
const app = express()

app.use(express.json())
app.get('/hello', query('person').notEmpty().escape(), (req, res) => {
  const result = validationResult(req)
  if(result.isEmpty()) {
    const data = matchedData(req)
    return res.send(`hello, ${data.person}!`)
  }
  res.send({error: result.array()})
})

app.listen(3000,() => {
    console.log('app listening on port 3000')
})
