import { users } from '../../../models/user.model'
import { defRoute } from 'express-scan-route'

export default defRoute({
  handler(req, res) {
    const q = req.query.q
    let matches = users
    if (Array.isArray(q)) {
      q.forEach(q => {
        const s = String(q)
        matches = matches.filter(user => user.username.includes(s))
      })
    } else if (typeof q === 'string') {
      matches = matches.filter(user => user.username.includes(q))
    }
    res.json({ matches })
  },
})
