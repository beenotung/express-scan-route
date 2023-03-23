import express from 'express'
import { scanRoutes } from 'express-scan-route'
import { print } from 'listening-on'

async function main() {
  let app = express()

  app.use(express.static('public'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  let router = await scanRoutes({
    entryDir: 'src/routes',
    verbose: true,
  })
  app.use(router)

  let port = 8100
  app.listen(port, () => {
    print(port)
  })
}
main().catch(e => console.error(e))
