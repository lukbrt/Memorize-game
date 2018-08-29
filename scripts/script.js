// let array  = ["el1", "el2", "123", "555"];

// let signCounter = array.reduce((counter, currentElement) => counter += currentElement.length, 0);
// console.log(signCounter);

// let TwoLastEls = array
//     .filter((e, i) => i >= 1)
//     .map((e, i) => e.toUpperCase())
//     .forEach((e, i) => console.log(`array[${i}] = ${e}`));


let cardAmount = 16;
const INITIAL_TIME = 120;
//********TEST************* passedCounter = 0
let passedCounter = 0, turns = 0;
let $cardContainer = $('#cardsContainer');
let $cardSet = $('#cardsContainer.card');
let $counterEl = $('#counter');
let cardsArray = Array(cardAmount);
let bgArray = ['bunny', 'cat', 'chicken', 'cow', 'dog', 'duck', 'pig', 'sheep'];
let pair = {
        first: 0,
        second: 0,

        hideCard: function()
        {
            this.first.animate({opacity: 0}, () => {
                $(this).addClass('hidden');
            });
            this.second.animate({ opacity: 0 }, () => {
                $(this).addClass('hidden');
            });
            // this.second.fadeOut(300, 'swing', () => {
            //     $(this).addClass('hidden');
            // });
            // this.second.fadeOut(300).addClass('hidden');
        }
    };
let timer = {
    $timer: $('timer'),
    $min: $('#timer span#min'),
    $sec: $('#timer span#sec'),
    time: INITIAL_TIME //120
};
let countDownTimer;

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
    // turns = 0;
    // passedCounter = 0;
    let $newItem;
    $cardContainer.css('opacity', 0);

    for (let i = 0; i < cardAmount; i++) 
    {
        $newItem = $('<div class="card"></div>');
        $newItem.attr('id', 'card' + i);
        $newItem.on('click', reverse);
        $cardContainer.append($newItem);
    }

    randomizeCards();
    $cardContainer.animate({'opacity': 1}, 'slow');
    $(window).on("load", timerEventInitializer);
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


// function reverseCard()
// {
//     if ((pair.first === 0 || pair.second === 0) && isReversable(this))
//     {
//         reverse(this);
//     }
// }

// function canReverse()
// {
//     return first === 0 || second === 0;
// }

//TODO
// function isReversable(card)
// {
//     return true;
// }

function reverse()
{
    if ((pair.first === 0 || pair.second === 0)) 
    {
        let $cardEl = $(this);
        let num = getCardNumber(this);

        if (!cardsArray[num].isHidden)
        {
            $cardEl
                .transition({
                    perspective: '160px',
                    rotateY: '180deg'
                }, 'slow')
                .css({
                        backgroundImage: 'url(res/animals/' + cardsArray[num].bg + ')',
                        backgroundSize: 'cover'
            });

            if (pair.first === 0) {
                // first = num;
                pair.first = $cardEl;
            }
            else if (pair.second === 0) {
                // second = num;
                let firstNum = getCardNumber(pair.first);

                if (num === firstNum) {
                    return;
                }

                pair.second = $cardEl;

                if (checkEquality(cardsArray[num].bg, cardsArray[firstNum].bg)
                    && !cardsArray[num].isHidden && !cardsArray[firstNum].isHidden)
                {
                    pair.hideCard();
                    cardsArray[num].isHidden = true;
                    cardsArray[firstNum].isHidden = true;
                    passedCounter += 2;
                }
                reverseCard(pair.first);
                reverseCard(pair.second);
            }

            incrementTurnCounter();
            checkWin();
        }
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

function reverseCard(card)
{

    setTimeout(() =>
        {
        $(card).transition({
                rotateY: '0deg',
            }, 'slow')
            .css({
                backgroundImage: 'url(../res/full-bloom.png)',
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

function incrementTurnCounter()
{
    ++turns;
    $counterEl
        .animate({ opacity: 0 })
        .queue(function () {
            $(this).text(turns)
                .dequeue()
        })
        .animate({ opacity: 1 }); 
}

//TODO
function checkWin()
{
    if (passedCounter === cardAmount || timer.time <= 0)
    {
        let $endEl = $('#endStmt');
        let endCode = '';

        if (passedCounter === cardAmount) 
        {
            endCode = '<p class="statement">Congratulations, you collected all animals.<br>Wanna hunt again?</p><div style="margin:auto; text-align: center"> <a href="#" class="button">YES</a></div >';
            // $cardContainer.append($winEl);
            // alert("Congratulations, you collected all animals. Wanna hunt again?");
        }
        else if (timer.time <= 0) 
        {
            let failStatement = 'All Animals have fled. You collected only <strong style="color: red;">' + passedCounter + '</strong> animals... :(<br>Do you want to try again in another place?';
            endCode = '<p class="statement">' + failStatement + '</p><div style="margin:auto; text-align: center"> <a href="#" class="button">YES</a></div >';
        }

        setTimeout(() => {

            clearInterval(countDownTimer);
            $endEl.html(endCode);
            $endEl.css('display', 'block');
            $button = $endEl.find('div a.button');
            $button.on('click', () => {
                //reset*****************
                // e.preventDefault();

                $endEl.animate({ 'opacity': 0 }, 'slow').addClass('hidden');
                reset();
            });
            // $winEl.addClass('flex-container');
            // let $statement = $('<p>').html("Congratulations, you collected all animals. Wanna hunt again?<br>");
            // $statement.addClass('statement');
            // let $acceptButton = $('<div>').text("YES");
            // $acceptButton.addClass('button');
            // $winEl.append($statement);
            // $winEl.append($acceptButton);

            $cardContainer.empty();
            $('.container').append($endEl);
        }, 1000);
    }
}

function timerEventInitializer()
{
    countDownTimer = setInterval(() => {
        timer.$min.text(Math.floor(timer.time / 60));
        let seconds = Math.ceil(timer.time % 60);
        if (seconds === 0) {
            seconds = '00';
        }
        timer.$sec.text(seconds);
        //  animate({
        //             opacity: 0
        //         }, 300, function () {
        //     $(this).text(Math.ceil(timer.time % 60))
        // });
        // timer.$sec.animate({
        //     opacity: 100
        // }, 300);
        timer.time--;
        if (timer.time <= 0) {
            clearInterval(countDownTimer);
        }
    }, 1000);
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

function reset()
{
    turns = 0;
    passedCounter = 0;
    timer.time = INITIAL_TIME;
    timer.$min.text(Math.floor(INITIAL_TIME / 60));
    timer.$sec.text(Math.ceil(INITIAL_TIME % 60));
    $counterEl.text(turns);
    pair.first = 0;
    pair.second = 0;

    initializeBoard();
    timerEventInitializer();
}