const express = require("express")
const app = express()
const config = require("config")
const PORT = config.get("PORT" || 5000)
const cors = require("cors")
const router = require("./router")

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(PORT, () => {
    console.log(`${"\x1b[33m"}START ON ${PORT}`, "\x1b[0m")
})