const db = require("../config/db")

exports.uploadMushroom = (req, res) => {
    const { species, confidence, latitude, longitude, timestamp } = req.body
    const imageFile = req.file ? req.file.filename : null

    if (!imageFile) {
        return res.status(400).json({ status: "error", message: "Hiányzó kép" })
    }

    const imageUrl = "/uploads/" + imageFile

    const sql = `
        INSERT INTO mushroom_finds 
        (species, confidence, latitude, longitude, timestamp, image_url)
        VALUES (?, ?, ?, ?, ?, ?)
    `

    db.query(
        sql,
        [species, confidence, latitude, longitude, timestamp, imageUrl],
        (err, result) => {
            if (err) {
                console.error("DB hiba:", err)
                return res.status(500).json({ status: "error", message: "Adatbázis hiba" })
            }

            res.json({
                status: "ok",
                id: result.insertId,
                imageUrl
            })
        }
    )
}
