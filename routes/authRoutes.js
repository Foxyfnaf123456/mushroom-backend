const express = require("express")
const router = express.Router()
const db = require("../config/db")

router.post("/login", (req, res) => {
    const { username, password } = req.body

    const sql = "SELECT * FROM admins WHERE username = ? AND password = ?"

    db.query(sql, [username, password], (err, rows) => {
        if (err) return res.status(500).json({ error: "DB hiba" })

        if (rows.length === 0) {
            return res.status(401).json({ error: "Hibás belépési adatok" })
        }

        res.json({ status: "ok", admin: rows[0].username })
    })
})

module.exports = router
