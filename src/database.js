import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)
console.log(import.meta.url)
export class Database {
  #database = {}

  constructor(){
    fs.readFile(databasePath, 'utf-8')
    .then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }
  #persist() {
    fs.writeFile('db.json', JSON.stringify(this.#database))
  }

  select(table,search) {
    const data = this.#database[table] ?? []

    if(search) {
      data = data.filter(row => {
        //Object.entries para converter em array, o some vai percorrer o array e se pelo menos 1 vez a condição for true 
        return Object.entries(search).some(([key,value]) => {
          return row [key].includes(value)
        })
      })
    }

    return data
  }
  insert(table, data) {

    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()
    return data
  }
  update(table,id,data) {
    const rowIndex = this.#database[table].findIndex(row.id === id)

    if(rowIndex > -1) {
      this.#database[table][rowIndex] = {id, ...data}
      this.#persist()
    }
  }
  delete(table,id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id) 

    if(rowIndex > -1) {
      this.#database[table].splice(rowIndex,1)
      this.#persist()
    }
  }
}
