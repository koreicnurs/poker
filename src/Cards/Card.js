import React from 'react';
import './Cards.css';

const Card = (props) => {

    const simbols = [`♦`, '♥', '♠', '♣'];
    let s;

    switch (props.suit) {
        case `diams`:
            s = simbols[0];
            break;
        case  'hearts':
            s = simbols[1];
            break;
        case 'spades':
            s = simbols[2];
            break;
        case 'clubs':
            s = simbols[3];
            break;
        default:
            props.suit = '';
    }

    return (
        <>
            <div className='flip-card'>
                <div className="flip-card-inner">
                    <div className={`card rank-${(props.rank).toLowerCase()} ${props.suit} flip-card-front`}>
                        <span className="rank">{props.rank}</span>
                        <span className="suit">{s}</span>
                    </div>
                </div>

                <div className='card flip-card-back'>
                </div>
            </div>
        </>

    )
}

export default Card;