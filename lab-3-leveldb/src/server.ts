import express = require('express')
import { MetricsHandler } from './metrics'
import bodyparser = require('body-parser')


const app = express()
const path = require('path')
const port: string = process.env.PORT || '1337'
const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')


app.set('view engine','ejs');
app.set('views', __dirname + "/../view")
app.use(express.static(path.join(__dirname, 'public')))


app.use(bodyparser.json())
app.use(bodyparser.urlencoded())



app.get('/', (req: any, res: any) => {
  res.render('home.ejs')
})

app.get('/hello/:name', (req: any, res: any) => {
  res.render('hello.ejs', {name: req.params.name})
})


app.get('/metrics/', (req: any, res: any) => {
  dbMet.getAll((err: Error | null, result: any) => {
    if (err) throw err
    res.status(200).json(result)
    res.end()
  })
})

app.get('/metrics/:id', (req: any, res: any) => {
  dbMet.getOne(req.params.id, (err: Error | null, result: any) => {
    if (err) throw err
    res.status(200).json(result)
    res.end()
  })
})

app.delete('/metrics/:id', (req: any, res: any) => {
  dbMet.deleteOne(req.params.id, (err: Error | null, result: any) => {
    if (err) throw err
    res.status(200).json(result)
    res.end()
  })
})

app.delete('/metrics/', (req: any, res: any) => {
  dbMet.deleteAll((err: Error | null, result: any) => {
    if (err) throw err
    res.status(200).json(result)
    res.end()
  })
})


app.post('/metrics/:id', (req: any, res: any) => {
  dbMet.save(req.params.id, req.body, (err: Error | null) => {
    if (err) throw err
    res.status(200).send('ok')
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
