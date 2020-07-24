/**********************************************************************************
*  Filename: DnD.js
*  Author: Raheem Clemons
*
*  Description: js file for DragAndDrop.html Uses Dragula and JQuery js libraries
*  to implement a smooth drag and drop fuction that can be used on any device
*
*  No Copyright
*  Version: 1.0.0
*  Date Modified: 7/10/20
**********************************************************************************/

// Global Variables
var ORIGINAL_ITEMS = [$(".item")[0],$(".item")[1],$(".item")[2]]
var itemLength = $(".item").length; // keeps inital length
var objectsInCanvas=[];
var numOfCanvasSpots = 0; // helps populate array with fridge
// Populates an array that holds all the containers that will allow drag and drop
var arr = [$(".freezerMove")[0],
           $(".trashMove")[0],
           $(".areaMove")[0]]

createCanvas();

controlMovment();

//Makes cursor for items the pointer
for(i = 0; i < itemLength;i++){$(".item")[i].style.cursor = "pointer";}


var dra = dragula(arr, {
  isContainer: function (el) {
    return false; // only elements in drake.containers will be taken into account
  },
  moves: function (el, source, handle, sibling) {
    return true; // elements are always draggable by default
  },
  accepts: function (el, target, source, sibling) {
    return true; // elements can be dropped in any of the `containers` by default
  },
  invalid: function (el, handle) {
    return false; // don't prevent any drags from initiating by default
  },
  copy: function (el, source) {
    //Makes sure the obly item that will be copied instead of moved is in the FreezerMove div
    return el.parentElement.className == 'freezerMove';
  },
  direction: 'vertical',             // Y axis is considered when determining where an element would be dropped                       
  copySortSource: false,             // elements in copy-source containers can be reordered
  revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true
  removeOnSpill: false,              // spilling will `.remove` the element, if this is true
  mirrorContainer: document.body,    // set the element that gets mirror elements appended
  ignoreInputTextSelection: true     // allows users to select input text, see details below

});


//   var location = document.createAttribute("data-location");
//   location.value = -1;

// for (var i = 0; i < ORIGINAL_ITEMS.length; i++) {
//   ORIGINAL_ITEMS[i].setAttributeNode(location)
//   console.log(ORIGINAL_ITEMS[i])
// }



// Deletes objects in trash
dra.on('drop', function(el){

  var location = el.getAttribute("data-location")
  var organismNumber = el.getAttribute("data-OrganismNumber")
  var value = el.getAttribute("data-value")
  


  if (el.parentElement.className == 'trashMove') {
      el.remove();
    }else{
      if (el.parentElement.className=='space') {
        newLocation(el.parentElement.id)
        el.setAttribute("data-OrganismNumber",newOrganismNumber())
        el.innerText = null;
      }

      if (el.parentElement.className=='areaMove') {
        el.setAttribute("data-location", -1);
        el.innerText = el.getAttribute("data-value")
      }

      if (el.parentElement.className=='freezerMove') {
        el.setAttribute("data-location", -1);
        el.setAttribute("data-value", newValue())
        el.innerText = el.getAttribute("data-value")

      }


    }


    console.log(el)







  function newLocation(NEW_LOCATION){
    el.setAttribute("data-location",NEW_LOCATION);
    location = el.getAttribute("data-location")
  }
 
  // helps keep track of individual organism in each group Ex: shows fisrt intance of cool organism placed 
  function newOrganismNumber(){
    var number=0;

    for(i=0;i<$(".item").length;i++){
      if ($(".item")[i].getAttribute("data-value")==el.getAttribute("data-value")){
        number++;
        //console.log($(".item")[i])
      }
    }
    return number-2; //subtract mirror and org in freezer
  }

 
  function newValue(){
    var numOfItemInFreezer=0;
    for(i=0;i<$(".freezerMove .item").length;i++){
      if ($(".freezerMove .item")[i].getAttribute("data-OrganismType")==el.getAttribute("data-OrganismType")) {
        numOfItemInFreezer++;
      }
    }
    return el.getAttribute("data-value")+" "+numOfItemInFreezer

    
  }
  
})

















function createCanvas(){
  for(x=0;x<400;x+=20){ // creates enough boxes for the grid 
    for(i=0;i<400;i+=20){
      $(".canvas").append("<div class=\"space\" id=\""+(numOfCanvasSpots)+"\">  </div>")
      arr.push($(".space")[numOfCanvasSpots]); // populates container array with boxes from grid
      numOfCanvasSpots++; 
    }
  }
}



function controlMovment(){
  // makes sure that 1 finger touch wont move the screen in the canvas
    $(".canvas")[0].addEventListener('touchmove', function(e) {
          // screen wont move with one touch
            if (e.touches.length==1){
              e.preventDefault();
            }
    }, false);
  // makes sure that 1 finger touch wont move the screen in any of the first 3 containers
  for (var i = 0; i < itemLength; i++) {
    
    arr[i].addEventListener('touchmove', function(e) {
          
            if (e.touches.length==1){
              e.preventDefault();
            }else{
              
            }
    
    }, false);

  }
}