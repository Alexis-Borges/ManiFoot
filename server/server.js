const express = require('express')
const cors = require('cors')
const tournaments = require('./routes/tournaments')
const matchsRouter = require('./routes/matchs')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/tournaments', tournaments)
app.use('/teams', require('./routes/teams'))
app.use('/matchs', matchsRouter)

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})