const db = require("../config/db")

// PENDING LISTA
exports.getPendingFinds = (req, res) => {
    const sql = `
        SELECT * FROM mushroom_finds
        WHERE status = 'pending'
        ORDER BY timestamp DESC
    `

    db.query(sql, (err, rows) => {
        if (err) {
            console.error("DB hiba:", err)
            return res.status(500).json({ status: "error", message: "Adatbázis hiba" })
        }
        res.json(rows)
    })
}

// STATISZTIKA
exports.getStats = (req, res) => {
    const sql = `
        SELECT 
            COALESCE(corrected_species, species) AS mushroom_name,
            COUNT(*) AS count
        FROM mushroom_finds
        WHERE status = 'approved'
        GROUP BY mushroom_name
        ORDER BY count DESC
    `

    db.query(sql, (err, rows) => {
        if (err) {
            console.error("DB hiba:", err)
            return res.status(500).json({ status: "error", message: "Adatbázis hiba" })
        }
        res.json(rows)
    })
}

// APPROVED LISTA
exports.getApprovedFinds = (req, res) => {
    const sql = `
        SELECT 
            id,
            COALESCE(corrected_species, species) AS species,
            confidence,
            latitude,
            longitude,
            timestamp,
            image_url
        FROM mushroom_finds
        WHERE status = 'approved'
        ORDER BY timestamp DESC
    `

    db.query(sql, (err, rows) => {
        if (err) {
            console.error("DB hiba:", err)
            return res.status(500).json({ status: "error", message: "Adatbázis hiba" })
        }
        res.json(rows)
    })
}

// APPROVE / REJECT
exports.approveFind = (req, res) => {
    const id = req.params.id
    const { corrected_species, admin_name, action } = req.body

    let status = "approved"
    if (action === "reject") {
        status = "rejected"
    }

    const sql = `
        UPDATE mushroom_finds
        SET 
            status = ?,
            corrected_species = ?,
            approved_by = ?,
            approved_at = NOW()
        WHERE id = ?
    `

    db.query(sql, [status, corrected_species || null, admin_name || null, id], (err) => {
        if (err) {
            console.error("DB hiba:", err)
            return res.status(500).json({ status: "error", message: "Adatbázis hiba" })
        }
        res.json({ status: "ok" })
    })
}
