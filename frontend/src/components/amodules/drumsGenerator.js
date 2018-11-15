import Tone from "tone"

export const drumsGenerator = (drumMatrix) => {
  console.log('Hello from drums')
  console.table(drumMatrix)
  const drums = [
    new Tone.MembraneSynth(),
    new Tone.Synth(),
    new Tone.Synth()
  ]

  const gain = new Tone.Gain(0.3)
  gain.toMaster()

  drums[0].oscillator.type = "sine"
  drums[1].oscillator.type = "sawtooth"
  drums[2].oscillator.type = "square"


  drums.forEach(drum => drum.connect(gain))

  let index = 0
  Tone.Transport.bpm.value = 140
  Tone.Transport.scheduleRepeat((time) => {
    if (index % 2 === 0) drums[0].triggerAttackRelease("C1", "8n", time)
    if (index % 8 === 0) drums[1].triggerAttackRelease("C4", "8n", time)

    // drums[1].triggerAttackRelease("c7", "16n", time)
    // console.log(index)
    index++
  }, "8n")

}
