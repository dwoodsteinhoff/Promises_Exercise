
//part 1 
let baseURL = "http://numbersapi.com"
let numberFacts = [];

for (let i = 0; i <4; i++){
    numberFacts.push(
        axios.get(`${baseURL}/4?json`)
    )
}    

Promise.all(numberFacts)
    .then(fact => {
        for (let i =0; i <4; i++){
            console.log(fact[i].data.text)
        }
    })



// part 2 a

let shuffleURL = "https://deckofcardsapi.com/api/deck"

function drawOneCard (){
    axios
        .get(`${shuffleURL}/new/draw/`)
        .then(res => {
            console.log(`The card drawn is a ${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
        })
}

// part 2 b

function getAnotherCard (){
    let firstCard = null;
    axios
        .get(`${shuffleURL}/new/draw/`)
        .then(res => {
            firstCard = res.data.cards[0]
            let deckId = res.data.deck_id
            return axios.get(`${shuffleURL}/${deckId}/draw/`)
        })
        .then(res => {
            let secondCard = res.data.cards[0]
            console.log(`The card drawn is a ${firstCard.value} of ${firstCard.suit}`)
            console.log(`The card drawn is a ${secondCard.value} of ${secondCard.suit}`)
        })
}

// part 2 c

let $btn = $('button')
let $cards = $('#cards')
let deckId = null;

function drawCards (){
    axios
        .get(`${shuffleURL}/new/shuffle`)
        .then(res => {
            deckId = res.data.deck_id
        })

    $btn.on('click', function(){
        axios
            .get(`${shuffleURL}/${deckId}/draw`)
            .then(res =>{
                let cardPic = res.data.cards[0].image
                $cards.append(
                    $('<img>', {
                        src : cardPic
                    })
                )
                if (res.data.remaining === 0){
                    $btn.remove();
                }
            })
    })
}

drawCards()