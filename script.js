/* global Synth */

// html variables
const octavePara = document.getElementById('octavePara');
const drumNoteContainer = document.getElementById('drumNoteContainer');
const volumeSlider = document.getElementById('volumeSlider');

// synth settins
Synth.setSampleRate(20000);
const piano = Synth.createInstrument('piano');
Synth.setVolume(0.5);

// global objects
const keysDown = {};
let loop1 = {};
let loop2 = {};
const drumBeats = {};

// global variables
let octaveValue = 3;
let recording1 = false;
let recording2 = false;
let exactTime = 0;
let playing = false;
let loopBeatCounter = 32;
let previousLoopBeatCounter = 31;
let playing1 = false;
let playing2 = false;
const tempo = 60;
const quarterBeat = 125;
let start = 0;
let time = -125;
let cyclesCompleted = 3;
let beat = 32;
let microSecondCounter = 0;
let previousBeat = 31;
let microSeconds;
let diff = 0;


function playKeyboardNote(note, octave, duration, div) {
  // if the key isn't currently pressed down, mark key as pressed and call note to be played
  if (div && keysDown[div.id] !== true) {
    keysDown[div.id] = true;
    div.classList.add('pressedKey');
    piano.play(note, octave, duration);
    // check if recording, then if so, save time of note
    if (recording1 === true) {
      if (loop1[exactTime]) {
        loop1[exactTime].push([note, octave]);
      } else {
        loop1[exactTime] = [
          [note, octave],
        ];
      }
    } else if (recording2 === true) {
      if (loop2[exactTime]) {
        loop2[exactTime].push([note, octave]);
      } else {
        loop2[exactTime] = [
          [note, octave],
        ];
      }
    }
    // remove styling for pressed key after 0.1sec
    setTimeout(() => {
      div.classList.remove('pressedKey');
    }, 100);
  }
}

// mark key as no longer playing
function playedKeyUp(noteName) {
  keysDown[noteName] = false;
}

// change octave
function changeOctave(upDown) {
  if (upDown === 'up' && octaveValue < 7) {
    octaveValue += 1;
  } else if (upDown === 'down' && octaveValue > 0) {
    octaveValue -= 1;
  }
  octavePara.innerHTML = octaveValue;
}

// change octaves with arrow keys
$(document).on('keydown', (e) => {
  if (e.keyCode === 38 || e.keyCode === 39) {
    changeOctave('up');
  }
  if (e.keyCode === 37 || e.keyCode === 40) {
    changeOctave('down');
  }
});

