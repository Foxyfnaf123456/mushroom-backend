const express = require("express")
const cors = require("cors")

const uploadRoutes = require("./routes/uploadRoutes")
const adminRoutes = require("./routes/adminRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()
app.use(cors())
app.use(express.json())

// statikus mappák
app.use("/uploads", express.static("uploads"))
app.use(express.static("public"))

// API útvonalak
app.use("/api", uploadRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/auth", authRoutes)

app.listen(3000, () => {
    console.log("Szerver fut a 3000-es porton")
})
