import { LevelDB } from './leveldb'
import { LevelDBItem } from './leveldb'
import WriteStream from 'level-ws'


export class Metric {
  public timestamp: string
  public value: number

  constructor(ts: string, v: number) {
    this.timestamp = ts
    this.value = v
  }
}

export class MetricsHandler {

    private db: any
    constructor(dbPath: string) {
        this.db = LevelDB.open(dbPath)
    }

    public save(
        key: string,
        metrics: Metric[],
        callback: (error: Error | null) => void
    ) {
      const stream = WriteStream(this.db)
      stream.on('error', callback)
      stream.on('close', callback)
      metrics.forEach((m: Metric) => {
        stream.write({ key: `metric:${key}:${m.timestamp}`, value: m.value })
      })
      stream.end()
    }

    public getAll(
        callback: (error: Error | null, result: any) => void
    ){
        let metrics: Metric[] = []
        const rs = this.db.createReadStream()
        rs.on('data', function (data) {
            console.log(data.key, '=', data.value)
            const timestamp = data.key.split(':')[2]
            let metric: Metric = new Metric(timestamp, data.value)
            metrics.push(metric)

        })
        rs.on('error', function (err) {
            console.log('Oh my!', err)
            callback(err, null)

        })
        rs.on('close', function () {
            console.log('Stream closed')
        })
        rs.on('end', function () {
            console.log('Stream ended')
            callback(null, metrics)
        })
    }

    public getOne(
        key: string,
        callback: (error: Error | null, result: any) => void
    ){
        let metrics: Metric[] = []
        const rs = this.db.createReadStream()

        rs.on('data', function (data) {
            if (key === data.key.split(':')[1]){
                const timestamp = data.key.split(':')[2]
                const value = data.value;
                let metric: Metric = new Metric(timestamp,data.value)
                metrics.push(metric)
            }
        })
        rs.on('error', function (err) {
            console.log('Oh my!', err)
            callback(err, null)

        })
        rs.on('close', function () {
            console.log('Stream closed')
        })
        rs.on('end', function (err) {
            console.log('Stream ended')
            callback(null, metrics)
        })

    }

    public deleteOne(
        key : number,
        callback: (error:Error | null, result:any) => void
    ){
        let dataDeleted : Metric[] = []
        const rs = this.db.createReadStream()
        rs.on('data', (data) => {
            if(key === data.key.split(":")[1]) {

              const timestamp = data.key.split(":")[2]
              let metric: Metric = new Metric(timestamp,data.value)
              dataDeleted.push(metric)

              this.db.del(data.key)
            }
        })
        rs.on('err', function (err) {
          callback(err, key)
        })
        rs.on('close', function () {
          console.log('Stream closed')
        })
        rs.on('end', function () {
          console.log('Stream ended')
          callback(null, dataDeleted)
        })

    }

    public deleteAll(
        callback: (error:Error | null, result:any) => void){
        let dataDeleted : Metric[] = []

        const rs = this.db.createReadStream()
        rs.on('data', (data) => {

            const timestamp = data.key.split(":")[2]
            let metric: Metric = new Metric(timestamp,data.value)
            dataDeleted.push(metric)

            this.db.del(data.key)

        })
        rs.on('err', function (err) {
            callback(err, null)
        })
        rs.on('close', function () {
            console.log('Stream closed')
        })
        rs.on('end', function () {
            console.log('Stream ended')
            callback(null, dataDeleted)
        })
    }
}