// listener for keypresses, both capital and lowercase. On keypress start play note function.
$(document).on('keypress', (e) => {
  console.log(`keydown ${e.keyCode}`);
  if (e.keyCode === 97 || e.keyCode === 65) {
    playKeyboardNote('C', octaveValue, 2, document.getElementById('C3'));
  }
  if (e.keyCode === 115 || e.keyCode === 83) {
    playKeyboardNote('D', octaveValue, 2, document.getElementById('D3'));
  }
  if (e.keyCode === 100 || e.keyCode === 68) {
    playKeyboardNote('E', octaveValue, 2, document.getElementById('E3'));
  }
  if (e.keyCode === 102 || e.keyCode === 70) {
    playKeyboardNote('F', octaveValue, 2, document.getElementById('F3'));
  }
  if (e.keyCode === 103 || e.keyCode === 71) {
    playKeyboardNote('G', octaveValue, 2, document.getElementById('G3'));
  }
  if (e.keyCode === 104 || e.keyCode === 72) {
    playKeyboardNote('A', octaveValue, 2, document.getElementById('A3'));
  }
  if (e.keyCode === 106 || e.keyCode === 74) {
    playKeyboardNote('B', octaveValue, 2, document.getElementById('B3'));
  }
  if (e.keyCode === 119 || e.keyCode === 87) {
    playKeyboardNote('C#', octaveValue, 2, document.getElementById('C#3'));
  }
  if (e.keyCode === 101 || e.keyCode === 69) {
    playKeyboardNote('D#', octaveValue, 2, document.getElementById('D#3'));
  }
  if (e.keyCode === 116 || e.keyCode === 84) {
    playKeyboardNote('F#', octaveValue, 2, document.getElementById('F#3'));
  }
  if (e.keyCode === 121 || e.keyCode === 89) {
    playKeyboardNote('G#', octaveValue, 2, document.getElementById('G#3'));
  }
  if (e.keyCode === 117 || e.keyCode === 85) {
    playKeyboardNote('A#', octaveValue, 2, document.getElementById('A#3'));
  }
  if (e.keyCode === 107 || e.keyCode === 75) {
    playKeyboardNote('C', octaveValue + 1, 2, document.getElementById('C4'));
  }
  if (e.keyCode === 108 || e.keyCode === 76) {
    playKeyboardNote('D', octaveValue + 1, 2, document.getElementById('D4'));
  }
  if (e.keyCode === 186 || e.keyCode === 59) {
    playKeyboardNote('E', octaveValue + 1, 2, document.getElementById('E4'));
  }
  if (e.keyCode === 222 || e.keyCode === 39) {
    playKeyboardNote('F', octaveValue + 1, 2, document.getElementById('F4'));
  }
  if (e.keyCode === 111 || e.keyCode === 79) {
    playKeyboardNote('C#', octaveValue + 1, 2, document.getElementById('C#4'));
  }
  if (e.keyCode === 112 || e.keyCode === 80) {
    playKeyboardNote('D#', octaveValue + 1, 2, document.getElementById('D#4'));
  }
  if (e.keyCode === 90 || e.keyCode === 122) {
    console.log('c chord');
    playKeyboardNote('C', octaveValue, 2, document.getElementById('C3'));
    playKeyboardNote('E', octaveValue, 2, document.getElementById('E3'));
    playKeyboardNote('G', octaveValue, 2, document.getElementById('G3'));
  }
  if (e.keyCode === 88 || e.keyCode === 120) {
    console.log('dm chord');
    playKeyboardNote('D', octaveValue, 2, document.getElementById('D3'));
    playKeyboardNote('F', octaveValue, 2, document.getElementById('F3'));
    playKeyboardNote('A', octaveValue, 2, document.getElementById('A3'));
  }
  if (e.keyCode === 99 || e.keyCode === 67) {
    console.log('em chord');
    playKeyboardNote('E', octaveValue, 2, document.getElementById('E3'));
    playKeyboardNote('G', octaveValue, 2, document.getElementById('G3'));
    playKeyboardNote('B', octaveValue, 2, document.getElementById('B3'));
  }
  if (e.keyCode === 86 || e.keyCode === 118) {
    console.log('F chord');
    playKeyboardNote('F', octaveValue, 2, document.getElementById('F3'));
    playKeyboardNote('A', octaveValue, 2, document.getElementById('A3'));
    playKeyboardNote('C', octaveValue + 1, 2, document.getElementById('C4'));
  }
  if (e.keyCode === 66 || e.keyCode === 98) {
    console.log('G chord');
    playKeyboardNote('G', octaveValue, 2, document.getElementById('G3'));
    playKeyboardNote('B', octaveValue, 2, document.getElementById('B3'));
    playKeyboardNote('D', octaveValue + 1, 2, document.getElementById('D4'));
  }
  if (e.keyCode === 78 || e.keyCode === 110) {
    console.log('Am chord');
    playKeyboardNote('A', octaveValue, 2, document.getElementById('A3'));
    playKeyboardNote('C', octaveValue + 1, 2, document.getElementById('C4'));
    playKeyboardNote('E', octaveValue + 1, 2, document.getElementById('E4'));
  }
  if (e.keyCode === 77 || e.keyCode === 109) {
    console.log('D dim chord');
    playKeyboardNote('B', octaveValue, 2, document.getElementById('B3'));
    playKeyboardNote('D', octaveValue + 1, 2, document.getElementById('D4'));
    playKeyboardNote('F', octaveValue + 1, 2, document.getElementById('F4'));
  }
});

