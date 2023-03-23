import { defRoute } from 'express-scan-route'
import { memos } from '../../models/memo.model'

export default defRoute({
  handler(req, res) {
    let { content } = req.body
    let id = memos.length + 1
    memos.push({ id, content })
    res.json({ id })
  },
})
