const express = require("express")
const app = express()
const config = require("config")
const PORT = config.get("PORT" || 5000)
const cors = require("cors")
const router = require("./router")

app.use(cors())
app.use(router)

app.listen(PORT, () => {
    console.log(`START ON ${PORT}`)
})