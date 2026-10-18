import {Game} from './game.js';
import {render} from './renderer.js';
const $=id=>document.getElementById(id);
let game;
function start(){game=new Game(Number($('count').value));render(game)}
$('board').addEventListener('click',e=>{const v=e.target.closest('[data-vertex]'),c=e.target.closest('[data-cell]');if(v){if(game.place(Number(v.dataset.vertex)))render(game)}else if(c){if(game.moveInspector(Number(c.dataset.cell)))render(game)}});
$('new').addEventListener('click',start);
$('roll').addEventListener('click',()=>{if(game.roll())render(game)});
$('next').addEventListener('click',()=>{if(game.next())render(game)});
start();
