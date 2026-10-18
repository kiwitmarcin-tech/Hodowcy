import {breeds,colors} from './config.js';
const NS='http://www.w3.org/2000/svg';
function el(tag,attrs={},text){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(text!==undefined)e.textContent=text;return e}
export function render(g){const svg=document.getElementById('board');svg.replaceChildren();
 g.cells.forEach((c,i)=>{const points=c.v.map(j=>g.verts[j].x+','+g.verts[j].y).join(' ');svg.appendChild(el('polygon',{points,fill:c.breed<0?'#d7d5c7':breeds[c.breed][2],stroke:'#fff','stroke-width':3,'data-cell':i}));
 svg.appendChild(el('text',{x:c.x,y:c.y-15,'text-anchor':'middle','font-size':13,'font-weight':'bold','pointer-events':'none'},c.breed<0?'Biuro FCI':breeds[c.breed][0]));
 if(c.num!==null&&c.num!==undefined){svg.appendChild(el('circle',{cx:c.x,cy:c.y+12,r:19,fill:'#fff6dc',stroke:'#75694b','pointer-events':'none'}));svg.appendChild(el('text',{x:c.x,y:c.y+18,'text-anchor':'middle','font-size':19,fill:[6,8].includes(c.num)?'#bb2929':'#25372b','pointer-events':'none'},String(c.num)))}
 if(i===g.inspector)svg.appendChild(el('text',{x:c.x,y:c.y+47,'text-anchor':'middle','font-size':22,'pointer-events':'none'},'★'))});
 g.verts.forEach((v,i)=>{const good=g.mode==='setup'&&g.canPlace(i,g.order[g.step]);svg.appendChild(el('circle',{cx:v.x,cy:v.y,r:v.owner>=0?12:good?8:5,fill:v.owner>=0?colors[v.owner]:good?'#36b765':'#e4bd72',stroke:'#5d5137','stroke-width':2,'data-vertex':i}));if(v.owner>=0)svg.appendChild(el('text',{x:v.x,y:v.y+4,'text-anchor':'middle','font-size':12,fill:'white','font-weight':'bold','pointer-events':'none'},String(v.owner+1)))});
 document.getElementById('status').textContent=g.mode==='setup'?'Rozstawienie '+(g.step+1)+'/'+g.order.length+' — gracz '+(g.order[g.step]+1):g.mode==='fci'?'Przenieś inspektora FCI':'Tura gracza '+(g.turn+1);
 document.getElementById('players').replaceChildren();g.players.forEach((p,i)=>{const line=document.createElement('p');line.style.color=colors[i];line.textContent='Gracz '+(i+1)+': '+p.buildings+' hodowle, '+p.cards.reduce((a,b)=>a+b,0)+' kart ('+p.cards.join(' / ')+')';document.getElementById('players').appendChild(line)});
 document.getElementById('dice').textContent=g.dice;document.getElementById('history').textContent=g.history.slice(0,25).join('
');document.getElementById('roll').disabled=g.mode!=='play'||g.rolled;document.getElementById('next').disabled=g.mode!=='play'||!g.rolled;
}
