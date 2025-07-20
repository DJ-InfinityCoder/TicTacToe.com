document.addEventListener("DOMContentLoaded", function () {

  let boxes = Array.from(document.querySelectorAll(".box"));
  let GameAREA = document.querySelector(".GameAREA");
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

  // Selecting full screen icon element
  const fullScreenIcon = document.querySelector('.fullScreenIcon');
  const enableFullScreenMsg = document.querySelector('.enableFullScreenMsg');
  const fullScreenOnIcon = document.querySelector('.fullScreenOn');
  const fullScreenOffIcon = document.querySelector('.fullScreenOff');

  // Adding event listener to full screen icon for toggling full screen mode
  fullScreenIcon.addEventListener('click', toggleFullScreen);

  enableFullScreenMsg.classList.add("enableFullScreenMsgAnimations");
  // Function to toggle full screen mode
  function toggleFullScreen() {
    enableFullScreenMsg.classList.add("hide");
    if (!document.fullscreenElement) {
      // Enter full-screen mode
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
        document.documentElement.msRequestFullscreen();
      }
      // Toggle icon display
      fullScreenOnIcon.style.display = 'none';
      fullScreenOffIcon.style.display = 'inline';
    } else {
      // Exit full-screen mode
      enableFullScreenMsg.classList.remove("hide");
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
      // Toggle icon display
      fullScreenOnIcon.style.display = 'inline';
      fullScreenOffIcon.style.display = 'none';
    }
  }

  // Initial game state variables
  let aiEnabled = false; // Flag to indicate if AI mode is enabled
  let isAIestimation = false; // Flag to indicate if AI is making an estimation 
  let currentPlayer = "O";
  let gameActive = true; // Flag to indicate if the game is still active

  // Player names
  let playerO = '';
  let playerX = '';

  // Initial board state (empty board)
  let boardState = ['', '', '', '', '', '', '', '', ''];

  // Function to reset the game
  const resetGame = () => {

    // If the scorecard is visible, hide it
    if (!scoreCard.classList.contains('hide')) {
      scoreCard.classList.add('hide');
      msgContainer.classList.remove('hide');
      board.classList.remove('hide');
    }

    // Stop all sounds, disable and clear boxes
    stopAllSounds();
    disableBoxes();
    clearBoxes();

    // Reset board state
    boardState = ['', '', '', '', '', '', '', '', ''];

    // Set AI estimation flag if AI is enabled
    if (aiEnabled) {
      isAIestimation = true;
    }

    // Remove hover classes from boxes
    boxes.forEach((box) => {
      box.classList.remove("hoverX");
      box.classList.remove("hoverO");
    });

    // Reset current player to 'O' and game state to active
    currentPlayer = "O";
    gameActive = true;

    // Hide message container, show start button, reset player borders and hide game buttons
    msgContainer.classList.add("hide");
    startBtn.classList.remove("hide");
    PlayerOCss.classList.remove("borderO");
    PlayerXCss.classList.remove("borderX");
    gameBtns.classList.add("hide");
    strike.className = 'strike hide';
    nameField.classList.remove("hide");
  };

  // Event listener for quit button
  quit.addEventListener('click', () => {

    document.getElementById('quitPopMsgContainer').style.display = 'flex';


    document.getElementById('yes-button').addEventListener('click', function () {
      window.close();
    });

    document.getElementById('no-button').addEventListener('click', function () {
      document.getElementById('quitPopMsgContainer').style.display = 'none';
    });
  })


  // Event listener for setting button
  setting.addEventListener('click', () => {
    // Show setting options, hide AI and friend buttons, show back to main menu button
    settingOptions.classList.remove('hide');
    humanAI.classList.add("hide");
    friend.classList.add("hide");
    quit.classList.add("hide");
    backToMainMenu.classList.remove("hide");

    // Event listener for back to main menu button within settings
    backToMainMenu.addEventListener('click', () => {
      // Hide setting options, show AI and friend buttons, show quit button, hide back to main menu button
      settingOptions.classList.add('hide');
      humanAI.classList.remove("hide");
      friend.classList.remove("hide");
      quit.classList.remove("hide");
      backToMainMenu.classList.add("hide");
    })
  })

  // Event listener for friend button
  friend.addEventListener('click', () => {
    // Disable AI mode, reset animations, switch views from menu to game
    aiEnabled = false;
    isAIestimation = false;

    menuContainer.classList.remove("InAnimation");
    menuContainer.classList.add("OutAnimation");
    setTimeout(() => {
      menuContainer.classList.add("hide");
      menuContainer.classList.remove("OutAnimation");
    }, 700)
    setTimeout(() => {
      GameAREA.classList.remove("hide");
      gameContainer.classList.remove("hide");
    }, 900)
    gameContainer.classList.add("InAnimation");
    newGame(); // Start a new game

  });


  // Function to start a new game
  const newGame = () => {
    // Reset game state
    resetGame();

    // Reset match statistics
    totalMatches = 0;
    matchResults = [];
    scoreTable.innerHTML = '';

    // If AI mode is enabled, reset player O and show menu, hide game container
    if (aiEnabled) {
      playerO = '';
      menuContainer.classList.remove("hide");
      menuContainer.classList.add("InAnimation");
      gameContainer.classList.add("hide");
      GameAREA.classList.add("hide");
    } else {
      playerO = '';
      playerX = ''; // Reset player X
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

  // Function to set hover effect on empty boxes based on current player
  const setTextHover = () => {
    // Remove all hover classes from boxes
    boxes.forEach((box) => {
      box.classList.remove("hoverX");
      box.classList.remove("hoverO");
    });

    // Determine hover class based on currentPlayer (either 'hoverO' or 'hoverX')
    const hoverClass = `hover${currentPlayer}`;

    // Add hoverClass to boxes that are empty
    boxes.forEach((box) => {
      if (box.innerText === "") {
        box.classList.add(hoverClass);
      }
    });
  }

  // Event listener for start button
  startBtn.addEventListener('click', () => {

    const popupmsg = document.querySelector(".popup");
    // If AI mode is enabled
    if (aiEnabled) {
      playerO = inputO.value.trim();
      if (playerO === '') {
        popupmsg.innerHTML = "Please Enter Your Name!";
        popupmsg.classList.add("showPopup");
        inputO.classList.add("shakeHorizontal");
        setTimeout(() => {
          popupmsg.classList.remove("showPopup");
        }, 2000)
        setTimeout(() => {
          inputO.classList.remove("shakeHorizontal");
        }, 200)
        if (navigator.vibrate) {
          navigator.vibrate(500);
        }
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
    } else { // If AI mode is disabled (friend mode)
      playerO = inputO.value.trim();
      playerX = inputX.value.trim();
      if (playerO === '' || playerX === '') {
        if (navigator.vibrate) {
          navigator.vibrate(500);
        }
        popupmsg.classList.add("showPopup");
        inputO.classList.add("shakeHorizontal");
        inputX.classList.add("shakeHorizontal");
        setTimeout(() => {
          popupmsg.classList.remove("showPopup");
        }, 2000)
        setTimeout(() => {
          inputO.classList.remove("shakeHorizontal");
          inputX.classList.remove("shakeHorizontal");
        }, 200)
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

  // Event listener for close settings button
  settingClose.addEventListener('click', () => {
    settingClose.classList.add('rotate');
    setTimeout(() => {
      settingClose.classList.add('hide');
      settingOpen.classList.remove('hide');
      settingClose.classList.remove('rotate');
      settingControls.classList.remove('hide');
    }, 501);
  });

  // Event listener for open settings button
  settingOpen.addEventListener('click', () => {
    settingOpen.classList.add('reverseRotate');
    setTimeout(() => {
      settingControls.classList.add('hide');
      settingOpen.classList.add('hide');
      settingClose.classList.remove('hide');
      settingOpen.classList.remove('reverseRotate');
    }, 501); // Match this duration to your CSS animation duration
  });


  // Function to start the game
  const startGame = () => {
    PlayerOCss.classList.add("borderO");
    enableBoxes();
    // Add click event listener to each box
    boxes.forEach((box, index) => {
      box.addEventListener("click", (event) => handleBoxClick(event, index));
    });
  }

  // Function to handle click events on boxes
  const handleBoxClick = (event, index) => {
    const box = event.target;

    // Check if the box is already filled
    if (box.innerText !== "") {
      return; // Prevent overwriting already clicked box
    }

    // If AI mode is enabled
    if (aiEnabled) {
      if (gameActive && boardState[index] === '') {
        box.innerText = currentPlayer; // Set 'O' or 'X' in the box
        boardState[index] = currentPlayer; // Update board state

        // Play sound based on currentPlayer
        if (currentPlayer === "O") {
          playSound(clickOSound);
        } else {
          playSound(clickXSound);
        }

        // Check if there's a winner
        if (checkWinner(currentPlayer)) {
          gameActive = false; // Game ends
          showWinner(currentPlayer === "O" ? playerO : difficultyLevel); // Show winner
          playSound(winSound);
          return;
        }
        else if (boardState.every(box => box !== '')) {
          gameActive = false; // Game ends in a tie
          gameTie();
          playSound(tieSound);
          return;
        }
        else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch turn
          if (gameActive) setTextHover();
          if (currentPlayer === 'X') {
            // If it's AI's turn
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
    } else {   // If AI mode is disabled (friend mode)
      if (currentPlayer === "O") {
        box.innerText = "O";  // Set 'O' in the box
        boardState[index] = currentPlayer;  // Update board state
        playSound(clickOSound);
        PlayerOCss.classList.remove("borderO");
        PlayerXCss.classList.add("borderX"); // Switch border to indicate Player X's turn
      } else if (currentPlayer === "X") {
        box.innerText = "X";   // Set 'X' in the box
        playSound(clickXSound);
        boardState[index] = currentPlayer; // Update board state
        PlayerOCss.classList.add("borderO");
        PlayerXCss.classList.remove("borderX"); // Switch border to indicate Player O's turn
      }

      // Check if there's a winner
      let isWinner = checkWinner(currentPlayer);
      if (isWinner) {
        gameActive = false; // Game ends
        showWinner(currentPlayer === "O" ? playerO : playerX); // Show winner
        playSound(winSound);
      }
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  // Switch turn
      if (gameActive) setTextHover();
      if (boardState.every(box => box !== '') && !isWinner) {
        gameActive = false; // Game ends in a tie
        gameTie();
        playSound(tieSound);
      }
    }

  };

  // Function to show game buttons with animation
  const showGameBtns = () => {
    setTimeout(() => {
      gameBtns.classList.remove("hide");
      gameBtns.classList.add("InAnimation");
      settingIcon.classList.add("hide");
    }, 200)
  }

  // Function to handle game tie scenario
  const gameTie = () => {
    gameActive = false;

    disableBoxes(); // Disable all boxes

    msgContainer.classList.remove("hide"); // Show message container
    msg.innerText = `Game was a Tie.`; // Set tie message

    // Remove hover classes from boxes
    boxes.forEach((box) => {
      box.classList.remove("hoverX");
      box.classList.remove("hoverO");
    });

    //Hide name field && Add border class to message container
    nameField.classList.add("hide");
    msgContainer.classList.add("borderO");

    // Update score for tie
    updateScore("Tie");

    // Determine final winner
    determineFinalWinner();

    // Show game buttons
    showGameBtns();
  };

  // Function to disable all boxes
  const disableBoxes = () => {
    boxes.forEach(box => {
      box.disabled = true;
    });
  };

  // Function to enable all boxes
  const enableBoxes = () => {
    boxes.forEach(box => {
      box.disabled = false;
    });
  };


  // Function to clear all boxes
  const clearBoxes = () => {
    boxes.forEach(box => {
      box.innerText = "";
    });
  };

  // Function to display the winner
  const showWinner = (winner) => {
    // Remove hover classes from boxes
    boxes.forEach((box) => {
      box.classList.remove("hoverX");
      box.classList.remove("hoverO");
    });

    // Disable all boxes
    disableBoxes();

    // Remove border classes from players
    PlayerOCss.classList.remove("borderO");
    PlayerXCss.classList.remove("borderX");

    // Show message container
    msgContainer.classList.remove("hide");
    const message =
      `Congratulations, <span class="text-border"> ${winner}</span> is the winner!
  `;
    msg.innerHTML = message;
    const winnerSpan = msg.querySelector(".text-border");
    winnerSpan.classList.add('text-border');
    nameField.classList.add("hide");
    msgContainer.classList.add("borderO");

    // Update score for AI mode
    if (aiEnabled) {
      updateScore(winner === playerO ? playerO : difficultyLevel);
    } else {  // Update score for friend mode
      updateScore(winner === playerO ? playerO : playerX);
    }

    // Determine final winner
    determineFinalWinner();

    // Show game buttons
    showGameBtns();
  };

  // Function to check if there is a winner
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
      // Check each winning combination
      if (combination.every(index => boardState[index] === player)) {
        if (!isAIestimation) {
          strike.classList.remove("hide");
          strike.className = `strike ${strikeClass}`;
        }
        return true;  // Return true if there is a winner
      }
      return false; // Return false if no winner
    });
  };

  // Function to reset game to main menu
  const resetToMainMenu = () => {
    // Reset game state
    resetGame();

    // Reset match statistics
    totalMatches = 0;
    matchResults = [];
    scoreTable.innerHTML = '';

    // Show main menu
    menuContainer.classList.add("InAnimation");
    menuContainer.classList.remove("hide");
    GameAREA.classList.add("hide");
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

  resetBtn.addEventListener("click", resetGame); // Reset button click
  newGameBtn.addEventListener("click", newGame); // New game button click
  mainMenuBtn.addEventListener("click", resetToMainMenu); // Main menu button click



  // AI related variables and elements
  let playWithAI = document.querySelector('.ai');
  let aiLevels = document.querySelector('.aiLevel');
  let aiLevelBtns = document.querySelectorAll('.aiLevelBtns');
  let otherMenuOption = document.querySelector('.other-menuOptions');
  let difficultyLevel = "Nuanced AI";

  // Event listener for clicking "Play with AI"
  playWithAI.addEventListener("click", () => {
    // Enable AI mode
    aiEnabled = true;

    // Hide other menu options && Show AI difficulty levels && Show back to main menu option for AI
    otherMenuOption.classList.add("hide");
    aiLevels.classList.remove("hide");
    backToMainMenuForAI.classList.remove("hide");

    // Event listener for clicking "Back to Main Menu" in AI mode
    backToMainMenuForAI.addEventListener('click', () => {
      // Show other menu options && Hide AI difficulty levels && Hide back to main menu option for AI
      otherMenuOption.classList.remove("hide");
      aiLevels.classList.add("hide");
      backToMainMenuForAI.classList.add("hide");
    })

  })

  // Event listeners for AI difficulty level buttons
  aiLevelBtns.forEach(level => {
    level.addEventListener("click", () => {
      // Animation and transition effects for switching to game container
      menuContainer.classList.remove("InAnimation");
      menuContainer.classList.add("OutAnimation");
      setTimeout(() => {
        menuContainer.classList.add("hide");
        menuContainer.classList.remove("OutAnimation");
      }, 700)
      setTimeout(() => {
        GameAREA.classList.remove("hide");
        gameContainer.classList.remove("hide");
      }, 900)
      gameContainer.classList.add("InAnimation");
      setTimeout(() => {
        menuContainer.classList.remove("OutAnimation");
      }, 901)


      inputX.classList.add("hide");
      nameholderX.classList.remove("hide");

      // Set difficulty level based on selected button
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


  // Function for AI's move based on selected difficulty level
  const aiKiChaal = () => {
    // Set flag for AI move
    isAIestimation = true;

    // Choose move based on difficulty level
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
        mediumAiChaal();
    }

    // Reset flag after AI move
    isAIestimation = false;
  }

  // Easy AI's move - Random cell selection
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

  // Medium AI's move - Strategic decision making
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

  // Hard AI's move - Optimal move using Minimax algorithm
  const hardAiChaal = () => {
    // Determine best move using Minimax algorithm
    const bestMove = findBestMove();

    // Perform AI move
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
        boardState[i] = 'X';  // Try placing AI symbol
        let score = minimax(boardState, 0, false);  // Calculate score for current move
        boardState[i] = ''; // Reset state
        if (score > bestScore) {
          bestScore = score;  // Update best score
          move = i; // Update best move
        }
      }
    }
    return move;  // Return best move index
  }

  // Scores for Minimax algorithm
  const scores = {
    X: 10,  // Score for AI winning
    O: -10, // Score for human winning
    tie: 0  // Score for tie
  };

  // Minimax algorithm for optimal move calculation
  const minimax = (board, depth, isMaximizing) => {
    if (checkWinner('X')) {
      return scores.X - depth;  // Return AI winning score
    }
    if (checkWinner('O')) {
      return scores.O + depth;  // Return human winning score
    }
    if (board.every(box => box !== '')) {
      return scores.tie;    // Return tie score
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'X'; // Try placing AI symbol
          let score = minimax(board, depth + 1, false); // Recursively calculate score
          board[i] = '';  // Reset state
          bestScore = Math.max(score, bestScore); // Update best score
        }
      }
      return bestScore; // Return best score for maximizing player (AI)
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'O'; // Try placing human symbol
          let score = minimax(board, depth + 1, true);  // Recursively calculate score
          board[i] = '';  // Reset state
          bestScore = Math.min(score, bestScore); // Update best score
        }
      }
      return bestScore; // Return best score for minimizing player (human)
    }
  }

  // Functionality related to audio elements
  let backgroundMusic = document.getElementById("background-music");
  const clickOSound = document.getElementById("click-o-sound");
  const clickXSound = document.getElementById("click-x-sound");
  const winSound = document.getElementById("win-sound");
  const tieSound = document.getElementById("tie-sound");

  // Elements for music and sound controls
  const musicRangeInput = document.querySelectorAll(".music .rangeInput");
  const soundRangeInput = document.querySelectorAll(".sound .rangeInput");
  const fullMusicIcons = document.querySelectorAll(".fullMusic");
  const muteMusicIcons = document.querySelectorAll(".muteMusic");
  const fullVolumeIcons = document.querySelectorAll(".fullVolume");
  const lowVolumeIcons = document.querySelectorAll(".lowVolume");
  const muteVolumeIcons = document.querySelectorAll(".muteVolume");
  let isMusicPlaying = localStorage.getItem("isMusicPlaying") === "true";

  // Setting initial volume for sound effects
  winSound.volume = 1;
  tieSound.volume = 1;
  clickOSound.volume = 1;
  clickXSound.volume = 1;


  // Function to play background music
  const playBackgroundMusic = () => {
    backgroundMusic.volume = 0.30;  // Lower background music volume
    backgroundMusic.currentTime = 0; // Restart from the beginning
    backgroundMusic.play(); // Start playing
  };

  // Function to stop background music
  const stopBackgroundMusic = () => {
    backgroundMusic.pause(); // Pause playback
    localStorage.setItem("isMusicPlaying", "false"); // Store state
  };

  // Event handler to start playing background music on first user interaction
  const handleClick = () => {
    playBackgroundMusic(); // Start playing when user interacts with the page
    document.removeEventListener("click", handleClick); // Remove event listener after first click
  };

  // Start playing music if it was playing before page refresh
  if (isMusicPlaying) {
    playBackgroundMusic();
  }

  // Pause music before page unload
  window.addEventListener("beforeunload", stopBackgroundMusic);

  // Add click event listener to start playback
  document.addEventListener('click', handleClick);

  // Function to play a sound effect
  const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
  };

  // Function to stop all sound effects
  const stopAllSounds = () => {
    winSound.pause();
    tieSound.pause();
    winSound.currentTime = 0;
    tieSound.currentTime = 0;
  };

  // Function to sync range input values
  const syncRangeInputs = (sourceInput, targetInputs) => {
    targetInputs.forEach(targetInput => {
      if (targetInput !== sourceInput) {
        targetInput.value = sourceInput.value;
      }
    });
  };

  // Function to update music volume based on range input
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

  // Function to update sound effects volume based on range input
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

  // Add event listeners to music volume range inputs
  musicRangeInput.forEach(input => {
    input.addEventListener("input", updateMusicVolume);
  });

  // Add event listeners to sound effects volume range inputs
  soundRangeInput.forEach(input => {
    input.addEventListener("input", updateSoundVolume);
  });



  // Score table and related variables
  let totalMatches = 0;
  let matchResults = [];  // Array to store match results
  const scoreTable = document.querySelector('.score-table');

  // Function to update scorecard
  const updateScorecard = () => {
    if (aiEnabled) {
      // Scorecard header for AI mode
      scoreTable.innerHTML = `
        <tr>
            <th>Match No.</th>
            <th>${playerO}(O)</th>
            <th>${difficultyLevel}(X)</th>
        </tr>
    `;
    } else {
      // Scorecard header for friend mode
      scoreTable.innerHTML = `
        <tr>
            <th>Match No.</th>
            <th>${playerO}(O)</th>
            <th>${playerX}(X)</th>
        </tr>
    `;
    }

    // Add match results to scorecard
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


    // Calculate total wins for each player
    const totalWinsX = matchResults.reduce((acc, result) => acc + result.X, 0);
    const totalWinsO = matchResults.reduce((acc, result) => acc + result.O, 0);

    // Add totals to scorecard
    scoreTable.innerHTML += `
    <tr>
      <td>Total</td>
      <td>${totalWinsO}</td>
      <td>${totalWinsX}</td>
    </tr>
  `;
  };

  // Function to update the score for each match
  const updateScore = (winner) => {
    const matchResult = { X: 0, O: 0 };

    if (aiEnabled) {
      if (winner === difficultyLevel) {
        matchResult.X = 1;  // AI wins
      } else if (winner === playerO) {
        matchResult.O = 1;  // Human wins
      } else { // Handle tie case
        matchResult.X = 1;
        matchResult.O = 1;
      }
    } else {
      if (winner === playerX) {
        matchResult.X = 1;  // Player X wins
      } else if (winner === playerO) {
        matchResult.O = 1;  // Player O wins
      } else { // Handle tie case
        matchResult.X = 1;
        matchResult.O = 1;
      }
    }

    // Add result to match results array
    matchResults.push(matchResult);
    totalMatches++; // Increment total matches
    updateScorecard(); // Update scorecard
  };

  // Function to determine and display the final winner
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

  // Elements for board and scorecard
  let board = document.querySelector('.board');
  let scoreCard = document.querySelector('.score-card');

  // Element to show scorecard
  const showScoreCard = document.querySelector('#scoreCard-btn');
  let isScoreCardVisible = false;

  // Function to toggle scorecard visibility
  const toggleScoreCard = () => {
    isScoreCardVisible = !isScoreCardVisible;
    scoreCard.classList.toggle('hide');
    msgContainer.classList.toggle('hide');
    board.classList.toggle('hide');
  };

  // Add event listener to show scorecard button
  showScoreCard.addEventListener('click', toggleScoreCard);

});


