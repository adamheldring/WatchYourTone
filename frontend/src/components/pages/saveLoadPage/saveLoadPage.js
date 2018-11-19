import React from "react"
import "./saveLoadPage.scss"

class SaveLoadPage extends React.Component {

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
  const watchYourToneServer = process.env.WYT_SERVER_URL || "http://localhost:8080"
  console.log(`TEST: ${watchYourToneServer}/songs/`)

  // BEFORE HEROKU
  // fetch("http://localhost:8080/songs/")

  fetch(`${watchYourToneServer}/songs/`)
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
    drums: sessionStorage.getItem("drums")
  }
  console.log(newSong)

  // BEFORE HEROKU
  // fetch("http://localhost:8080/songs/", {

  const watchYourToneServer = process.env.WYT_SERVER_URL || "http://localhost:8080"
  console.log(`TEST: ${watchYourToneServer}/songs/`)
  fetch(`${watchYourToneServer}/songs/`, {
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
    console.log(`TEST: ${watchYourToneServer}/${songToLoad}`)

    // BEFORE HEROKU
    // fetch(`http://localhost:8080/songs/${songToLoad}`)

    fetch(`${watchYourToneServer}/songs/${songToLoad}`)
      .then(response => response.json())
      .then(loadedSong => {
        this.setState({
          loadedSong
        }, () => this.loadSongToSequenser())
      })

    // CREATE MESSAGE (Are you sure, do you wnat to save song first?)
  }
}

loadSongToSequenser = () => {
  const { loadedSong } = this.state
  console.log("NEWLY LOADED SONG: ", loadedSong)
  console.table(JSON.parse(loadedSong.drums))
  sessionStorage.setItem("drums", loadedSong.drums)
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

export default SaveLoadPage
