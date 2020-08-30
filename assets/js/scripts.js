
function goToUrl(url){
    location.href = url;
    // do google analytics stuff here
}

function processDataUrls(){
    let elements = document.querySelectorAll("[data-url]");
    let url = '';

    elements.forEach(el => {
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
posArray = [];

letters.forEach( function(el, index) {
    posArray[index] = { y: 0, offsetY: offset(el).top, height: offset(el).bottom - offset(el).top  };
});

document.addEventListener("mousemove", onMove);

gsap.ticker.add(update);
update();

function update() {
    letters.forEach( function(el, index){
        
        multiplier = 1 - (diff(index, currentEl) * 0.1);
        diffPos = multiplier * posArray[currentEl].y;
        posArray[index].y = diffPos;
        posOpacity = (snapDist - Math.abs(posArray[index].y))*0.01;
        posOpacity = (posOpacity < 0.1) ? 0.1 : posOpacity;

        letters[index].setAttribute("transform", "translate(0 "+  posArray[index].y  +")");
        letters[index].setAttribute("opacity", posOpacity);
       
        // if we exceed the snap limit cut the mouse connection and animate to baseline
        if (Math.abs(posArray[currentEl].y) > snapDist) {   
            // or if we are not the current el but we're not at startY and need to animate back
            connected = false;
            gsap.to( posArray[index] , { 
                duration: 2,  
                y: 0
            });
        }  

    });
    
}

function onMove(event) {
    letters.forEach( function(el, index) {
        if (!connected && event.target === el) {  
            connected = true;    
            currentEl = index;
         }
         if (connected && index == currentEl) {    
             // Kill any active tweens on the point
            gsap.killTweensOf(posArray[currentEl]); 
            posArray[currentEl].y = (event.pageY - (posArray[currentEl].offsetY + (posArray[currentEl].height / 2)))*2 ; 
        }
    });
}

function diff(a,b){return Math.abs(a-b);}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, bottom: rect.bottom + scrollTop, left: rect.left + scrollLeft }
}