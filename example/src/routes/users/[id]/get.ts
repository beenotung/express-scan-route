import { users } from '../../../models/user.model'
import { defRoute } from 'express-scan-route'

export default defRoute({
  handler: (req, res, next) => {
    let id = +req.params.id
    let user = users.find(user => user.id == id)
    if (!user) {
      res.status(404)
      res.json({ error: 'user not found' })
      return
    }
    res.json({ user })
  },
})
