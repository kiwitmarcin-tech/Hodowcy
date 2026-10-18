import {breeds} from './config.js';
import {createBoard,legal} from './board.js';
export class Game{
 constructor(count){this.reset(count)}
 reset(count){Object.assign(this,createBoard());this.bank=Array(5).fill(20);this.players=Array.from({length:count},()=>({cards:Array(5).fill(0),buildings:0}));this.order=[...Array(count).keys(),...Array(count).keys()].map((_,i)=>i<count?i:2*count-1-i);this.step=0;this.mode='setup';this.turn=0;this.rolled=false;this.dice='';this.history=[];this.say('Nowa plansza. Rozstaw pierwsze hodowle.')}
 say(t){this.history.unshift(t)}
 canPlace(i,p){return legal(this.verts,i,p)}
 place(i){if(this.mode!=='setup')return false;const p=this.order[this.step];if(!this.canPlace(i,p))return false;this.verts[i].owner=p;this.players[p].buildings++;this.step++;this.say('Gracz '+(p+1)+' stawia hodowlę '+this.players[p].buildings);
 if(this.players[p].buildings===2){const given=[];for(const j of this.verts[i].adj){const b=this.cells[j].breed;if(b>=0&&this.bank[b]>0){this.bank[b]--;this.players[p].cards[b]++;given.push(breeds[b][0])}}this.say('Karty początkowe: '+(given.join(', ')||'brak'))}
 if(this.step===this.order.length){this.mode='play';this.say('Rozstawienie zakończone. Rozpoczyna gracz 1.')}return true}
 roll(){if(this.mode!=='play'||this.rolled)return false;this.rolled=true;const a=1+Math.floor(Math.random()*6),b=1+Math.floor(Math.random()*6);this.dice='Kości: '+a+' + '+b+' = '+(a+b);this.say(this.dice);this.produce(a+b);return true}
 produce(n){if(n===7){this.mode='fci';this.say('Wypadło 7: dotknij heksu, aby przenieść inspektora (odrzucanie i kradzież jeszcze niedostępne).');return}
 const owed=this.players.map(()=>Array(5).fill(0));this.cells.forEach((c,i)=>{if(c.num!==n||i===this.inspector)return;for(const v of c.v)if(this.verts[v].owner>=0)owed[this.verts[v].owner][c.breed]++});
 for(let b=0;b<5;b++){const total=owed.reduce((a,x)=>a+x[b],0);if(total>this.bank[b]){this.say('Brak kart w banku: '+breeds[b][0]);continue}this.players.forEach((p,i)=>{if(owed[i][b]){p.cards[b]+=owed[i][b];this.bank[b]-=owed[i][b];this.say('Gracz '+(i+1)+': +'+owed[i][b]+' '+breeds[b][0])}})}}
 moveInspector(i){if(this.mode!=='fci'||i===this.inspector||this.cells[i].breed<0)return false;this.inspector=i;this.mode='play';this.say('Inspektor przeniesiony.');return true}
 next(){if(this.mode!=='play'||!this.rolled)return false;this.turn=(this.turn+1)%this.players.length;this.rolled=false;this.dice='';return true}
}
