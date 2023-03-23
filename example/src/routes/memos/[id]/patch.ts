import { memos } from '../../../models/memo.model'
import { defRoute } from 'express-scan-route'

export default defRoute({
  handler: (req, res, next) => {
    let id = +req.params.id
    let memo = memos.find(memo => memo.id == id)
    if (!memo) {
      res.status(404)
      res.json({ error: 'memo not found' })
      return
    }
    Object.assign(memo, req.body)
    res.json({ details: 'updated memo' })
  },
})
