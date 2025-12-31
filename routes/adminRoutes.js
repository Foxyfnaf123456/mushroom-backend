const express = require("express")
const router = express.Router()

const { 
    getPendingFinds, 
    approveFind, 
    getStats, 
    getApprovedFinds 
} = require("../controllers/adminController")

router.get("/pending", getPendingFinds)
router.post("/approve/:id", approveFind)
router.get("/stats", getStats)
router.get("/approved", getApprovedFinds)

module.exports = router
