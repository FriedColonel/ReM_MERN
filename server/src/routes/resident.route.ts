import express from 'express'
import {
  createResident,
  editResident,
  filterResidentChuHo,
  getResidentById,
  getResidentsByPage
} from '~/controllers/residents.controller'

const router = express.Router()

router.route('/').get(getResidentsByPage).post(createResident)

router.route('/chu-ho').get(filterResidentChuHo)

router.route('/:id').get(getResidentById).put(editResident)
export default router
