document.querySelector(".control-buttons span").onclick = function() {
    let yourName = prompt("whats your name");
  if(yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = 'Unknown';
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  //remove spash screen
  document.querySelector(".control-buttons").remove();

}
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
//create array from game blocks
let blocks = Array.from(blocksContainer.children);
//create range  of keys
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);
//add order css property to gameblocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    //add click event
    block .addEventListener('click', function() {
        //trigger the flip block function
        flipBlock(block);
    });
});
//flip block function
function flipBlock(selectedBlock) {
    //add class is-flipped
    selectedBlock.classList.add('is-flipped');
    //collect all fpipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
//if there are 2 selected blocks 
if( allFlippedBlocks.length === 2) {
//stop clicking function
stopClicking();
//check matched block function
checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

}




    }
    //stop clicking function
function stopClicking() {
    //add class no clicking on main container
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        //remove class no clicking after the duration

        blocksContainer.classList.remove('no-clicking');


    }, duration);

}

    //check matched block function
    function checkMatchedBlocks(firstBlock, secondBlock) {
        let triesElement = document.querySelector('.tries span');
        if(firstBlock.dataset.technology === secondBlock.dataset.technology) {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

            firstBlock.classList.add('has-match');
            secondBlock.classList.add('has-match');
            document.getElementById('success').play();

        } else {
            triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
           setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
           }, duration);
           document.getElementById('fail').play();
        }
    }






//shuffle function
function shuffle(array) {
    //settings vars
    let current = array.length,
    temp,
    randome;
    while( current > 0) {
        //get random number
        random = Math.floor(Math.random() * current);
        //decrease length by one
        current--;
        //save current in stash
        temp = array[current];
        //current element = random element
        array[current] = array[random];
        //random element = get element fromstash
        array[random] = temp;
    }
    return array;

}