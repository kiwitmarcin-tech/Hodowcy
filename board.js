import {breeds,numbers,shuffle} from './config.js';
export function createBoard(){
 const cells=[],verts=[],m=new Map(),s=65;
 for(let r=-2;r<=2;r++)for(let q=-2;q<=2;q++)if(Math.abs(q+r)<=2){
 const x=375+Math.sqrt(3)*s*(q+r/2),y=345+1.5*s*r,v=[];
 for(let k=0;k<6;k++){const a=(60*k-30)*Math.PI/180,px=x+s*Math.cos(a),py=y+s*Math.sin(a),key=Math.round(px*100)+','+Math.round(py*100);
 if(!m.has(key)){m.set(key,verts.length);verts.push({x:px,y:py,adj:[],nb:new Set(),owner:-1})}
 const id=m.get(key);v.push(id);verts[id].adj.push(cells.length)}
 cells.push({q,r,x,y,v})}
 cells.forEach(c=>c.v.forEach((id,k)=>{const j=c.v[(k+1)%6];verts[id].nb.add(j);verts[j].nb.add(id)}));
 const types=shuffle(breeds.flatMap((b,i)=>Array(b[1]).fill(i)).concat([-1]));
 cells.forEach((c,i)=>c.breed=types[i]);
 const ring=n=>cells.map((c,i)=>({...c,i})).filter(c=>Math.max(Math.abs(c.q),Math.abs(c.r),Math.abs(c.q+c.r))===n)
 .sort((a,b)=>((Math.atan2(a.y-345,a.x-375)+Math.PI*2+Math.PI*5/6)%(2*Math.PI))-((Math.atan2(b.y-345,b.x-375)+Math.PI*2+Math.PI*5/6)%(2*Math.PI)));
 const nums=[...numbers];
 // Write onto original cells, not the temporary ring copies.
 [...ring(2),...ring(1),...ring(0)].forEach(c=>{cells[c.i].num=c.breed===-1?null:nums.shift()});
 return {cells,verts,inspector:cells.findIndex(c=>c.breed===-1)};
}
export function distance(verts,a,b){if(a===b)return 0;const seen=new Set([a]);let f=[a];for(let d=1;d<=3;d++){const n=[];for(const v of f)for(const j of verts[v].nb)if(!seen.has(j)){if(j===b)return d;seen.add(j);n.push(j)}f=n}return 99}
export function legal(verts,i,p){const v=verts[i];if(v.owner!==-1||[...v.nb].some(j=>verts[j].owner!==-1))return false;const own=verts.map((v,j)=>v.owner===p?j:-1).filter(j=>j>=0);return !own.length||own.some(j=>distance(verts,i,j)<=3)}
