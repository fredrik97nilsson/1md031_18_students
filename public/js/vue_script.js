function getInputs(){
  var namn=document.getElementById('fullname').value;
  var mejl=document.getElementById('Emejl').value;
  var betalmetod=document.getElementById('paymentmethod') .value;
  var gender=getGender();
  var inputList=[namn,mejl,betalmetod,gender];
  return inputList;
}


function getGender(){
  genList=document.getElementsByName("Gen");
  for(var i=0; i<genList.length;i++){
    if(genList[i].checked){
      return genList[i].value;
    }
  }
}


function printOrder(){
  document.getElementById("recivedOrder").innerHTML="";
  var inputList=getInputs();
  var burgerList=getBurgers();
  var burgerNameList=burgerList[0];
  var numberOfBurgerList=burgerList[1];
  document.getElementById("recivedOrder").appendChild(burgerInfo(burgerNameList,numberOfBurgerList));
  document.getElementById('recivedOrder').appendChild(document.createElement("br"));
  document.getElementById('recivedOrder').appendChild(document.createElement("hr"));
  document.getElementById("recivedOrder").appendChild(costumerInfo(inputList));
  document.getElementById("recivedOrder").style.border="2px solid #000000";

}



function burgerInfo(burgerNameList,numberOfBurgerList){
  var mainDiv=document.createElement("div");
  var titlePara = document.createElement("p");
  var bold= document.createElement("b");
  var titleTextPara=document.createTextNode("Du har beställt:");
  bold.appendChild(titleTextPara);
  titlePara.appendChild(bold);
  mainDiv.appendChild(titlePara);
  for (var i=0;i<burgerNameList.length;i++){
    var p=document.createElement("p");
    var text=document.createTextNode(numberOfBurgerList[i]+" stycken: "+burgerNameList[i]);
    p.appendChild(text);
    mainDiv.appendChild(p);
  }
  return mainDiv;
}



function getBurgers(){
  var burgerNameList=[];
  var numberOfBurgerList=[];
  for(var i=0;i<food.length;i++){
    if(food[i].chosen!=0){
      burgerNameList.push(food[i].name);
      numberOfBurgerList.push(food[i].chosen);
    }
  }
  return [burgerNameList,numberOfBurgerList]
}


function createBurgerList(){
  var lista=getBurgers();
  var burgerNameList=lista[0];
  var numberOfBurgerList=lista[1];
  var merchedList=[];
  for (var i=0;i<numberOfBurgerList.length;i++){
    merchedList[i]=String(numberOfBurgerList[i])+": "+burgerNameList[i];
  }
  return merchedList;
}



function costumerInfo(inputValues){
  var informationList=["Namn: ", "E-post: ","Betalsätt: ", "Kön: "]
  var costumersDiv=document.createElement("div");
  var titlePara=document.createElement("p");
  var bold=document.createElement("b");
  var titleTextPara=document.createTextNode("Din information:");
  bold.appendChild(titleTextPara);
  titlePara.appendChild(bold);
  costumersDiv.appendChild(titlePara);
  for(var i=0;i<inputValues.length;i++){

      var p=document.createElement("p");
      var text=document.createTextNode(informationList[i]+String(inputValues[i]));
      p.appendChild(text);
      costumersDiv.appendChild(p);

  }
  return costumersDiv;
}


'use strict';
var socket = io();


var vm = new Vue({
  el: '#orderInfo',
  data: {
    orders: {},
    cords:{},
    count: 0

  },





  methods: {
    clickOrderButton: function(){
     printOrder();
   },

    getNext: function () {
      this.count=this.count +1;
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + this.count;
    },

    addOrder: function () {
      printOrder();
      var infoList=getInputs();
      socket.emit("addOrder", { orderId: this.getNext(),
        details:{x:this.cords.x,
        y:this.cords.y}, orderItems: createBurgerList(),
        costumerInfo:{name:infoList[0], mejl:infoList[1], pay:infoList[2], gen:infoList[3]} });

    },

    displayOrder: function(event){
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
     this.cords={   x: event.clientX - 10 - offset.x,
                              y: event.clientY - 10 - offset.y  }
    }
  }
});
