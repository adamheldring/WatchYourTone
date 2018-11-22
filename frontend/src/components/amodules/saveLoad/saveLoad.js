import React from "react"
import "./saveLoad.scss"
import { WYT_SERVER_URL } from "../../constants"
class SaveLoad extends React.Component {

state = {
  songTitle: "",
  composer: "",
  songList: [],
  songToLoad: "",
  loadedSong: ""
}

componentDidMount() {
  // Load songlist from database to display in song field
  this.loadSongList()
}

loadSongList() {
  console.log("Loading saved songlist...")
  console.log(`TEST: ${WYT_SERVER_URL}/songs/`)

  fetch(`${WYT_SERVER_URL}/songs/`)
    .then(response => response.json())
    .then(songList => {
      this.setState({
        songList
      }, () => console.log(this.state.songList))
    })
}

handleFormChange = e => {
  console.log(e.target, e.target.value)
  if (e.target.type === "text") {
    this.setState({
      [e.target.name]: e.target.value.toUpperCase()
    })
  } else {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
}

clearFields= () => {
  this.setState({
    songTitle: "",
    composer: ""
  })
}

submitSave = e => {
  e.preventDefault()
  const { songTitle, composer } = this.state
  const newSong = {
    songId: Date.now(),
    createdDate: new Date(),
    songTitle,
    composer,
    drums: sessionStorage.getItem("drums"),
    synth: sessionStorage.getItem("synth"),
    bpm: sessionStorage.getItem("bpm"),
    waveform: sessionStorage.getItem("waveform")
  }
  console.log(newSong)

  console.log(`TEST: ${WYT_SERVER_URL}/songs/`)
  fetch(`${WYT_SERVER_URL}/songs/`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "Post",
    body: JSON.stringify(newSong)
  })
    .then(data => {
      console.log("Request success: ", data)
      sessionStorage.setItem("loadedSongTitle", songTitle)
      sessionStorage.setItem("loadedSongComposer", composer)
      this.loadSongList()
      this.props.loadNewSong(true)
      this.clearFields()
    })
    .catch(error => {
      console.log("Request failure: ", error)
      alert(error)
    })
}

submitLoad = e => {
  e.preventDefault()
  const { songToLoad } = this.state
  if (!songToLoad) {
    console.log("Choose a song to load...")
  } else {
    console.log(`Loading song with id: ${songToLoad}...`)

    // const watchYourToneServer = process.env.WYT_SERVER_URL || "http://localhost:8080"
    console.log(`TEST: ${WYT_SERVER_URL}/songs/${songToLoad}`)

    fetch(`${WYT_SERVER_URL}/songs/${songToLoad}`)
      .then(response => response.json())
      .then(loadedSong => {
        this.setState({
          loadedSong
        }, () => {
          this.loadSongToStorage()
          console.log(this.state)
        })
      })

    // CREATE MESSAGE (Are you sure, do you wnat to save song first?)
  }
}

loadSongToStorage = () => {
  const { loadedSong } = this.state
  console.log("NEWLY LOADED SONG: ", loadedSong)
  console.table(JSON.parse(loadedSong.drums))
  console.table(JSON.parse(loadedSong.synth))
  console.log(loadedSong.bpm)
  console.log(loadedSong.waveform)
  console.log(loadedSong.songTitle)
  console.log(loadedSong.composer)

  sessionStorage.setItem("drums", loadedSong.drums)
  sessionStorage.setItem("synth", loadedSong.synth)
  sessionStorage.setItem("bpm", loadedSong.bpm)
  sessionStorage.setItem("waveform", loadedSong.waveform)
  sessionStorage.setItem("loadedSongTitle", loadedSong.songTitle)
  sessionStorage.setItem("loadedSongComposer", loadedSong.composer)

  this.props.loadNewSong(true)
}

render() {
  const { songTitle, composer, songList } = this.state
  return (
    <div className="page-wrapper page-wrapper--saveLoad">
      <div className="saveForm-container">
        <h1 className="composerPage-headline composerPage-headline--saveLoad">SAVE:</h1>
        <form id="postingForm" className="postingForm" onSubmit={this.submitSave}>
          <input className="formInput formInput__field" value={songTitle} type="text" placeholder="SONG TITLE" name="songTitle" required onChange={this.handleFormChange} />
          <input className="formInput formInput__field" value={composer} type="text" placeholder="COMPOSER NAME" name="composer" required onChange={this.handleFormChange} />
          <input className="submitButton formInput__button" type="submit" value="Save" />
        </form>
      </div>

      <div className="loadForm-container">
        <h1 className="composerPage-headline composerPage-headline--saveLoad">LOAD:</h1>
        <form id="loadingForm" className="loadingForm" onSubmit={this.submitLoad}>
          <select
            name="songToLoad"
            className="formInput formInput formInput__select"
            onChange={this.handleFormChange}
            size="5">
            {songList
              .sort((a,b)=>(a.songId<b.songId) ? 1 : ((b.songId<a.songId) ? -1 : 0))
              .map((song, index) => (
              <option
                key={index}
                value={song.songId}
                >{`${song.songTitle.toUpperCase()} (${song.composer.toUpperCase()})`}</option>
            ))}
          </select>
          <input className="submitButton formInput__button" type="submit" value="Load" />
        </form>– 
      </div>

    </div>
  )
}

}

export default SaveLoad
