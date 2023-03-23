import express from 'express'
import fs from 'fs'
import path from 'path'

export function defRoute(input: {
  middlewares?: express.Handler[]
  handler: express.Handler
}): express.Handler[] {
  return [...(input.middlewares || []), input.handler]
}

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export async function scanRoutes(input: {
  entryDir: string
  verbose?: boolean
  log?: typeof console.log
}): Promise<express.Router> {
  let log = input.log || console.log
  let router = express.Router()
  async function scanDir(dir: string) {
    let files = fs.readdirSync(dir)
    files.sort((a, b) => {
      if (a[0] === '[') return +1
      if (b[0] === '[') return -1
      if (a < b) return -1
      if (a > b) return +1
      return 0
    })
    for (let filename of files) {
      let file = path.join(dir, filename)
      let stat = fs.statSync(file)
      if (stat.isDirectory()) {
        scanDir(file)
        continue
      }
      if (!stat.isFile()) {
        continue
      }
      let pathname = dir
        .replace(input.entryDir, '')
        .replace(/\[/g, ':')
        .replace(/]/g, '')
      let extname = path.extname(filename)
      let method = filename.slice(0, filename.length - extname.length) as Method
      let METHOD = method.toUpperCase()
      if (input.verbose) {
        log(`Route: ${METHOD} ${pathname}`)
      }
      let m = await import(path.resolve(file))
      let handlers = m.default
      router[method](pathname, ...handlers)
    }
  }
  scanDir(input.entryDir)
  return router
}
