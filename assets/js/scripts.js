
function goToUrl(url){
    location.href = url;
    // do google analytics stuff here
}

function processDataUrls(){
    let elements = document.querySelectorAll("[data-url]");
    let url = '';

    elements.forEach( function(el) {
        url = el.dataset.url;
        el.addEventListener("click", function(){goToUrl(url)}, false);
    });
}

processDataUrls();


gsap.defaults({ease: "elastic(1, 0.25)"});

var svg  = document.querySelector("svg"),
letters = document.querySelectorAll(".letter"),
connected = false,
snapDist = 180,
currentEl = 0,
multiplier = 0,
posArray = [],
snapAllowed = true,
freshTouchdown = false;

letters.forEach( function(el, index) {
    posArray[index] = {x: 0, y: 0,  offsetX: offset(el).left, offsetY: offset(el).top, width: offset(el).right - offset(el).left, height: offset(el).bottom - offset(el).top  };
});

document.addEventListener("touchstart", function(){
    freshTouchdown = true;
});
document.addEventListener("touchmove", function(event){
    onMove(event, "touch")
});
document.addEventListener("mousemove", function(event){
    onMove(event, "mouse")
});

gsap.ticker.add(update);
update();

function snapAllowedTimer(){
    snapAllowed = false;
    freshTouchdown = false;
    setTimeout(function(){ 
        snapAllowed = true; 
    }, 250);
}

function update() {
    letters.forEach( function(el, index){
        
        multiplier = 1 - (diff(index, currentEl) * 0.1);

        // i think a lot of these references to the array could be moved to standard vars
        diffPosY = multiplier * posArray[currentEl].y;
        diffPosX = multiplier * posArray[currentEl].x;

        // Work out which has a greater diff between x and y change, use that in a ternary operater for opacity
        opacityDiff = (Math.abs(diffPosY) > Math.abs(diffPosX)) ? Math.abs(diffPosY) : Math.abs(diffPosX);

        // work out a percentage of change
        posOpacity = (snapDist - opacityDiff)/snapDist;
        posOpacity = (posOpacity < 0.1) ? 0.1 : posOpacity;

        letters[index].setAttribute("transform", "translate( "+ diffPosX + " " + diffPosY  +") ");
        // svg.setAttribute("style", "transform: rotate3d(1,0.1,1,"+posOpacity+"turn); transform-origin: center;");
        letters[index].setAttribute("opacity", posOpacity);
       
        // if we exceed the snap limit cut the mouse connection and animate to baseline
        if (Math.abs(posArray[currentEl].y) > snapDist || Math.abs(posArray[currentEl].x) > snapDist*1.5) {   
            // or if we are not the current el but we're not at startY and need to animate back
            connected = false;
            snapAllowedTimer();

            gsap.to( posArray[index] , { 
                duration: 2,  
                x: 0,
                y: 0
            });
        }  
    });
}

var inputPos = [{x:0, y:0}];

function onMove(event, input) {

    // override to keep the touch check from breaking the mouse interaction
    freshTouchdown = (input == "touch") ? freshTouchdown : true;

    letters.forEach( function(el, index) {
        if (!connected && snapAllowed && freshTouchdown && event.target === el) {  
            connected = true;    
            currentEl = index;
         }
         if (connected && index == currentEl) {    
             // Kill any active tweens on the point
            gsap.killTweensOf(posArray[currentEl]); 

            inputPos.x = (input == "mouse") ? event.pageX : (input == "touch") ? event.touches[0].pageX : '';
            inputPos.y = (input == "mouse") ? event.pageY : (input == "touch") ? event.touches[0].pageY : '';

            posArray[currentEl].y = (inputPos.y - (posArray[currentEl].offsetY + (posArray[currentEl].height / 2)))*1.5 ; 
            posArray[currentEl].x = (inputPos.x - (posArray[currentEl].offsetX + (posArray[currentEl].width / 2)))*1.5 ; 
        }
    });
}

function diff(a,b){return Math.abs(a-b);}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, bottom: rect.bottom + scrollTop, left: rect.left + scrollLeft,  right: rect.right + scrollLeft }
}