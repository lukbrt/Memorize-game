// let array  = ["el1", "el2", "123", "555"];

// let signCounter = array.reduce((counter, currentElement) => counter += currentElement.length, 0);
// console.log(signCounter);

// let TwoLastEls = array
//     .filter((e, i) => i >= 1)
//     .map((e, i) => e.toUpperCase())
//     .forEach((e, i) => console.log(`array[${i}] = ${e}`));


let cardAmount = 16;
let passedCounter = 0;
let $cardContainer = $('#cardsContainer');
let $cardSet = $('#cardsContainer.card');
let cardsArray = Array(cardAmount);
let bgArray = ['bunny', 'cat', 'chicken', 'cow', 'dog', 'duck', 'pig', 'sheep'];
let pair = {
        first: 0,
        second: 0,

        hide: function()
        {
            this.first.addClass('hidden');
            this.second.addClass('hidden');
            passedCounter += 2;
        }
    };

let swapCounter = 0;
// let first = false, second = false;

function Card(number, bg)
{
    this.number = number;
    this.isHidden = false;
    this.bg = bg;
    this.active = false;
}

/* ********************************* */
initializeBoard();


/* ********************************* */
/* *******  Functions    *********** */
/* ********************************* */

function initializeBoard()
{
    let $newItem;

    for (let i = 0; i < cardAmount; i++) {
        $newItem = $('<div class="card"></div>');
        $newItem.attr('id', 'card' + i);
        $newItem.on('click', reverseCard);
        $cardContainer.append($newItem);
    }

    randomizeCards();
}

function randomizeCards()
{
    let drawnCard = "";
    const extenstion = '.png';

    // let drawnMap = new Map();
    // cardsArray.forEach(n, i => drawnMap.set(i, 2));
    let tmpArray = bgArray.concat(bgArray);
    shuffleArray(tmpArray);
    for (let i = 0; i < cardAmount; i++)
    {
        drawnCard = tmpArray[i] + extenstion;
        cardsArray[i] = new Card(i, drawnCard);
    }
}

function checkEquality(firstBg, secondBg) 
{
    return firstBg !== 0 && secondBg !== 0 && firstBg === secondBg;
}


function reverseCard()
{
    if ((pair.first === 0 || pair.second === 0) && isReversable(this))
    {
        reverse(this);
    }
}

// function canReverse()
// {
//     return first === 0 || second === 0;
// }

//TODO
function isReversable(card)
{
    return true;
}

function reverse(card)
{
    let $cardEl = $(card);
    let num = getCardNumber(card);

    $cardEl.css({
        backgroundImage: 'url(/res/animals/' + cardsArray[num].bg + ')',
        backgroundSize: 'cover'
    });

    if (pair.first === 0)
    {
        // first = num;
        pair.first = $cardEl;
    }
    else if (pair.second === 0)
    {
        // second = num;
        let firstNum = getCardNumber(pair.first);

        if (num === firstNum)
        {
            return;
        }

        pair.second = $cardEl;

        if (checkEquality(cardsArray[num].bg, cardsArray[firstNum].bg))
        {
            pair.hide();
        }
            hideCard(pair.first);
            hideCard(pair.second);
    }
    else if (pair.second !== 0)
    {
        alert("second not zero");
    }

    // $('#cardsContainer').children('div').each(function (i) {
    //     $(this).css({
    //         backgroundImage: 'url(/res/animals/' + cardsArray[i].bg + ')',
    //         backgroundSize: 'cover'
    //     });
    // })

    // card.reversed = !card.reversed;

    // card.css('background-color', 'green');
    

}

// function hideCards()
// {
//     let firstCard = $('card' + first),
//         secondCard = $('card' + second);

    
// }

function hideCard(card)
{
    // card.delay(1000).css({
    //     backgroundImage: 'url(/res/full-bloom.png)',
    //     backgroundSize: 'initial'
    // });

    setTimeout(() =>
        {
            $(card).css({
                backgroundImage: 'url(/res/full-bloom.png)',
                backgroundSize: 'initial'
            });

            if (pair.first !== 0)
            {
                pair.first = 0;
            }
            else if (pair.second !== 0)
            {
                pair.second = 0;
            }
        }, 1000);
}

function getCardNumber(card)
{
    return ($(card).attr("id")).substring(4);
}

function shuffleArray(array) 
{
    for (let i = array.length - 1; i > 0; i--) 
    {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}