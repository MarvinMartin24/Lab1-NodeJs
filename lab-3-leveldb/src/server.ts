import express = require('express')
import { MetricsHandler } from './metrics'


const app = express()
const port: string = process.env.PORT || '1337'

app.set('view engine','ejs');
app.set('views', __dirname + "/view")


app.get('/', (req: any, res: any) => {
  res.render('home.ejs')
})

app.get('/hello/:name', (req: any, res: any) => {
  res.render('hello.ejs', {name: req.params.name})
})

app.get('/metrics.json', (req: any, res: any) => {
  MetricsHandler.get((err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result)
  })
})

app.use((req: any, res: any) => {
  res.status(404).send('Error 404');
});

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})
