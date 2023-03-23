import { defRoute } from 'express-scan-route'
import { users } from '../../models/user.model'

export default defRoute({
  handler(req, res) {
    let { username } = req.body
    let id = users.length + 1
    users.push({ id, username })
    res.json({ id })
  },
})
