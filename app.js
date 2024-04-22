import express from 'express'

import routes from './routes/routes.js'

const port = process.env.PORT || 3000
const app = express();

app.use(express.json())
app.use(express.static('dist'))
app.use(routes)

app.listen(port, () => {
    console.log(`Listening to localhost:${ port }`)
})