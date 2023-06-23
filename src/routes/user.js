import express from 'express'

const router = express.Router()

router.get('/', (req,res) => {
  return res.json(Object.values(req.context.models.users));
})
  
router.get('/:userId', (req,res) => {
  return res.send(req.context.models.users[req.params.userId]);
})

export default router