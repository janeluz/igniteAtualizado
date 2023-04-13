import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url)
console.log(import.meta.url)
export class Database {
  #database = {}

  #persist() {
    fs.writeFile('db.json', JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.database[table] ?? []

    return data
  }
  insert(table, data) {
    if (Array.isArray(this.database[table])) {
      this.database[table].push(data)
    } else {
      this.database[table] = [data]
    }

    this.#persist()
    return data
  }
}
