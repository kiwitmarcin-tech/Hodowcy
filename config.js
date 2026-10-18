export const breeds=[["Golden Retriever",4,"#e6c47b"],["Border Collie",4,"#b1d0a2"],["Husky",4,"#b4d4e6"],["Malinois",3,"#dcb18a"],["Whippet",3,"#d6c4dc"]];
export const numbers=[5,2,6,3,8,10,9,12,11,4,8,10,9,4,5,6,3,11];
export const colors=["#c95544","#3984c2","#9960c7","#ce9c25"];
export function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
