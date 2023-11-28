// class PokerHand {
//     ranksCombo = [];
//     suitCombo = [];
//
//     constructor(array) {
//         this.array = array;
//     }
//
//     getOutcome() {
//         for(let a of this.array) {
//             this.ranksCombo.push(a.rank);
//             this.suitCombo.push(a.suit);
//         }
//
//         let c = {
//             one: 0,
//             three: 0,
//             four: 0,
//         }
//
//         const objCards = this.ranksCombo.map((value) => {
//             return {count: 1, name: value};
//         });
//
//         objCards.reduce((a, b) => {
//             a[b.name] = (a[b.name] || 0) + b.count;
//             if (a[b.name] === 3) {
//                 c.three++;
//             } else if(a[b.name] === 2 && a[b.name] < 3) {
//                 c.one++;
//             }
//             return a;
//         }, {})
//
//         if (this.suitCombo[0] === this.suitCombo[4]) {
//             return 'flash';
//         } else if(c.three > 0){
//             return 'set';
//         } else if (c.one === 1){
//             return 'one pare';
//         } else if(c.one === 2) {
//             return  'two pare';
//         } else {
//             return 'No combo';
//         }
//     }
//
// }
//
// export default PokerHand;