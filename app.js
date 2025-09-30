let cards = [
    {
        name:'hippo',
        id:'<i class="fa-solid fa-hippo"></i>'
    },
    {
        name:'dog',
        id:'<i class="fa-solid fa-dog"></i>'
    },
    {
        name:'cow',
        id:'<i class="fa-solid fa-cow"></i>'
    },
    {
        name:'fish',
        id:'<i class="fa-solid fa-fish"></i>'
    },
    {
        name:'frog',
        id:'<i class="fa-solid fa-frog"></i>'
    },
    {
        name:'spider',
        id:'<i class="fa-solid fa-spider"></i>'
    },
    {
        name:'hippo',
        id:'<i class="fa-solid fa-hippo"></i>'
    },
    {
        name:'dog',
        id:'<i class="fa-solid fa-dog"></i>'
    },
    {
        name:'cow',
        id:'<i class="fa-solid fa-cow"></i>'
    },
    {
        name:'fish',
        id:'<i class="fa-solid fa-fish"></i>'
    },
    {
        name:'frog',
        id:'<i class="fa-solid fa-frog"></i>'
    },
    {
        name:'spider',
        id:'<i class="fa-solid fa-spider"></i>'
    }
];

shuffleCards();

let board = document.getElementById("gameBoard");

displayCards();

let flippedCards = [];
let matchedPairs = 0;

function shuffleCards(){
    for (let i = cards.length-1; i >= 0; i--){
        const randIndex = Math.floor(Math.random()*(i+1));
        [cards[i], cards[randIndex]] = [cards[randIndex], cards[i]];
    }
}

function displayCards(){
    cards.forEach((card, index, arr) => {
      card = document.createElement('div');
      card.setAttribute('id', index);
      card.classList.add('cardback');
      card.classList.add('active');
      board.append(card);
      card.addEventListener('click', flipCard);
    })
}

function flipCard(){
    if(flippedCards.length < 2 && this.classList.contains('active')){
        let cardId = this.id;
        flippedCards.push(this);
        this.classList.remove('cardback');
        this.innerHTML = cards[cardId].id;
        if(flippedCards.length === 2){
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch(){
    let card1Id = flippedCards[0].getAttribute('id');
    let card2Id = flippedCards[1].getAttribute('id');
    if(cards[card1Id].name === cards[card2Id].name){
        flippedCards.forEach((card) => {
            card.style.border = 'none';
            card.style.backgroundColor = '#f5e8ba';
            card.classList.remove('active');
            card.innerHTML = '';
        })
        matchedPairs++;
        checkGameOver();
    }
    else{
        flippedCards.forEach((card) => {
            card.classList.add('cardback');
            card.innerHTML = '';
        })
    }
    flippedCards = [];
}

function checkGameOver(){
    if(matchedPairs == cards.length/2){
        while(board.firstChild){
            board.removeChild(board.firstChild);
        }
        board.innerHTML = `
            <div class="won">
                <i class="fa-solid fa-trophy"></i> You Won! <br>
                <div><button onclick="restartGame()">Restart</button></div>
            </div>`;
        board.classList.remove('game');
        board.classList.add('won');
    }
}

function restartGame(){
    board.classList.remove('won');
    board.classList.add('game');
    board.innerHTML = '';
    matchedPairs = 0;
    flippedCards = [];
    shuffleCards();
    displayCards();
}