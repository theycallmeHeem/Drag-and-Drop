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






function canvasObject(identifier, text, location){
  this.id = identifier;
  this.text = text;
  this.location = location;
  this.locationX = parseInt(location/20);
  this.locationY = location%20;

}



// Deletes objects in trash
dra.on('drop', function(el){

  if (el.parentElement.className == 'trashMove') {
    el.remove();
  }else{
    if (el.parentElement.className=='space') {
      var object = new canvasObject(el.id, el.innerText,el.parentElement.id)
      el.innerText=null;
      console.log(object)
      objectsInCanvas.push(object)
    }


    if (el.parentElement.className == 'freezerMove') {
      
      //console.log(ORIGINAL_ITEMS)
      for (i =0;i<ORIGINAL_ITEMS.length;i++){
        if(ORIGINAL_ITEMS[i].id == el.id){
          el.innerText=ORIGINAL_ITEMS[i].innerText + " "+ ($(".freezerMove .item#" +el.id).length -1);
          break;
        }
      }
    }
    
  }
 console.log(objectsInCanvas)
})

dra.on('cancel', function(el){
  if (el.parentElement.className=='space') {
      var object = new canvasObject(el.id, el.innerText,el.parentElement.id)
      el.innerText=null;
      console.log(object)
      objectsInCanvas.push(object)
    }

})

dra.on('drag', function(el){
  if (el.parentElement.className=='space') {
    
    for (i=0;i<objectsInCanvas.length;i++){
      console.log(objectsInCanvas[i].locationX*20)
      console.log(el.parentElement.id)
      if (objectsInCanvas[i].location==el.parentElement.id) {
        el.innerText=objectsInCanvas[i].text;
        objectsInCanvas.splice(i,1)
      }
      
    }
  
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