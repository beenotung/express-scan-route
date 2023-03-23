import { defRoute } from 'express-scan-route'
import { users } from '../../models/user.model'

export default defRoute({
  handler: (req, res, next) => {
    res.json({ users })
  },
})
