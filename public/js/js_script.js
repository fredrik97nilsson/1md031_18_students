
printBurgers(0);

document.getElementById("filterBy").onchange=function() {
  printBurgers();
}

document.getElementById("sortBy").onchange=function() {

  printBurgers();

}

function sortList(burgerList){
  var sortType=document.getElementById("sortBy").value;
  if(sortType==0){
    return burgerList;
  }
  else if(sortType==1){
    newBurgerList=lowToHigh(burgerList);
  }
  else if(sortType==2){
    newBurgerList=highToLow(burgerList);
  }
  return newBurgerList
}

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

function lowToHigh(burgerList){
  var newBurgerList=[];
  for(var i=0;i<burgerList.length;i++){
    if(i==0){
      newBurgerList[i]=burgerList[i];
    }
    else{
      var j=0;
      while(j<i && burgerList[i].kCal>newBurgerList[j].kCal){
        j=j+1;
      }
      newBurgerList.insert(j,burgerList[i]);
    }
  }
  return newBurgerList
}

function highToLow(burgerList){
  var newBurgerList=[];
  for(var i=0;i<burgerList.length;i++){
    if(i==0){
      newBurgerList[i]=burgerList[i];
    }
    else{
      var j=0;
      while(j<i && burgerList[i].kCal<newBurgerList[j].kCal){
        j=j+1;
      }
      newBurgerList.insert(j,burgerList[i]);
    }
  }
  return newBurgerList
}


//Places the burgers on the website
function printBurgers(){

  document.getElementById("burgers").innerHTML="";
  var burgerList=filterBurgersBy();
  var sortedBurgerList=sortList(burgerList);
  printFiltredBurgers(sortedBurgerList);

}

function filterBurgersBy(){
  filtType=document.getElementById("filterBy").value;
  if(filtType==0){
    var burgerList=noFilter();
  }
  else if(filtType==1){
    var burgerList=vegFilter();
  }
  else if(filtType==2){
    var burgerList=gluFilter();
  }
  else if(filtType==3){
    var burgerList=lacFilter();
  }

  return burgerList;
}

function gluFilter(){
  var burgerList=[];
  for (var i=0;i<food.length;i++){
    if(food[i].gluten==false){
      burgerList.push(food[i]);
  }
  }
  return burgerList;
}

function lacFilter(){
  var burgerList=[];
  for (var i=0;i<food.length;i++){
    if(food[i].lactos==false){
      burgerList.push(food[i]);
  }
  }
  return burgerList;
}

function vegFilter(){
  var burgerList=[];
  for (var i=0;i<food.length;i++){
    if(food[i].vegetarisk==true){
      burgerList.push(food[i]);
  }
  }
  return burgerList;
}

function noFilter(){
  var burgerList=[];
  for (var i=0;i<food.length;i++){
    burgerList[i]=food[i];
  }
  return burgerList;
}


function printFiltredBurgers(burgerList){
for(var i=0; i<burgerList.length;i++){
  if(i%3==0){
    var wrap=document.createElement("div");
    wrap.classList.add("wrapper")
  }
    mod=i%3;
    burger=burgerList[i];
    var div=createBox(mod,burger);
    wrap.appendChild(div);
    if(mod==2||i==burgerList.length-1){
      document.getElementById('burgers').appendChild(wrap);
    }
  }
}



function createBox(mod3,burger){
  var myDiv=document.createElement("div");
  myDiv.classList.add("box");
  if(mod3==0){
    myDiv.classList.add("a");
  }
  if(mod3==1){
    myDiv.classList.add("b");
  }
  if(mod3==2){
    myDiv.classList.add("c");
  }
  myDiv.appendChild(createHeader(burger));
  myDiv.appendChild(createImage(burger));
  myDiv.appendChild(createLista(burger));
  myDiv.appendChild(createLabel());
  myDiv.appendChild(createCheckbox(burger));
  return myDiv
}

function createLabel (){
  var lab = document.createElement("h5");
  var labText=document.createTextNode("Välj antal burgar:");
  lab.appendChild(labText);
  return lab;
}

function createCheckbox(burger){
  var checkbox=document.createElement("input");
  checkbox.setAttribute("type","number");
  checkbox.setAttribute("placeholder",burger.chosen);

  checkbox.addEventListener("change",function changeChoosen(){
    var myValue=checkbox.value;
    burger.chosen=myValue;
  });
  return checkbox;
}



function createHeader(burger){
  var header=document.createElement("h4");
  var headertext=document.createTextNode("Namn: "+ burger.name);
  header.appendChild(headertext);
  return header;
}

function createImage(burger){
  var bild=document.createElement("img");
  bild.src=burger.img;
  return bild;
}



function createLista(burger){

var lista = document.createElement("ul");

var Kcal = document.createElement("li");
var KcalText = document.createTextNode("Kalorier: "+ burger.kCal);
Kcal.appendChild(KcalText);
lista.appendChild(Kcal);

if(burger.gluten){
  var gluten=document.createElement("li")
  var textgluten = document.createTextNode("Innehåller Gluten");
  gluten.appendChild(textgluten);
  lista.appendChild(gluten);
}
if(burger.lactos){
  var laktos=document.createElement("li")
  var textlaktos = document.createTextNode("Innehåller Laktos");
  laktos.appendChild(textlaktos);
  lista.appendChild(laktos);
}
if(burger.vegetarisk){
  var veg=document.createElement("li")
  var textveg = document.createTextNode("Vegetarisk");
  veg.appendChild(textveg);
  lista.appendChild(veg);
}
return lista;

}
