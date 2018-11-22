import mongoose from "mongoose"
import bodyParser from "body-parser"
import express from "express"
import cors from "cors"

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static("public"))

app.use(cors())

const mongoServer = process.env.MONGO_URL || "mongodb://localhost/watchYourTone"

mongoose.connect(mongoServer, { useNewUrlParser: true })
mongoose.Promise = Promise

mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))


const Song = mongoose.model("Song", {
  songId: Number,
  createdDate: Date,
  songTitle: String,
  composer: String,
  drums: String,
  synth: String,
  bpm: Number,
  waveform: String
})

app.get("/", (req, res) => {
  res.send("WYT API")
})


// GET ALL SONGS ENDPOINT

app.get("/songs/", (req, res) => {
  Song.find().then(songs => {
    res.json(songs)
  })
})

// POST SONG ENDPOINT

app.post("/songs/", (req, res) => {
  const song = new Song(req.body)
  console.log("Body: ", req.body)

  song.save()
    .then(() => { res.status(201).send("Song created") })
    .catch(err => { res.status(400).send(err) })
})


// GET ONE ENDPOINT (Song details and settings)

app.get("/songs/:songId", (req, res) => {
  Song.findOne({ songId: req.params.songId } , function(err, song) {
    if (err) res.send(err)
    res.json(song)
    console.log(song)
  })
})


// LISTENING ON PORT DEPENDING ON IF RUNNING ON HEROKU OR LOCALHOST
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`WYT API LIVE listening on port ${port}`)
})
