/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // My note
 // should use setTimeout for flipping cards

var moves = 0;
var matched = 0;
var openCards = [];

/* List holding all of the cards */
let cardClasses = [
  'fa-diamond',
  'fa-diamond',
  'a-paper-plane-o',
  'a-paper-plane-o',
  'fa-anchor',
  'fa-anchor',
  'fa-bolt',
  'fa-bolt',
  'fa-cube',
  'fa-cube',
  'fa-anchor',
  'fa-anchor',
  'fa-leaf',
  'fa-leaf',
  'fa-bicycle',
  'fa-bicycle',
  'fa-diamond',
  'fa-diamond',
  'fa-bomb',
  'fa-bomb',
];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Call once, upon loading the app initially
function init() {
  restart();
  let cards = document.querySelectorAll('.card');
  addClickBehavior(cards);
  //EXERICSE 0:
  //Record how long it takes to complete the game,
  //grab the inital time here. Then, when matched ==8 record the time again.
  //the total time is the different between these two times.
}

//Call upon the restart button click
function restart() {
  console.log('restart');
  openCards = [];
  moves = 0;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  matched = 0;
  document.getElementsByClassName('moves')[0].innerHTML = moves;

  let cards = document.querySelectorAll('.card');
  resetCards(cards);
  //EXERCISE (1)
  //now update the document to reflect the shuffled cards
}

// to do: reset card styling based off of incorrect moves, update move counters, legal auxillary checks
function addClickBehavior(cards) {
  let firstClick = null;
  let firstClickCard = null;
  let secondClick = null;
  let secondClickCard = null;

  cards.forEach(function(card) {
    card.addEventListener('click', function(e) {
      if(firstClick == null){
        firstClick = this.children[0].className;
        firstClickCard = this;
        card.classList.add('open', 'show');
        openCards.push(card);
        return;
      }

      //only if the firstcard and the second card are in different locations
      if(firstClick != null && secondClick == null) {
        secondClick = this.children[0].className;
        secondClickCard = this;
        card.classList.add('open', 'show');
        openCards.push(card);

        moves += 1;
        document.getElementsByClassName('moves')[0].innerHTML = moves;

        // match found
        if(firstClick == secondClick){
          firstClickCard.classList.add('match');
          secondClickCard.classList.add('match');
          matched += 1;

          //game is complete is 8 matches are found. What to do upon completion
          //if(matched == 8) {
          //}

        // mismatch
        } else {
          setTimeout(function() {
              firstClickCard.classList.remove('open', 'show');
              secondClickCard.classList.remove('open', 'show');
              openCards.pop();
              openCards.pop(); 
          }, 1000);
        }

        firstClick = secondClick = null;
      }
    });
  });
}

function resetCards(cards) {
  cards = shuffle(cards);
  for(let i = 0; i < cards.length; i++){
    cards[i].classList.remove('open', 'show', 'match');
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
