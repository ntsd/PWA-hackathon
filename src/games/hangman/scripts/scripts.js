// Self invoking function hides currentWord from the console
(function () {
    /*
     * Pick from alphabet keypad. Returns the letter chosen.
     */
    var myClick = 0;
    $("#alphabet-keypad").on("click", ".letter-button", pickLetterClick);

    function pickLetterClick() {
        var letterElement = $(this);
        var letterPicked = letterElement.html();
        pickLetter(letterPicked);
        myClick = 1;
    }

    function letterElementUpdate(letter) {
        var letterElement = $("#" + letter + "");
        letterElement.removeClass("letter-button")
            .addClass("letter-disabled");

        handlePickedLetter(letterElement.html());
    }

    function handlePickedLetter(letterPicked) {
        var resultMatches = [];
        var ind = currentWord.indexOf(letterPicked);

        // if letterPicked matches one or more letters in the current word
        // push all instances of that letter to resultMatches
        while (ind !== -1) {
            resultMatches.push(ind);
            ind = currentWord.indexOf(letterPicked, ind + 1);
            // add score
            if(myClick == 1){
                playersRef.child("/"+thisUser.id).once('value').then(function(snapshot) {
                    playersRef.child("/"+thisUser.id+"/score").set(snapshot.val().score + 2);
                });
                myClick = 0;
            }
        }

        //if resultMatches is greater than 0 proceed to place them in the dom
        if (resultMatches.length > 0) {
            var letterBlocks = document.getElementsByClassName("is-letter");
            resultMatches.map(function (num) {

                var domElem = document.createElement("span");
                domElem.innerHTML = currentWordFull[num].toUpperCase();
                letterBlocks[num].appendChild(domElem);
                displayCongratulatoryMessageOnWin();

            });
            //if letterBlock is not greater than 0 put the letter in the graveyard
        } else {
            var domElem = document.createElement("div");
            domElem.className = "grave-letter";
            domElem.innerHTML = letterPicked;
            document.getElementById("letter-graveyard").appendChild(domElem);
            hangmanGraphic.addBodyPart();
            displayGameOverMessageOnLose();
        }
    }

    function displayCongratulatoryMessageOnWin() {
        var correctlyGuessedLettersCount = $(".is-letter > span").length;
        if (correctlyGuessedLettersCount === currentWord.length) {
            $("#congratulatory_message").appendTo("body").modal('show');
        }
    }

    function displayGameOverMessageOnLose() {
        var incorrectlyGuessedLettersCount = $("#letter-graveyard > div").length;
        //If number of letters guessed is equal to maxParts
        if (incorrectlyGuessedLettersCount === 7) {
            $("#gameover_message").appendTo("body").modal('show');
            var gameOverMessage = "Uh oh. You took too many tries to guess the word. The correct word is - '" + currentWord + "'. Better luck next time.";
            $(".lead").text(gameOverMessage);
        }
    }

    /*
     * Hangman graphic with methods addBodyPart() and reset()
     */
    var hangmanGraphic = function () {
        var bodyParts = 0,
            maxParts = 7;
        return {
            addBodyPart: function () {
                if (bodyParts < maxParts) {
                    ++bodyParts;
                    $("#hangman-frame" + bodyParts).css("opacity", 1);
                }
            },

            reset: function () {
                $(".hangman-frames").css("opacity", 0);
                $("#hangman-frame0").css("opacity", 1);
                bodyParts = 0;
                resetAlphabetKeypad();
                removeGraveyardLetters();
                removeCorrectlyGuessedLetters();
                removeFillInTheBlanksAroundOldWord();
                setWordToBeGuessed();
            }
        };
    }();

    // Next 2 lines will be refactored into interface for
    //   losing a life and reseting the game
    $(".reset").on("click", hangmanGraphic.reset);

    function resetAlphabetKeypad() {
        $("#alphabet-keypad > .letter-disabled").each(function (index, element) {
            $(element).removeClass().addClass('letter-button');
        });
    }

    function removeGraveyardLetters() {
        $('#letter-graveyard > div').each(function (index, element) {
            $(element).remove();
        });
    }

    function removeCorrectlyGuessedLetters() {
        $('#word-to-guess').each(function (index, element) {
            $(element).children().html('');
        });
    }

    function removeFillInTheBlanksAroundOldWord() {
        $("#word-to-guess").html('');
    }

    // adding dictionary and word filter //
    var hangmanWords = [
        "the", "of", "and", "a", "to", "in", "is", "you", "that", "it", "he",
        "was", "for", "on", "are", "as", "with", "his", "they", "i", "at", "be",
        "this", "have", "from", "or", "one", "had", "by", "word", "but", "not",
        "what", "all", "were", "we", "when", "your", "can", "said", "there",
        "use", "an", "each", "which", "she", "do", "how", "their", "if", "will",
        "up", "other", "about", "out", "many", "then", "them", "these", "so",
        "some", "her", "would", "make", "like", "him", "into", "time", "has",
        "look", "two", "more", "write", "go", "see", "number", "no", "way",
        "could", "people", "my", "than", "first", "water", "been", "call",
        "who", "oil", "its", "now", "find", "long", "down", "day", "did", "get",
        "come", "made", "may", "part"
    ];

    var easyArray = hangmanWords.filter(function (word) {
        return word.length <= 4;
    });

    var hardArray = hangmanWords.filter(function (word) {
        return word.length > 4;
    });

    function wordSelect(array) {
        var num = Math.floor(Math.random() * (array.length - 1));
        var word = array[num];

        return word;
    }

    function setWordToBeGuessed(currentWordFullIn) {
        if(!currentWordFullIn){
            currentWordFull = wordSelect(hangmanWords);//IMPORTANT: replace the number with wordSelect (the function) for production use
            wordRef.push(currentWordFull);
            return;
        }
        currentWordFull = currentWordFullIn;
        // parseCurrentWordFull(currentWordFull);
        //set an all upper case version of the current word
        currentWord = currentWordFull.toUpperCase();
        //creates blocks in the DOM indicating where there are letters and spaces

        currentWord.split("").map(function (character) {
            var guessWordBlock = document.getElementById("word-to-guess");

            var domElem = document.createElement("div");

            if (character.match(/[a-z]/i)) {
                domElem.className = "character-block is-letter";

            } else {
                domElem.className = "character-block";
            }

            guessWordBlock.appendChild(domElem);
        });
    }



    var currentWordFull;
    var currentWord;

    // setWordToBeGuessed();

    //firebase update
    lettersPickedRef.on('child_added', function (data) {
        letterElementUpdate(data.val())
    });

    wordRef.on('child_added', function (data) {
        console.log("current word is "+data.val());
        $(".hangman-frames").css("opacity", 0);
        $("#hangman-frame0").css("opacity", 1);
        bodyParts = 0;
        resetAlphabetKeypad();
        removeGraveyardLetters();
        removeCorrectlyGuessedLetters();
        removeFillInTheBlanksAroundOldWord();
        setWordToBeGuessed(data.val())
    });

    var sscoreboardNevBar = document.getElementById("scoreboard-nev-bar");
    
    function addPlayerScoreElement(player) {
        var div = document.createElement("div");
        div.className = "mdl-navigation__link";
        div.id = "player-"+player.id;
        div.innerHTML = player.displayName+" : "+player.score;
        sscoreboardNevBar.appendChild(div);
    }
    
    function updatePlayerScore(player) {
        var div = document.getElementById("player-"+player.id);
        div.innerHTML = player.displayName+" : "+player.score;
    }
    
    var count = 0;
    playersRef.on("child_added", function (snapshot) {
        if(count==0 && thisUser.id == snapshot.key){
            console.log("Generate Word");
            var currentWordFull = wordSelect(hangmanWords);
            wordRef.push(currentWordFull);
            setWordToBeGuessed()
        }
        count++;
        addPlayerScoreElement(snapshot.val());
    });

    playersRef.on("child_changed", function (snapshot) {
        updatePlayerScore(snapshot.val())
    });

    document.getElementById("exit-button").onclick = function () {
        document.location = "/";
    };
    // wordRef.on('child_changed', function (data) {
    //     console.log("child_changed");
    //     console.log(data.val());
    // });

    // lettersPickedRef.on('child_removed', function (data) {
    //
    // });
    //
    // lettersPickedRef.on('child_changed', function (data) {
    //
    // });
})();