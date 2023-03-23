# express-scan-route

express route scanner for directory based routing approach

[![npm Package Version](https://img.shields.io/npm/v/express-scan-route)](https://www.npmjs.com/package/express-scan-route)

## Example Folder Structure

```
src
├── models
│   ├── memo.model.ts
│   └── user.model.ts
├── routes
│   ├── memos
│   │   ├── get.ts
│   │   ├── [id]
│   │   │   ├── get.ts
│   │   │   └── patch.ts
│   │   └── post.ts
│   └── users
│       ├── get.ts
│       ├── [id]
│       │   ├── get.ts
│       │   └── patch.ts
│       ├── post.ts
│       └── search
│           └── get.ts
└── server.ts
```

## Example Usage

Example file `server.ts`:

```typescript
import express from 'express'
import { scanRoutes } from 'express-scan-route'
import { print } from 'listening-on'

async function main() {
  let app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  let router = await scanRoutes({
    entryDir: 'src/routes',
    verbose: true,
  })
  app.use(router)

  let port = 8100
  app.listen(port, () => {
    console.log('listening on port:', port)
  })
}
main().catch(e => console.error(e))
```

Complete example see [./example](./example)

## Typescript Types

```typescript
import express from 'express'

// to be used as default export
export function defRoute(input: {
  middlewares?: express.Handler[]
  handler: express.Handler
}): express.Handler[]

export function scanRoutes(dir: string): Promise<express.Router>
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
