function getRandomValueForColor() { 
	return Math.floor(Math.random() *255);
}
function getRandomColor(){
    return `rgb=${getRandomValueForColor()},${getRandomValueForColor()},${getRandomValueForColor()}`
}

const rgb=[];

for (let index = 0; index < 20; index++) {
    rgb.push(getRandomColor());

}

async function getColorNames(color){
    const response=await fetch(`https://www.thecolorapi.com/id?${color}`)
    const data=await response.json()
    return data.name.value
}
async function getColorList(){
    const promises=rgb.map(el=>{
    return getColorNames(el)
})
 const colorNames=await Promise.all(promises)
 return colorNames
}
getColorList().then(colorNames=>{

    console.log(colorNames)
const result = document.getElementById('results')

function renderList(_list=[],el=document.body){
    el.innerHTML='';
  _list.forEach(i=>{
    let new_el = document.createElement('li')
    new_el.innerHTML=i
    el.appendChild(new_el)
  })
}
renderList(colorNames,result)

function filter(val,colorNames){
  return colorNames.filter(i=>(~i.indexOf(val)))
};


document.getElementById('search').addEventListener('input',e=>renderList(filter(e.target.value,colorNames),result))
})
