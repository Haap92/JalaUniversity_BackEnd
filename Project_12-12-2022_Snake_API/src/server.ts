import express from 'express'
import { routes } from './API/routes/routes'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require('body-parser')

const app = express()
const port = 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)

app.listen(port, () => console.log(`Server listening on port ${port}`))