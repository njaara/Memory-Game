/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


var moves = 0;
var matched = 0;
var openCards = [];
var startTime = null;
var startTimeTick = null;
var score = '5 stars';
var isFirstClick = false;


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

// Call once, upon initial load
function init() {
  restart(true);
  let cards = document.querySelectorAll('.card');
  addClickBehavior(cards);
  addUniqueID(cards);
}

// Open modal
function modalBox(mins, seconds, moves, myStars) {
  var modal = document.getElementById('my-modal');
  var span = document.getElementsByClassName('close')[0];

  modal.style.display = 'block';

  span.onclick = function() {
    modal.style.display = 'none';
  }

  document.getElementsByClassName('final-mins')[0].innerHTML = mins;
  document.getElementsByClassName('final-secs')[0].innerHTML = seconds;
  document.getElementsByClassName('final-moves')[0].innerHTML = moves;
  document.getElementsByClassName('final-score')[0].innerHTML = score;
}

function replayButton() {
  var mod = document.getElementsByClassName('modal');
  var button = document.getElementById('replay-button');
  document.getElementById('replay-button').addEventListener('click', playAgain(mod[0]));
}

function playAgain(modal) {
  location.reload();

  openCards = [];
  moves = 0;
  matched = 0;

  document.getElementsByClassName('moves')[0].innerHTML = moves;

  var cards = document.querySelectorAll('.card');
  resetCards(cards);
}

/* To avoid pressing the same card twice and getting a match,
   add a id in the set {0,...,15} to each card */
function addUniqueID(cards) {
  let id = 0;
  cards.forEach(function(card) {
    card.classList.add(id);
    id += 1;
  })
}

// called on restart button click
function restart(isInit = false) {
  if(!isInit) {
    location.reload();
  }

  openCards = [];
  moves = 0;
  matched = 0;
  document.getElementsByClassName('moves')[0].innerHTML = moves;

  var cards = document.querySelectorAll('.card');
  resetCards(cards);
}

/* To avoid pressing the same card twice and getting a match,
   add a id in the set {0,...,15} to each card */
function addUniqueID(cards) {
  let id = 0;
  cards.forEach(function(card) {
    card.classList.add(id);
    id += 1;
  })
}

function addClickBehavior(cards) {
  var firstClick = null;
  var firstClickCard = null;
  var secondClick = null;
  var secondClickCard = null;

  cards.forEach(function(card) {
    card.addEventListener('click', function(e) {
      if(firstClick == null){
        if(!isFirstClick) {
          isFirstClick=true;
          startTime = new Date();
          startTimeTick = startTime.getTime();
        }

        firstClick = this.children[0].className;
        firstClickCard = this;
        card.classList.add('open', 'show');
        openCards.push(card);
        return;
      }

      if(firstClick != null && secondClick == null &&
        firstClickCard.classList[1] != card.classList[1]) {
        secondClick = this.children[0].className;
        secondClickCard = this;
        card.classList.add('open', 'show');
        openCards.push(card);

        moves += 1;
        document.getElementsByClassName('moves')[0].innerHTML = moves;

        starRating();

        // match found
        if(firstClick == secondClick) {
          firstClickCard.classList.add('match');
          secondClickCard.classList.add('match');
          matched += 1;

          // game is complete is 8 matches are found. What to do upon completion
          if(matched == 8) {
            var endTime = new Date();
            var endTimeTick = endTime.getTime();
            console.log(endTimeTick, startTimeTick, (endTimeTick - startTimeTick)/1000);

            let seconds = Math.floor((endTimeTick - startTimeTick)/1000) % 60;
            let mins = Math.floor((endTimeTick - startTimeTick)/1000/60);

            console.log('minutes: ' + mins);
            console.log('seconds: ' + seconds);

            modalBox(mins, seconds, moves);

          }

        // mismatch
        } else {
          setTimeout(function() {
              firstClickCard.classList.remove('open', 'show');
              secondClickCard.classList.remove('open', 'show');
              openCards.pop();
              openCards.pop();
          }, 700);
        }

        firstClick = secondClick = null;
      }
    });
  });
}

function starRating() {
  let myStars = document.getElementsByClassName('stars')[0];

  if(moves == 11) {
    myStars.getElementsByClassName('fa-star')[0].classList.remove('fa-star');
    score = '4 stars';
  }

  if(moves == 14) {
    myStars.getElementsByClassName('fa-star')[0].classList.remove('fa-star');
    score = '3 stars';
  }

  if(moves == 17) {
    myStars.getElementsByClassName('fa-star')[0].classList.remove('fa-star');
    score = '2 stars';
  }

  if(moves == 20) {
    myStars.getElementsByClassName('fa-star')[0].classList.remove('fa-star');
    score = '1 star';
  }
}

function resetCards(cards) {
  let deck = document.getElementsByClassName('deck');
  let arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  arr = shuffle(arr);

  let cardsTy = [];
  //retrieve the mapping from number of i -> type of card
  for(let i = 0; i < cards.length; i++){
    let cardTy = document.getElementsByClassName('card')[i].childNodes[1].classList[1];
    cardsTy.push(cardTy);
  }
  //modify the DOM to the shuffled card types
  for(let i = 0; i < cards.length; i++) {
    let cardTy = document.getElementsByClassName('card')[i].childNodes[1].classList;
    cardTy.remove('fa-bicycle', 'fa-bomb', 'fa-paper-plane-o', 'fa-cube',
                  'fa-diamond', 'fa-bolt', 'fa-leaf', 'fa-anchor');
    cardTy.add(cardsTy[arr[i]]);
  }

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