// listen for keyup, start playedKeyUp function, that marks the note as no-longer being played.
$(document).on('keyup', (e) => {
  console.log(`up ${e.keyCode}`);
  if (e.keyCode === 97 || e.keyCode === 65) {
    playedKeyUp('C3');
  }
  if (e.keyCode === 115 || e.keyCode === 83) {
    playedKeyUp('D3');
  }
  if (e.keyCode === 100 || e.keyCode === 68) {
    playedKeyUp('E3');
  }
  if (e.keyCode === 102 || e.keyCode === 70) {
    playedKeyUp('F3');
  }
  if (e.keyCode === 103 || e.keyCode === 71) {
    playedKeyUp('G3');
  }
  if (e.keyCode === 104 || e.keyCode === 72) {
    playedKeyUp('A3');
  }
  if (e.keyCode === 106 || e.keyCode === 74) {
    playedKeyUp('B3');
  }
  if (e.keyCode === 119 || e.keyCode === 87) {
    playedKeyUp('C#3');
  }
  if (e.keyCode === 101 || e.keyCode === 69) {
    playedKeyUp('D#3');
  }
  if (e.keyCode === 116 || e.keyCode === 84) {
    playedKeyUp('F#3');
  }
  if (e.keyCode === 121 || e.keyCode === 89) {
    playedKeyUp('G#3');
  }
  if (e.keyCode === 117 || e.keyCode === 85) {
    playedKeyUp('A#3');
  }
  if (e.keyCode === 107 || e.keyCode === 75) {
    playedKeyUp('C4');
  }
  if (e.keyCode === 108 || e.keyCode === 76) {
    playedKeyUp('D4');
  }
  if (e.keyCode === 186 || e.keyCode === 59) {
    playedKeyUp('E4');
  }
  if (e.keyCode === 222 || e.keyCode === 39) {
    playedKeyUp('F4');
  }
  if (e.keyCode === 111 || e.keyCode === 79) {
    playedKeyUp('C#4');
  }
  if (e.keyCode === 112 || e.keyCode === 80) {
    playedKeyUp('D#4');
  }
  if (e.keyCode === 90 || e.keyCode === 122) {
    console.log('c chord');
    playedKeyUp('C3');
    playedKeyUp('E3');
    playedKeyUp('G3');
  }
  if (e.keyCode === 88 || e.keyCode === 120) {
    console.log('dm chord');
    playedKeyUp('D3');
    playedKeyUp('F3');
    playedKeyUp('A3');
  }
  if (e.keyCode === 99 || e.keyCode === 67) {
    console.log('em chord');
    playedKeyUp('E3');
    playedKeyUp('G3');
    playedKeyUp('B3');
  }
  if (e.keyCode === 86 || e.keyCode === 118) {
    console.log('F chord');
    playedKeyUp('F3');
    playedKeyUp('A3');
    playedKeyUp('C4');
  }
  if (e.keyCode === 66 || e.keyCode === 98) {
    console.log('G chord');
    playedKeyUp('G3');
    playedKeyUp('B3');
    playedKeyUp('D4');
  }
  if (e.keyCode === 78 || e.keyCode === 110) {
    console.log('Am chord');
    playedKeyUp('A3');
    playedKeyUp('C4');
    playedKeyUp('E4');
  }
  if (e.keyCode === 77 || e.keyCode === 109) {
    console.log('D dim chord up');
    playedKeyUp('B3');
    playedKeyUp('D4');
    playedKeyUp('F4');
  }
});

// sets recording as on or off on both loops. Called by HTML.
function toggleRecord(div, loopNum) {
  console.log('toggle recording');
  if (loopNum === 1) {
    if (recording1 === false) {
      recording1 = true;
      div.children[0].classList.add('recorderOn');
    } else {
      recording1 = false;
      div.children[0].classList.remove('recorderOn');
    }
  }
  if (loopNum === 2) {
    if (recording2 === false) {
      recording2 = true;
      div.children[0].classList.add('recorderOn');
    } else {
      recording2 = false;
      div.children[0].classList.remove('recorderOn');
    }
  }
}

// this is called constantly when loop is playing. It check which loop is playing, and if that corresponding 'loop object' has a note set for exact time it was called.
function checkForRecorded() {
  if (playing1 === true) {
    if (loop1[exactTime]) {
      for (let i = 0; i < loop1[exactTime].length; i += 1) {
        piano.play(loop1[exactTime][i][0], loop1[exactTime][i][1], 2);
      }
    }
  }
  if (playing2 === true) {
    if (loop2[exactTime]) {
      for (let i = 0; i < loop2[exactTime].length; i += 1) {
        piano.play(loop2[exactTime][i][0], loop2[exactTime][i][1], 2);
      }
    }
  }
}

// This is called constantly when loop is playing. if there is are beats in the drumBeats object for the current beat, it is played.
function checkForDrumBeat() {
  if (drumBeats[beat]) {
    for (let i = 0; i < drumBeats[beat].length; i += 1) {
      // this loop increases until it finds an audio node in drumnotecontainer that isn't playing. (this is done to prevent the need to constantly create new nodes, and prevent memory leaks)
      let j = 0;
      while (!drumNoteContainer.children[j].paused && j < 20) {
        j += 1;
      }
      drumNoteContainer.children[j].src = `sounds/${drumBeats[beat][i]}.wav`;
      drumNoteContainer.children[j].play();
    }
  }
}

// this function is call about every quarter beat. And starts a counter to find the exact time notes are played.
function increaseMicroSeconds() {
  clearInterval(microSeconds);
  microSecondCounter = 0;
  microSeconds = window.setInterval(() => {
    microSecondCounter += 1;
    exactTime = (beat * quarterBeat) + (cyclesCompleted * quarterBeat * 32) + microSecondCounter;
    //Notes are checked for every microSeconds
    checkForRecorded();
  }, 1);
  // drum beats are checked for every querter beat.
  if (beat % 4 === 0) {
    previousLoopBeatCounter = loopBeatCounter;
    loopBeatCounter += 1;

    if (loopBeatCounter === 33) {
      loopBeatCounter = 1;
    }
    // progress bar updated
    document.getElementById(`beat__${previousLoopBeatCounter}`).classList.remove('highlightBeat');
    document.getElementById(`beat__${loopBeatCounter}`).classList.add('highlightBeat');
  }


  if (playing === true) {
    checkForDrumBeat();
    previousBeat = beat - 1;
    if (beat === 1) {
      previousBeat = 32;
    }
    // drum machine bar updated
    document.getElementById(`drum__${previousBeat}`).classList.remove('highlightBeat');
    document.getElementById(`drum__${beat}`).classList.add('highlightBeat');
  }
}

