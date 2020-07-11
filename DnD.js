/**********************************************************************************
*  Filename: DnD.js
*  Author: Raheem Clemons
*
*  Description: js file for DragAndDrop.html Uses Dragula and JQuery js libraries
*  to implement a smooth drag and drop fuction that can be used on any device
*
*  No Copyright
*  Version: 1.0.0
*  Date Modified: 7
**********************************************************************************/






















var itemLength = $(".item").length; // keeps inital length
var objectsInCanvas=[];
// Populates an array that holds all the containers that will allow drag and drop
var arr = [$(".freezerMove")[0],
           $(".trashMove")[0],
           $(".areaMove")[0]]

var num =0; // helps populate array with frid
for(x=0;x<400;x+=20){ // creates enough boxes for the grid 
  for(i=0;i<400;i+=20){
    $(".canvas").append("<div class=\"space\" id=\""+(num)+"\">  </div>")
    arr.push($(".space")[num]); // populates container array with boxes from grid
    num++;    
  }
}

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
//Makes cursor for items the pointer
for(i=0;i<2;i++){

  $(".item")[i].style.cursor = "pointer";
}

function canvasObject(identifier,locationX, locationY){
  this.id = identifier;
  this.locationX = locationX;
  this.locationY = locationY;

}



// Deletes objects in trash
var itemNum=1;
dra.on('drop', function(el){
  if (el.parentElement.className != 'areaMove') {
    

    el.innerText=null;
  }

  if (el.parentElement.className == 'trashMove') {
    el.remove();
  }else{
    //console.log(el.id + " " + $(".item")[0].id)
  if (el.parentElement.className == 'areaMove') {
    for (var i = 0; i < 3; i++) {
     // console.log($(".item")[i].id)
      if(el.id == $(".item")[i].id){
        el.innerText = $(".item")[i].innerText;
      }
    }
  }else{
    //var itemObject = new canvasObject(itemNum,(el.parentElement.id/20), (el.parentElement.id%20))
    //objectsInCanvas.push(itemObject)
    //itemNum++;

  }
  }
  console.log(el)
  console.log($(".canvas .item"))
})
