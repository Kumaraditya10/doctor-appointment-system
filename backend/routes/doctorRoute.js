import express from 'express'
import { docotrList } from '../controllers/doctorControllers.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', docotrList)

export default doctorRouter