// this function is called every 125 microseconds. If there is a difference between when it is call and when it should be called. It delays the next time it is called by the difference. This keeps the drum machine on beat.
function increaseByQuarterBeat() {
  time += 125;
  // using the browser to retreive the accurate time
  diff = (new Date().getTime() - start) - time;
  if (playing1 === true || playing2 === true) {
    window.setTimeout(increaseByQuarterBeat, (125 - diff));
    if (time % quarterBeat === 0) {
      increaseMicroSeconds();
      beat += 1;

      // a cycle is a 33 beats completed.
      if (beat === 33) {
        beat = 1;
        cyclesCompleted += 1;
        if (cyclesCompleted === 4) {
          cyclesCompleted = 0;
        }
      }
    }
  }
}

// this function resets values once called, to be ready for the next time play is called.
function stop() {
  time = 0;
  start = 0;
  cyclesCompleted = 3;
  diff = 0;
  document.getElementById(`beat__${loopBeatCounter}`).classList.remove('highlightBeat');
  document.getElementById(`drum__${previousBeat + 1}`).classList.remove('highlightBeat');
  beat = 31;
  loopBeatCounter = 32;
  previousLoopBeatCounter = 31;
}

// called by HTML.
function togglePlay(div, loopNum) {
  console.log('togglePlay');
  //Checks which play was pressed, updates styling, and marks are playing or not playing.
  if (loopNum === 1) {
    if (playing1 === false) {
      div.children[0].classList.add('playBtnOn');
      div.children[1].children[0].setAttribute('class', 'fa fa-stop');
      playing1 = true;
    } else {
      playing1 = false;
      div.children[0].classList.remove('playBtnOn');
      div.children[1].children[0].setAttribute('class', 'fa fa-play');
    }
  // Again checks which play was pressed, updates styling, and marks are playing or note playing.
  } else if (loopNum === 2) {
    if (playing2 === false) {
      div.children[0].classList.add('playBtnOn');
      div.children[1].children[0].setAttribute('class', 'fa fa-stop');
      playing2 = true;
    } else {
      playing2 = false;
      div.children[0].classList.remove('playBtnOn');
      div.children[1].children[0].setAttribute('class', 'fa fa-play');
    }
  }

  // set starting values and start playing using increaseByQuarterBeat function.
  if (playing === false) {
    start = new Date().getTime();
    time = -125;
    increaseByQuarterBeat('secondary');
    playing = true;
  // reset values if playing is stoped
  } else if (playing1 === false && playing2 === false) {
    playing = false;
    stop();
    clearInterval(microSeconds);
    microSecondCounter = 0;
  }
}

// called by HTML. add or removes the type and timing of beats to the drumBeats array. And updates styling.
function toggleDrumBeat(type, timeValue, div) {
  if (drumBeats[timeValue] && !drumBeats[timeValue].includes(type)) {
    drumBeats[timeValue].push(type);
    div.classList.add('drum__highlight');
  } else if (drumBeats[timeValue] && drumBeats[timeValue].includes(type)) {
    drumBeats[timeValue] = drumBeats[timeValue].filter(value => value !== type);
    div.classList.remove('drum__highlight');
  } else {
    drumBeats[timeValue] = [type];
    div.classList.add('drum__highlight');
  }
}

// checks which loopNum was pressed and deletes notes in the corresponding loop object.
function deleteRecorded(id, loopNum) {
  if (loopNum === 1) {
    loop1 = {};
  } else if (loopNum === 2) {
    loop2 = {};
  }
  // this makes the red 'led' blink red for 0.2sec when pressed.
  document.getElementById(id).children[0].classList.add('recorderOn');
  setTimeout(() => {
    document.getElementById(id).children[0].classList.remove('recorderOn');
  }, 200);
}

// volumne slider. updates synth value on change of volume slider.
volumeSlider.oninput = function volSlid() {
  Synth.setVolume(this.value / 100);
};


// toggle information. Called from HTML.
function toggleInfo() {
  document.getElementById('infoDiv').classList.toggle('hideInfo');
}

// todo
// multiple drum patterns
// tempo changer
// responsive (horizontal for iphone)
// hotkeys for drums and loops
// change key
// join loops
// smooth progress bar
// refactor onkeydown and onkeyup
// option to override loop each cycle
// add recorder from microphone
