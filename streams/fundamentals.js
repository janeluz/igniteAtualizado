// consigo ler os dados do arquivo e já consigo ir processando ele 

// process.stdin
// .pipe(process.stdout);

import { write } from 'node:fs'
import { Readable, Writable, Transform} from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1
    //retorna qual os dados dessa stream
    _read() {
        const i= this.index++
        setTimeout(()=>{
        if( i>5){
            this.push(null)
         } else {
            const buf = Buffer.from(String(i))
         this.push(buf)
         }
        }, 1000)
    }

}

class MultiplyByTenStream extends Writable{
    _write(chunk,encoding,callback) {
        console.log(Number(chunk.toString()) *10)
        callback()
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk,encoding,callback) {
        const transformed = Number(chunk.toString())* -1

        callback(null, Buffer.from(String(transformed)))
    }
}
    new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(process.stdout)


