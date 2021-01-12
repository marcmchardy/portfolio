
function goToUrl(url){
   location.href = url;
}

function gaEventClick(category, label) {
    ga('send', 'event', {
      eventCategory: category,
      eventAction: 'click',
      eventLabel: label
    });
}

function processDataUrls(){
    var elements = document.querySelectorAll("[data-url]");
    for (var i = 0; i < elements.length; i += 1) {
        (function () {
            var url = elements[i].dataset.url;
            elements[i].addEventListener(
                "click", 
                function(){goToUrl(url)}, false
            );
        }());
    }
    
    var gaElements = document.querySelectorAll("[data-ga]");
    for (var i = 0; i < gaElements.length; i += 1) {
        (function () {
            var category = gaElements[i].dataset.ga, 
            label = gaElements[i].dataset.gal;
            gaElements[i].addEventListener(
                "click", 
                function(){gaEventClick(category, label)}, false
            );
        }());
    }
}

processDataUrls();


// Animated logo from here

gsap.defaults({ease: "elastic(1, 0.25)"});

var svg  = document.querySelector("svg"),
letters = document.querySelectorAll(".letter"),
connected = false,
snapDist = 180,
currentEl = 0,
multiplier = 0,
posArray = [],
snapAllowed = true,
freshTouchdown = false,
inputPos = [{x:0, y:0}];

function letterPositions(){
    letters.forEach( function(el, index) {
        posArray[index] = {x: 0, y: 0,  offsetX: offset(el).left, offsetY: offset(el).top, width: offset(el).right - offset(el).left, height: offset(el).bottom - offset(el).top  };
    });
};

letterPositions();
gsap.ticker.add(update);
update();

document.addEventListener("touchstart", function(){
    freshTouchdown = true;
});
document.addEventListener("touchmove", function(event){
    onMove(event, "touch")
});
document.addEventListener("mousemove", function(event){
    onMove(event, "mouse")
});
window.addEventListener("resize", function(event){
    letterPositions();
    update();
});
window.onload = function() {
    scrollFunction()
};
window.onscroll = function() {
    scrollFunction()
    letterPositions();
    update();
};

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

// Utility functions to help us out

function diff(a,b){return Math.abs(a-b);}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, bottom: rect.bottom + scrollTop, left: rect.left + scrollLeft,  right: rect.right + scrollLeft }
}

// Shrink the logo when we're scrolling down

var logo = document.querySelector(".logo--home"),
header = document.querySelector("#header"),
shrink_y = 30;

function scrollFunction() {
    if(logo == null) return;
    if (document.body.scrollTop >= shrink_y || document.documentElement.scrollTop >= shrink_y) {
        logo.classList.add("logo--home-small");
    } else {
        logo.classList.remove("logo--home-small");
    }
}