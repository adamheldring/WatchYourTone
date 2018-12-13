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
  fetch(`${WYT_SERVER_URL}/songs/`)
    .then(response => response.json())
    .then(songList => {
      this.setState({
        songList
      })
    })
}

handleFormChange = e => {
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
    fetch(`${WYT_SERVER_URL}/songs/${songToLoad}`)
      .then(response => response.json())
      .then(loadedSong => {
        this.setState({
          loadedSong
        }, () => {
          this.loadSongToStorage()
        })
      })
  }
}

loadSongToStorage = () => {
  const { loadedSong } = this.state

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
          <input className="submitButton formInput__button formInput__button--save" type="submit" value="SAVE" />
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
          <input className="submitButton formInput__button formInput__button--load" type="submit" value="LOAD" />
        </form>– 
      </div>

    </div>
  )
}

}

export default SaveLoad
