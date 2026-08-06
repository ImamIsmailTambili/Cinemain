import express from 'express'
import { myOrder, getOrder, cancelOrder, pilihKursi, gantiKursi, pembayaran, deletePembayaran } from '../controllers/pembayaranController.js'

const router = express.Router()

router.post("/", myOrder)
router.get("/getOrder", getOrder)
router.post("/cancel", cancelOrder)
router.post("/pilihKursi", pilihKursi)
router.post("/gantiKursi", gantiKursi)
router.post("/pembayaran", pembayaran)
router.post("/deletePembayaran", deletePembayaran)

export default router