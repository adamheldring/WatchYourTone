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
  // Load songlist from database to display in latest field
  this.loadSongList()
}

loadSongList() {
  console.log("Loading saved songlist...")
  console.log(`TEST: ${WYT_SERVER_URL}/songs/`)

  // BEFORE HEROKU
  // fetch("http://localhost:8080/songs/")

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
  this.setState({
    [e.target.name]: e.target.value
  })
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
    synth: sessionStorage.getItem("synth")
  }
  console.log(newSong)

  // BEFORE HEROKU
  // fetch("http://localhost:8080/songs/", {

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
      this.loadSongList()
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

    const watchYourToneServer = process.env.WYT_SERVER_URL || "http://localhost:8080"
    console.log(`TEST: ${WYT_SERVER_URL}/songs/${songToLoad}`)

    // BEFORE HEROKU
    // fetch(`http://localhost:8080/songs/${songToLoad}`)

    fetch(`${WYT_SERVER_URL}/songs/${songToLoad}`)
      .then(response => response.json())
      .then(loadedSong => {
        this.setState({
          loadedSong
        }, () => this.loadSongToStorage())
      })

    // CREATE MESSAGE (Are you sure, do you wnat to save song first?)
  }
}

loadSongToStorage = () => {
  const { loadedSong } = this.state
  console.log("NEWLY LOADED SONG: ", loadedSong)
  console.table(JSON.parse(loadedSong.drums))
  console.table(JSON.parse(loadedSong.synth))
  sessionStorage.setItem("drums", loadedSong.drums)
  sessionStorage.setItem("synth", loadedSong.synth)
  this.props.loadNewSong(true)
}


render() {
  const { songTitle, composer, songList } = this.state
  return (
    <div className="page-wrapper page-wrapper--saveLoadPage">
      <h2 className="composerPage-headline">SAVE & LOAD</h2>
      <div className="saveForm-container">
        <h2>SAVE SONG</h2>
        <form id="postingForm" className="postingForm" onSubmit={this.submitSave}>
          <input className="formInput formInput__field" value={songTitle} type="text" placeholder="Song Title" name="songTitle" required onChange={this.handleFormChange} />
          <input className="formInput formInput__field" value={composer} type="text" placeholder="Composer Name" name="composer" required onChange={this.handleFormChange} />
          <input className="submitButton formInput__button" type="submit" value="Save" />
        </form>
      </div>

      <div className="loadForm-container">
        <h2>LOAD SONG</h2>
        <form id="loadingForm" className="loadingForm" onSubmit={this.submitLoad}>
          <select
            name="songToLoad"
            className="formInput formInput formInput__select"
            onChange={this.handleFormChange}
            size="10">
            {songList.map((song, index) => (
              <option
                key={index}
                value={song.songId}
                >{song.songTitle}</option>
            ))}
          </select>
          <input className="submitButton formInput__button" type="submit" value="Load" />
        </form>
      </div>

    </div>
  )
}

}

export default SaveLoad
