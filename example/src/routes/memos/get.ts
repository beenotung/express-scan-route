import { defRoute } from 'express-scan-route'
import { memos } from '../../models/memo.model'

export default defRoute({
  handler: (req, res, next) => {
    res.json({ memos })
  },
})
