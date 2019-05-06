/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // My note
 // should use setTimeout for flipping cards

let moves = 0;
let matched = 0;
let openCards = [];

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

// reset all of the variables used in Game
// call shuffle array
function restart() {
  let openCards = [];
  let moves = 0;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  let matched = 0;
  document.getElementsByClassName('moves')[0].innerHTML = moves;

  let cards = document.querySelectorAll('.card');
  addClickBehavior(cards);
  applyShuffle(cards);
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
          if(matched == 8) {

          }

        // mismatch
        } else {
          setTimeout(function() {
              firstClickCard.classList.remove('open', 'show');
              secondClickCard.classList.remove('open', 'show');
              openCards.pop();
              openCards.pop(); 
          }, 1000);
          console.log('mismatch');
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

// get children of cards, remove class, use array provided
function applyShuffle(cards) {
  resetCards(cards);
  for(let i = 0; i < cards.length; i++){
    //console.log(cards, cards[i], cards[i].firstChild, cards[i].children[0]);
    //cards.children[0].className = 'fa ' + cardClasses[i];
    //console.log(cards[i].firstChild);
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
