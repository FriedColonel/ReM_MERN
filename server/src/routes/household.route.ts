import express from 'express'
import {
  createHousehold,
  getHouseholdById,
  getHouseholdByPage,
  editHousehold,
  changeLog
} from '~/controllers/household.controller'

const router = express.Router()

router.route('/').get(getHouseholdByPage).post(createHousehold)
router.route('/:id/lich-su').get(changeLog)
router.route('/:id').get(getHouseholdById).put(editHousehold)

export default router
