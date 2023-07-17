const submitBtn = document.getElementById("submitButton");

submitBtn.addEventListener("click", function(){
    const fName = document.getElementById('fname').value;
    const lName = document.getElementById('lname').value;
    
    if(fName === 'Bobby' && lName === 'Dhaliwal'){
        window.location.href = "next.html";
    }
});


const nxtBtn = document.getElementById("nextButton");

nxtBtn.addEventListener("click", function(){
    window.location.href = "bignext.html";
});

var emitterSize = 20,
dotQuantity = 40,
dotSizeMin = 6,
dotSizeMax = 8,
speed = 2.4,
gravity = 0.7,
explosionQuantity = 5,
emitter = document.querySelector('#emitter'),
explosions = [],
currentExplosion = 0,
container, i, move;

function createExplosion(container) {
  var tl = new TimelineLite({paused: true}),
  dots = [],
  angle, duration, length, dot, i, size, r, g, b;
  for (i = 0; i < dotQuantity; i++) {
    dot = document.createElement('div');
    dots.push(dot);
    dot.className = 'dot';
    r = getRandom(30, 255);
    g = getRandom(30, 230);
    b = getRandom(30, 230);
    TweenLite.set(dot, {
      backgroundColor: 'rgb('+r+','+g+','+b+')',
      visibility: 'hidden'
    });
    size = getRandom(dotSizeMin, dotSizeMax);
    container.appendChild(dot);
    angle = getRandom(0.65, 0.85) * Math.PI * 2; // a vector pointed up
    // get maximum distance from the center, factoring in size of dot, and then pick a random spot along that vector to plot a point
    length = Math.random() * (emitterSize / 2 - size / 2);
    duration = 3 + Math.random();
    // place the dot at a random spot within the emitter, and set its size
    TweenLite.set(dot, {
      x: Math.cos(angle) * length, 
      y: Math.sin(angle) * length, 
      width: size, 
      height: size, 
      xPercent: -50, 
      yPercent: -50,
      visibility: 'hidden',
      force3D: true
    });
    tl.to(dot, duration / 2, {
      opacity: 0,
      ease: RoughEase.ease.config({
        points: 20,
        strength: 1.75,
        clamp: true
      })
    }, 0).to(dot, duration, {
      visibility: 'visible',
      rotationX: '-='+getRandom(720, 1440),
      rotationZ: '+='+getRandom(720, 1440),
      physics2D: {
        angle: angle * 180 / Math.PI, // translate radians to degrees
        velocity: (100 + Math.random() * 250) * speed, // initial velocity
        gravity: 700 * gravity,
        friction: getRandom(0.1, 0.15)
      }
     }, 0).to(dot, 1.25 + Math.random(), {
      opacity: 0
    }, duration / 2);
  }
  // hide the dots at the end for improved performance (better than opacity: 0 because the browser can ignore the elements)
  // console.log('setting', dots);
  // tl.set(dots, {visibility: 'hidden'});
  return tl;
}

function explode(element) {
  var bounds = element.getBoundingClientRect(),
  explosion;
  if (++currentExplosion === explosions.length) {
    currentExplosion = 0;
  }
  explosion = explosions[currentExplosion];
  TweenLite.set(explosion.container, {
    x: bounds.left + bounds.width / 2,
    y: bounds.top + bounds.height / 2
  });
  explosion.animation.restart();
}

function getRandom(min, max) {
  var rand = min + Math.random() * (max - min);
  return rand;
}

function play() {
  move.play(0);
  var intervalCount = 0,
  interval = setInterval(function() {
    if (intervalCount < 5) {
      explode(emitter);
      intervalCount++;
    } else {
      clearInterval(interval);
    }
  }, 150);
}

function setup() {
  for (i = 0; i < explosionQuantity; i++) {
    container = document.createElement('div');
    container.className = 'dot-container';
    document.body.appendChild(container);
    explosions.push({
      container: container,
      animation: createExplosion(container)
    });
  }
  
  move = new TimelineLite({
    paused: true
  }).fromTo(emitter, 0.4, {
    left: '40%'
  }, {
    left: '60%',
    ease: Linear.easeNone
  }).fromTo(emitter, 0.4, {
    left: '60%'
  }, {
    left: '40%',
    ease: Linear.easeNone
  });
  
  document.querySelector('body').onclick = function () {
    play();
  };
  
  play();
}

setup();