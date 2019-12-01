import encoding from 'encoding-down'
import leveldown from 'leveldown'
import levelup from 'levelup'

export interface LevelDBItem{
    key: string;
    value: number;
}

export class LevelDB {
  static open(path: string) {
    const encoded = encoding(leveldown(path), { valueEncoding: 'json' })
    return levelup(encoded)
  }
}
