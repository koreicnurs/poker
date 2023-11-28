import {useEffect, useState} from "react";
import './App.css';
import Card from "./Cards/Card";
import './App.css';
import CardOP from "./Cards/CardOP";

const App = () => {
    const [state, setState] = useState({
        getRandomArray: [],
        getCardsCombo: '',
    });
    const [state2, setState2] = useState({
        getRandomArrayOp: [],
        getCardsComboOp: '',
    });
    const [deckState, setDeckState] = useState([])
    const [winPL, setWinPL] = useState();
    const [winOP, setWinOP] = useState();
    const [win, setWin] = useState('');
    const [money, setMoney] = useState(1500);
    const [betMoney, setBetMoney] = useState(0);
    const [betMoneyOP, setBetMoneyOP] = useState(0);
    const [play, setPlay] = useState(false)
    const [refreshDeck, setRefreshDeck] = useState(false)

    let ranksCombo = [];
    let suitCombo = [];

    useEffect(() => {
        if(win === 'Player') {
            setMoney(prevState => prevState + betMoney + betMoneyOP)
        } else if(win === 'OP') {
            setMoney(prevState => prevState - betMoney)
        } else if(win === 'Draw'){
            // setMoney(prevState => Number(prevState + betMoney))
        }
    }, [play])

    useEffect(() => {
        if(winPL === winOP) {
            setWin('Draw')
        } else if(winPL > winOP) {
            setWin('Player')
        } else if(winPL < winOP) {
            setWin('OP')
        }
    },[winPL, winOP])

    useEffect(() => {

        switch (state.getCardsCombo) {
            case `One Pair`:
                setWinPL(1)
                break;
            case  'Two Pairs':
                setWinPL(2)
                break;
            case 'Three of a Kind':
                setWinPL(3)
                break;
            case 'Straight':
                setWinPL(4)
                break;
            case 'Flush':
                setWinPL(5)
                break;
            case 'Full House':
                setWinPL(6)
                break;
            case 'Four of a Kind':
                setWinPL(7)
                break;
            case 'Straight Flush':
                setWinPL(8)
                break;
            case 'Flush Royal':
                setWinPL(9)
                break;
            default:
                setWinPL(0)
        }

        switch (state2.getCardsComboOp) {
            case `One Pair`:
                setWinOP(1)
                break;
            case  'Two Pairs':
                setWinOP(2)
                break;
            case 'Three of a Kind':
                setWinOP(3)
                break;
            case 'Straight':
                setWinOP(4)
                break;
            case 'Flush':
                setWinOP(5)
                break;
            case 'Full House':
                setWinOP(6)
                break;
            case 'Four of a Kind':
                setWinOP(7)
                break;
            case 'Straight Flush':
                setWinOP(8)
                break;
            case 'Flush Royal':
                setWinOP(9)
                break;
            default:
                setWinOP(0)
        }
    }, [state.getCardsCombo, state2.getCardsComboOp]);

    useEffect(() => {
        setDeckState(cardDeck)
    }, [refreshDeck]);

    const suits = ["hearts", "spades", "clubs", "diams"];
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let cardDeck = [];
    let getRandomCards = [];

    for (let s = 0; s < suits.length; s++) {
        for (let r = 0; r < ranks.length; r++) {
            let card = { suit: suits[s], rank: ranks[r] };
            cardDeck.push(card);
        }
    }

    const getCard = () => {
        const randomCard = deckState[Math.floor(Math.random() * deckState.length)]
        deckState.splice(deckState.indexOf(randomCard), 1);
        return randomCard;
    }

    const getCards = (howMany) => {
        let i = 0;

        while (i < howMany) {
            getRandomCards.push(getCard());
            i++;
        }

        return getRandomCards;
    }

    const getRandom = () => {
        const cardArray = getCards(5);
        const comboStr = getOutcome(cardArray);

        return setState({
            getRandomArray: cardArray,
            getCardsCombo: comboStr,
        })
    }

    const getRandomOp = () => {
        const cardArray = getCards(5);
        const comboStr = getOutcome(cardArray);

        return setState2({
            getRandomArrayOp: cardArray,
            getCardsComboOp: comboStr,
        })
    }

    // const getCardsRank = (rank) => {
    //     return ranks.indexOf(rank)
    // }

    // let arrayPL = [
    //     {suit: 'clubs', rank: '5'},
    //     {suit: 'diams', rank: '4'},
    //     {suit: 'diams', rank: '3'},
    //     {suit: 'diams', rank: '2'},
    //     {suit: 'diams', rank: '6'},
    // ]

    const checkCombinations = (hand) => {
        const ranksCount = {};
        const suitsCount = {};
        const ranksCombo = [];

        // Подсчет количества карт каждого ранга и масти
        hand.forEach((card) => {
            ranksCount[card.rank] = (ranksCount[card.rank] || 0) + 1;
            suitsCount[card.suit] = (suitsCount[card.suit] || 0) + 1;
        });

        // Проверка наличия пары
        const pairs = Object.values(ranksCount).filter((count) => count === 2).length;
        const sortedHand = [...hand].sort((a, b) => ranks.indexOf(a.rank) - ranks.indexOf(b.rank));

        for(let card of sortedHand) {
            ranksCombo.push(card.rank)
        }

        let isStraight = true;
        if(isStraight && ranksCombo[0] === '10' && Object.values(suitsCount).includes(5)) {
            return 'Flush Royal'
        }


        for (let i = 0; i < sortedHand.length - 1; i++) {
            const currentRankIndex = ranks.indexOf(sortedHand[i].rank);
            const nextRankIndex = ranks.indexOf(sortedHand[i + 1].rank);

            if (nextRankIndex - currentRankIndex !== 1) {
                isStraight = false;
            }
            if(nextRankIndex - currentRankIndex === 9) {
                isStraight = true;
            }
        }

        // for(let i = 0; i < ranks - 4; i++) {
        //     isStraight = true;
        //
        //     for(let j = 0; j < ranksCombo.length; j++) {
        //         if(j === (ranksCombo.length - 1) && ranks[ranksCombo.length - 1] === 'A') {
        //             break
        //         }
        //
        //         if(ranksCombo[j] !== ranks[j + i]) {
        //             isStraight = false
        //             break
        //         }
        //     }
        //     if(isStraight) break
        // }

        // Проверка наличия стрит-флеша
        const isStraightFlush = isStraight && Object.values(suitsCount).includes(5);
        if (isStraightFlush) {
            return 'Straight Flush';
        }

        // Проверка наличия флеша
        if (Object.values(suitsCount).includes(5)) {
            return 'Flush';
        }

        // Проверка наличия каре
        if (Object.values(ranksCount).includes(4)) {
            return 'Four of a Kind';
        }

        // Проверка наличия тройки
        if (Object.values(ranksCount).includes(3)) {
            // Проверка наличия фулл-хауса (тройки и одной пары)
            if (pairs === 1) {
                return 'Full House';
            }
            return 'Three of a Kind';
        }

        if(isStraight) {
            return 'Straight';
        }

        // Проверка наличия двух пар
        if (pairs === 2) {
            return 'Two Pairs';
        }

        if (pairs === 1) {
            return 'One Pair';
        }

        // Вернуть 'No Combination' в случае, если ни одна из комбинаций не найдена
        return 'No Combination';
    };
    // return checkCombinations(arrayPL)

    const getOutcome = (array) => {

        for(let a of array) {
            ranksCombo.push(a.rank);
            suitCombo.push(a.suit);
        }

        // const sortedCards = array.sort((card1, card2) => {
        //     return getCardsRank(card1.rank) - getCardsRank(card2.rank)
        // })
        return checkCombinations(array)
    }

    const goBet = () => {
        if(betMoney <= money) {
            setMoney(prevState => prevState - betMoney)
        }
    }

    const priceBet = (e) => {
        e.preventDefault()
        setBetMoney(Number(e.target.value))
        setBetMoneyOP(Number(e.target.value))
    }

    const goPlay = () => {
        if(play === false) {
            setPlay(true)
        } else {
            setPlay(false)
        }
    }

    const refresh = () => {
        setState({
            getRandomArray: [],
            getCardsCombo: '',
        })
        setState2({
            getRandomArrayOp: [],
            getCardsComboOp: '',
        })
        if(refreshDeck === false) {
            setRefreshDeck(true)
        } else {
            setRefreshDeck(false)
        }
    }
    
    return (
        <>
            <div className="playingCards fourColours faceImages">
                <div className="combo bank-roll">{money}</div>
                {
                    state.getRandomArray.map((i, index) => {
                        return (
                            <Card key={index} rank={i.rank} suit={i.suit} />
                        );
                    })
                }
                <div>
                    {/*<button type="button" className="btn" onClick={() => goBet()}>Bet</button>*/}
                    <label>
                        Place Bet
                        <input type="text" onChange={e => priceBet(e)}/>
                    </label>
                </div>
            </div>
            <div className="playingCards fourColours faceImages">
                {
                    state2.getRandomArrayOp.map((i, index) => {
                        return (
                            <CardOP key={index} rank={i.rank} suit={i.suit} />
                        );
                    })
                }
            </div>
            <p className='combo'>{state.getCardsCombo}</p>
            <p className='combo'>{state2.getCardsComboOp}</p>
            <div>
                <button type="button" className="btn" onClick={() => getRandom()}>New Deck PL</button>
                <button type="button" className="btn new-deck" onClick={() => getRandomOp()}>New Deck OP</button>
                {
                    !betMoneyOP
                        ?
                        <button disabled type="button" className="btn" onClick={() => goPlay()}>Place a bet</button>
                        :
                        <button  type="button" className="btn" onClick={() => goPlay()}>Play</button>
                }
                <button type="button" className="btn" onClick={() => refresh()}>Play again</button>
            </div>
            <div>
                {
                    <p className='combo'>{win}</p>
                }
            </div>
        </>
    );
}

export default App;
