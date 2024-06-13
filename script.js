document.addEventListener("DOMContentLoaded", function () {

  let boxes = Array.from(document.querySelectorAll(".box"));
  let gameContainer = document.querySelector(".game-container");
  let resetBtn = document.querySelector("#reset-btn");
  let startBtn = document.querySelector('#start-btn');
  let gameBtns = document.querySelector('.gameBtns');
  let newGameBtn = document.querySelector('#new-btn');
  let mainMenuBtn = document.querySelector('#menu-btn');
  let nameField = document.querySelector('.nameField');
  let inputO = document.querySelector(".inputO");
  let inputX = document.querySelector(".inputX");
  let nameholderO = document.querySelector(".nameholderO");
  let nameholderX = document.querySelector(".nameholderX");
  let PlayerOCss = document.querySelector(".PlayerO");
  let PlayerXCss = document.querySelector(".PlayerX");
  let msgContainer = document.querySelector(".msg-container");
  let msg = document.querySelector("#msg");
  let menuContainer = document.querySelector('.menu-container');
  let quit = document.querySelector('.quit');
  let humanAI = document.querySelector('.ai');
  let friend = document.querySelector('.friend');
  let strike = document.querySelector('.strike');
  let setting = document.querySelector('.setting');
  let settingOptions = document.querySelector('.settingOptions');
  let backToMainMenu = document.querySelector('.backToMainMenuForSetting');
  let backToMainMenuForAI = document.querySelector('.backToMainMenuForAI');
  const settingIcon = document.querySelector('.settingIcon');
  const settingClose = document.querySelector('.settingClose');
  const settingOpen = document.querySelector('.settingOpen');
  const settingControls = document.querySelector('.settingControls');


  let aiEnabled = false; // for ai mode or not
  let currentPlayer = "O";
  let gameActive = true;

  let playerO = '';
  let playerX = '';
  let isAIestimation = false;
  let boardState = ['', '', '', '', '', '', '', '', ''];

  const resetGame = () => {

    if (!scoreCard.classList.contains('hide')) {
      // If the scorecard is visible, hide it
      scoreCard.classList.add('hide');
      msgContainer.classList.remove('hide');
      board.classList.remove('hide');
    }

    stopAllSounds();
    disableBoxes();
    clearBoxes();

    boardState = ['', '', '', '', '', '', '', '', ''];
    if (aiEnabled) {
      isAIestimation = true;
    }
    boxes.forEach((box) => {
      box.classList.remove("hoverX");
      box.classList.remove("hoverO");
    });
    currentPlayer = "O";
    gameActive = true;
    msgContainer.classList.add("hide");
    startBtn.classList.remove("hide");
    PlayerOCss.classList.remove("borderO");
    PlayerXCss.classList.remove("borderX");
    gameBtns.classList.add("hide");
    strike.className = 'strike hide';
    nameField.classList.remove("hide");
  };

  quit.addEventListener('click', () => {
    if (window.confirm("Are you sure you want to quit?")) {
      window.close();
    }
  })

  setting.addEventListener('click', () => {
    settingOptions.classList.remove('hide');
    humanAI.classList.add("hide");
    friend.classList.add("hide");
    quit.classList.add("hide");
    backToMainMenu.classList.remove("hide");
    backToMainMenu.addEventListener('click', () => {
      settingOptions.classList.add('hide');
      humanAI.classList.remove("hide");
      friend.classList.remove("hide");
      quit.classList.remove("hide");
      backToMainMenu.classList.add("hide");
    })
  })

  friend.addEventListener('click', () => {
    aiEnabled = false;
    isAIestimation = false;
    menuContainer.classList.remove("InAnimation");
    menuContainer.classList.add("OutAnimation");
    setTimeout(() => {
      menuContainer.classList.add("hide");
      menuContainer.classList.remove("OutAnimation");
    }, 700)
    setTimeout(() => {
      gameContainer.classList.remove("hide");
    }, 900)
    gameContainer.classList.add("InAnimation");
    newGame();
  });

  const newGame = () => {
    resetGame();
    totalMatches = 0;
    matchResults = [];
    scoreTable.innerHTML = '';
    if (aiEnabled) {
      playerO = '';
      menuContainer.classList.remove("hide");
      menuContainer.classList.add("InAnimation");
      gameContainer.classList.add("hide");
    } else {
      playerO = '';
      playerX = '';
    }
    // Show input fields and hide nameholders
    inputO.classList.remove("hide");
    inputX.classList.remove("hide");
    nameholderO.classList.add("hide");
    nameholderX.classList.add("hide");

    // Clear input fields
    inputO.value = '';
    inputX.value = '';

  };

  const setTextHover = () => {
    //remove all hover text
    boxes.forEach((box) => {
      box.classList.remove("hoverX");
      box.classList.remove("hoverO");
    });

    const hoverClass = `hover${currentPlayer}`;

    boxes.forEach((box) => {
      if (box.innerText === "") {
        box.classList.add(hoverClass);
      }
    });
  }

  startBtn.addEventListener('click', () => {
    if (aiEnabled) {
      playerO = inputO.value.trim();
      if (playerO === '') {
        alert("Please Enter the Player Name");
      } else {
        setTextHover();
        settingIcon.classList.remove('hide');
        inputO.classList.add("hide");
        nameholderO.classList.remove("hide");
        nameholderO.innerHTML = playerO;
        nameholderX.innerHTML = difficultyLevel;
        startBtn.classList.add("hide");
        startGame();
      }
    } else {
      playerO = inputO.value.trim();
      playerX = inputX.value.trim();
      if (playerO === '' || playerX === '') {
        alert("Please Enter the Both Player's Name");
      } else {
        setTextHover();
        settingIcon.classList.remove('hide');
        inputO.classList.add("hide");
        inputX.classList.add("hide");
        nameholderO.classList.remove("hide");
        nameholderX.classList.remove("hide");
        nameholderO.innerHTML = playerO;
        nameholderX.innerHTML = playerX;
        startBtn.classList.add("hide");
        startGame();
      }
    }
  });




  settingClose.addEventListener('click', () => {
    settingClose.classList.add('rotate');
    setTimeout(() => {
      settingClose.classList.add('hide');
      settingOpen.classList.remove('hide');
      settingClose.classList.remove('rotate');
      settingControls.classList.remove('hide');
    }, 501); // Match this duration to your CSS animation duration
  });

  settingOpen.addEventListener('click', () => {
    settingOpen.classList.add('reverseRotate');
    setTimeout(() => {
      settingControls.classList.add('hide');
      settingOpen.classList.add('hide');
      settingClose.classList.remove('hide');
      settingOpen.classList.remove('reverseRotate');
    }, 501); // Match this duration to your CSS animation duration
  });

  const startGame = () => {
    PlayerOCss.classList.add("borderO");
    enableBoxes();
    boxes.forEach((box, index) => {
      box.addEventListener("click", (event) => handleBoxClick(event, index));
    });
  }

  const handleBoxClick = (event, index) => {
    const box = event.target;
    // let boxText = box.innerText;
    if (box.innerText !== "") {
      return; // Prevent overwriting already clicked box
    }
    if (aiEnabled) {
      if (gameActive && boardState[index] === '') {
        box.innerText = currentPlayer;
        boardState[index] = currentPlayer;
        if (currentPlayer === "O") {
          playSound(clickOSound);
        } else {
          playSound(clickXSound);
        }
        if (checkWinner(currentPlayer)) {
          gameActive = false;
          showWinner(currentPlayer === "O" ? playerO : difficultyLevel);
          playSound(winSound);
          return;
        }
        else if (boardState.every(box => box !== '')) {
          gameActive = false;
          gameTie();
          playSound(tieSound);
          return;
        }
        else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          if (gameActive) setTextHover();
          if (currentPlayer === 'X') {
            boxes.forEach((box) => {
              box.classList.remove("hoverX");
              box.classList.remove("hoverO");
            });
            PlayerOCss.classList.remove("borderO");
            PlayerXCss.classList.add("borderX");
            gameContainer.classList.add("topMargin");
            aiKiChaal();
          }
        }
      }
    } else {
      if (currentPlayer === "O") {
        box.innerText = "O";
        boardState[index] = currentPlayer;
        playSound(clickOSound);
        PlayerOCss.classList.remove("borderO");
        PlayerXCss.classList.add("borderX");
      } else if (currentPlayer === "X") {
        box.innerText = "X";
        playSound(clickXSound);
        boardState[index] = currentPlayer;
        PlayerOCss.classList.add("borderO");
        PlayerXCss.classList.remove("borderX");
      }
      let isWinner = checkWinner(currentPlayer);
      if (isWinner) {
        gameActive = false;
        showWinner(currentPlayer === "O" ? playerO : playerX);
        playSound(winSound);
      }
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (gameActive) setTextHover();
      if (boardState.every(box => box !== '') && !isWinner) {
        gameActive = false;
        gameTie();
        playSound(tieSound);
      }
    }

  };

  const showGameBtns = () => {
    setTimeout(() => {
      gameBtns.classList.remove("hide");
      gameBtns.classList.add("InAnimation");
      settingIcon.classList.add("hide");
    }, 200)
  }

  const gameTie = () => {
    gameActive = false;
    disableBoxes();
    msgContainer.classList.remove("hide");
    msg.innerText = `Game was a Tie.`;
    boxes.forEach((box) => {
      box.classList.remove("hoverX");
      box.classList.remove("hoverO");
    });
    nameField.classList.add("hide");
    msgContainer.classList.add("borderO");
    updateScore("Tie");
    determineFinalWinner();
    showGameBtns();
  };

  const disableBoxes = () => {
    boxes.forEach(box => {
      box.disabled = true;
    });
  };

  const enableBoxes = () => {
    boxes.forEach(box => {
      box.disabled = false;
    });
  };

  const clearBoxes = () => {
    boxes.forEach(box => {
      box.innerText = "";
    });
  };

  const showWinner = (winner) => {
    boxes.forEach((box) => {
      box.classList.remove("hoverX");
      box.classList.remove("hoverO");
    });
    disableBoxes();
    PlayerOCss.classList.remove("borderO");
    PlayerXCss.classList.remove("borderX");
    msgContainer.classList.remove("hide");
    const message =
      `Congratulations, <span class="text-border"> ${winner}</span> is the winner!
  `;
    msg.innerHTML = message;
    const winnerSpan = msg.querySelector(".text-border");
    winnerSpan.classList.add('text-border');
    nameField.classList.add("hide");
    msgContainer.classList.add("borderO");
    if (aiEnabled) {
      updateScore(winner === playerO ? playerO : difficultyLevel);
    } else {
      updateScore(winner === playerO ? playerO : playerX);
    }
    determineFinalWinner();
    showGameBtns();
  };


  const checkWinner = (player) => {
    const winConditions = [
      //rows
      { combination: [0, 1, 2], strikeClass: "strike-row-1" },
      { combination: [3, 4, 5], strikeClass: "strike-row-2" },
      { combination: [6, 7, 8], strikeClass: "strike-row-3" },
      //columns
      { combination: [0, 3, 6], strikeClass: "strike-column-1" },
      { combination: [1, 4, 7], strikeClass: "strike-column-2" },
      { combination: [2, 5, 8], strikeClass: "strike-column-3" },
      //diagonals
      { combination: [0, 4, 8], strikeClass: "strike-diagonal-1" },
      { combination: [2, 4, 6], strikeClass: "strike-diagonal-2" }
    ];

    return winConditions.some(({ combination, strikeClass }) => {
      if (combination.every(index => boardState[index] === player)) {
        if (!isAIestimation) {
          strike.classList.remove("hide");
          strike.className = `strike ${strikeClass}`;
        }
        return true;
      }
      return false;
    });
  };


  const resetToMainMenu = () => {
    resetGame();
    totalMatches = 0;
    matchResults = [];
    scoreTable.innerHTML = '';
    menuContainer.classList.add("InAnimation");
    menuContainer.classList.remove("hide");
    otherMenuOption.classList.remove("hide");
    backToMainMenuForAI.classList.add("hide");
    gameContainer.classList.add("hide");
    friend.classList.remove("hide");
    aiLevels.classList.add("hide");

    // Clear player names and AI setting
    playerO = '';
    playerX = '';
    aiEnabled = false;
    difficultyLevel = "Medium";

    // Clear input fields and hide nameholders
    inputO.value = '';
    inputX.value = '';
    inputO.classList.remove("hide");
    inputX.classList.remove("hide");
    nameholderO.classList.add("hide");
    nameholderX.classList.add("hide");
  };

  resetBtn.addEventListener("click", resetGame);
  newGameBtn.addEventListener("click", newGame);
  mainMenuBtn.addEventListener("click", resetToMainMenu);



  // for ai

  let playWithAI = document.querySelector('.ai');
  // let forAI = document.querySelector('.forAI');
  let aiLevels = document.querySelector('.aiLevel');
  let aiLevelBtns = document.querySelectorAll('.aiLevelBtns');
  let otherMenuOption = document.querySelector('.other-menuOptions');
  let difficultyLevel = "Nuanced AI";


  playWithAI.addEventListener("click", () => {
    aiEnabled = true;
    otherMenuOption.classList.add("hide");
    aiLevels.classList.remove("hide");
    backToMainMenuForAI.classList.remove("hide");
    backToMainMenuForAI.addEventListener('click', () => {
      otherMenuOption.classList.remove("hide");
      aiLevels.classList.add("hide");
      backToMainMenuForAI.classList.add("hide");
    })

  })

  aiLevelBtns.forEach(level => {
    level.addEventListener("click", () => {
      menuContainer.classList.remove("InAnimation");
      menuContainer.classList.add("OutAnimation");
      setTimeout(() => {
        menuContainer.classList.add("hide");
        menuContainer.classList.remove("OutAnimation");
      }, 700)
      setTimeout(() => {
        gameContainer.classList.remove("hide");
      }, 900)
      gameContainer.classList.add("InAnimation");
      setTimeout(() => {
        menuContainer.classList.remove("OutAnimation");
      }, 901)
      inputX.classList.add("hide");
      nameholderX.classList.remove("hide");

      if (level.innerHTML === "Lucid AI") {
        nameholderX.innerHTML = level.innerHTML;
        difficultyLevel = level.innerHTML
      }
      else if (level.innerHTML === "Nuanced AI") {
        nameholderX.innerHTML = level.innerHTML;
        difficultyLevel = level.innerHTML
      }
      else if (level.innerHTML === "Esoteric AI") {
        nameholderX.innerHTML = level.innerHTML;
        difficultyLevel = level.innerHTML
      }
    })
  })


  // AI's move
  const aiKiChaal = () => {
    isAIestimation = true;
    const difficulty = difficultyLevel; // Change difficulty level here
    switch (difficulty) {
      case "Lucid AI":
        easyAiChaal();
        break;
      case "Nuanced AI":
        mediumAiChaal();
        break;
      case "Esoteric AI":
        hardAiChaal();
        break;
      default:
        mediumAiChaal(); // Default to medium difficulty
    }
    isAIestimation = false;
  }

  const easyAiChaal = () => {
    let emptyCells = boardState.reduce((acc, cell, index) => {
      if (cell === '') acc.push(index);
      return acc;
    }, []);
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let moveIndex = emptyCells[randomIndex];
    setTimeout(() => {
      PlayerOCss.classList.add("borderO");
      PlayerXCss.classList.remove("borderX");
      gameContainer.classList.add("topMargin");
      handleBoxClick({ target: boxes[moveIndex] }, moveIndex)
    }, 600);

  }

  // Medium AI's move - Winning move or random move
  const mediumAiChaal = () => {
    let moveIndex = -1;
    // Check for winning move
    for (let i = 0; i < 9; i++) {
      if (boardState[i] === '') {
        boardState[i] = 'X';
        if (checkWinner('X')) {
          moveIndex = i;
          boardState[i] = '';
          break;
        }
        boardState[i] = '';
      }
    }

    // If no winning move, block human's winning move
    if (moveIndex === -1) {
      for (let i = 0; i < 9; i++) {
        if (boardState[i] === '') {
          boardState[i] = 'O';
          if (checkWinner('O')) {
            moveIndex = i;
            boardState[i] = ''; // reset state
            break;
          }
          boardState[i] = '';
        }
      }
    }

    // If no winning or blocking move, make a random move
    if (moveIndex === -1) {
      easyAiChaal();
    } else {
      setTimeout(() => {
        PlayerOCss.classList.add("borderO");
        PlayerXCss.classList.remove("borderX");
        gameContainer.classList.add("topMargin");
        handleBoxClick({ target: boxes[moveIndex] }, moveIndex)
      }, 600);
    }
  }

  // Hard AI's move - Minimax algorithm
  const hardAiChaal = () => {
    const bestMove = findBestMove();
    setTimeout(() => {
      PlayerOCss.classList.add("borderO");
      PlayerXCss.classList.remove("borderX");
      gameContainer.classList.add("topMargin");
      handleBoxClick({ target: boxes[bestMove] }, bestMove)
    }, 600);
  }

  // Find the best move for AI using minimax algorithm
  const findBestMove = () => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
      if (boardState[i] === '') {
        boardState[i] = 'X';
        let score = minimax(boardState, 0, false);
        boardState[i] = '';
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }

  const scores = {
    X: 10,
    O: -10,
    tie: 0
  };

  // Minimax algorithm
  const minimax = (board, depth, isMaximizing) => {
    if (checkWinner('X')) {
      return scores.X - depth;
    }
    if (checkWinner('O')) {
      return scores.O + depth;
    }
    if (board.every(box => box !== '')) {
      return scores.tie;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'X';
          let score = minimax(board, depth + 1, false);
          board[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'O';
          let score = minimax(board, depth + 1, true);
          board[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }


  //for audio

  let backgroundMusic = document.getElementById("background-music");
  const clickOSound = document.getElementById("click-o-sound");
  const clickXSound = document.getElementById("click-x-sound");
  const winSound = document.getElementById("win-sound");
  const tieSound = document.getElementById("tie-sound");

  const musicRangeInput = document.querySelectorAll(".music .rangeInput");
  const soundRangeInput = document.querySelectorAll(".sound .rangeInput");
  const fullMusicIcons = document.querySelectorAll(".fullMusic");
  const muteMusicIcons = document.querySelectorAll(".muteMusic");
  const fullVolumeIcons = document.querySelectorAll(".fullVolume");
  const lowVolumeIcons = document.querySelectorAll(".lowVolume");
  const muteVolumeIcons = document.querySelectorAll(".muteVolume");
  let isMusicPlaying = localStorage.getItem("isMusicPlaying") === "true";

  winSound.volume = 1;
  tieSound.volume = 1;
  clickOSound.volume = 1;
  clickXSound.volume = 1;

  const playBackgroundMusic = () => {
    backgroundMusic.volume = 0.30;  // Lower background music volume
    backgroundMusic.currentTime = 0; // Restart from the beginning
    backgroundMusic.play(); // Start playing
  };

  const stopBackgroundMusic = () => {
    backgroundMusic.pause(); // Pause playback
    localStorage.setItem("isMusicPlaying", "false"); // Store state
  };

  const handleClick = () => {
    playBackgroundMusic(); // Start playing when user interacts with the page
    document.removeEventListener("click", handleClick); // Remove event listener after first click
  };

  if (isMusicPlaying) {
    playBackgroundMusic(); // Start playing if music was playing before the refresh
  }

  window.addEventListener("beforeunload", stopBackgroundMusic); // Pause music before page unload

  // Add click event listener to start playback
  document.addEventListener('click', handleClick);



  const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
  };

  const stopAllSounds = () => {
    winSound.pause();
    tieSound.pause();
    winSound.currentTime = 0;
    tieSound.currentTime = 0;
  };

  const syncRangeInputs = (sourceInput, targetInputs) => {
    targetInputs.forEach(targetInput => {
      if (targetInput !== sourceInput) {
        targetInput.value = sourceInput.value;
      }
    });
  };

  const updateMusicVolume = (event) => {
    const volume = event.target.value / 100;
    backgroundMusic.volume = volume;
    if (volume === 0) {
      fullMusicIcons.forEach(icon => icon.classList.add("hide"));
      muteMusicIcons.forEach(icon => icon.classList.remove("hide"));
    } else {
      fullMusicIcons.forEach(icon => icon.classList.remove("hide"));
      muteMusicIcons.forEach(icon => icon.classList.add("hide"));
    }
    syncRangeInputs(event.target, musicRangeInput);
  };

  const updateSoundVolume = (event) => {
    const volume = event.target.value / 100;
    clickOSound.volume = volume;
    clickXSound.volume = volume;
    winSound.volume = volume;
    tieSound.volume = volume;
    if (volume === 0) {
      fullVolumeIcons.forEach(icon => icon.classList.add("hide"));
      lowVolumeIcons.forEach(icon => icon.classList.add("hide"));
      muteVolumeIcons.forEach(icon => icon.classList.remove("hide"));
    } else if (volume <= 0.5) {
      fullVolumeIcons.forEach(icon => icon.classList.add("hide"));
      lowVolumeIcons.forEach(icon => icon.classList.remove("hide"));
      muteVolumeIcons.forEach(icon => icon.classList.add("hide"));
    } else {
      fullVolumeIcons.forEach(icon => icon.classList.remove("hide"));
      lowVolumeIcons.forEach(icon => icon.classList.add("hide"));
      muteVolumeIcons.forEach(icon => icon.classList.add("hide"));
    }
    syncRangeInputs(event.target, soundRangeInput);
  };

  musicRangeInput.forEach(input => {
    input.addEventListener("input", updateMusicVolume);
  });

  soundRangeInput.forEach(input => {
    input.addEventListener("input", updateSoundVolume);
  });



  //scoreTable

  let totalMatches = 0;
  let matchResults = [];
  const scoreTable = document.querySelector('.score-table');

  const updateScorecard = () => {
    if (aiEnabled) {
      scoreTable.innerHTML = `
        <tr>
            <th>Match No.</th>
            <th>${playerO}(O)</th>
            <th>${difficultyLevel}(X)</th>
        </tr>
    `;
    } else {
      scoreTable.innerHTML = `
        <tr>
            <th>Match No.</th>
            <th>${playerO}(O)</th>
            <th>${playerX}(X)</th>
        </tr>
    `;
    }
    matchResults.forEach((result, index) => {
      // result.X and result.O are the win counts for Player X and Player O for the current match
      scoreTable.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${result.O}</td>
          <td>${result.X}</td>
        </tr>
      `;
    });


    const totalWinsX = matchResults.reduce((acc, result) => acc + result.X, 0);
    const totalWinsO = matchResults.reduce((acc, result) => acc + result.O, 0);

    scoreTable.innerHTML += `
    <tr>
      <td>Total</td>
      <td>${totalWinsO}</td>
      <td>${totalWinsX}</td>
    </tr>
  `;
  };

  const updateScore = (winner) => {
    const matchResult = { X: 0, O: 0 };

    if (aiEnabled) {
      if (winner === difficultyLevel) {
        matchResult.X = 1;
      } else if (winner === playerO) {
        matchResult.O = 1;
      } else { // Handle tie case
        matchResult.X = 1;
        matchResult.O = 1;
      }
    } else {
      if (winner === playerX) {
        matchResult.X = 1;
      } else if (winner === playerO) {
        matchResult.O = 1;
      } else { // Handle tie case
        matchResult.X = 1;
        matchResult.O = 1;
      }
    }

    matchResults.push(matchResult);
    totalMatches++;
    updateScorecard();
  };

  const determineFinalWinner = () => {
    const totalWinsX = matchResults.reduce((acc, result) => acc + result.X, 0);
    const totalWinsO = matchResults.reduce((acc, result) => acc + result.O, 0);
    let finalWinner;
    if (aiEnabled) {
      finalWinner = totalWinsX > totalWinsO ? difficultyLevel : totalWinsX < totalWinsO ? playerO : 'Game was Tie';
    } else {
      finalWinner = totalWinsX > totalWinsO ? playerX : totalWinsX < totalWinsO ? playerO : 'Game was Tie';
    }
    // Display final winner in the UI
    const finalWinnerElement = document.querySelector('.final-winner');
    if (finalWinner === "Game was Tie") {
      finalWinnerElement.textContent = `Game was Tie`;
    } else {
      finalWinnerElement.textContent = `Congratulations Final Winner : ${finalWinner}`;
    }
  };

  let board = document.querySelector('.board');
  let scoreCard = document.querySelector('.score-card');

  const showScoreCard = document.querySelector('#scoreCard-btn');
  let isScoreCardVisible = false;
  const toggleScoreCard = () => {
    isScoreCardVisible = !isScoreCardVisible;
    scoreCard.classList.toggle('hide');
    msgContainer.classList.toggle('hide');
    board.classList.toggle('hide');
  };

  showScoreCard.addEventListener('click', toggleScoreCard);

});


