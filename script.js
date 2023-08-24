const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

class Rocket {
    constructor(x, y) {
      this.width = canvas.width * 0.15;
      this.height = canvas.height * 0.3;
      this.x = x;
      this.y = y;
      this.loadRocketImage(this.state);

    }
  
    loadRocketImage(state) {
      this.rocketImg = new Image();
      this.rocketImg.onload = () => {
        this.drawRocket();
      };
      if(state === 'side'){
        this.rocketImg.src = "img/rocketSide.png";
      }
      if(state === 'up'){
        this.rocketImg.src = "img/rocketUp.png";
      }
      
    }
    changeStateUp(state){
        this.loadRocketImage(state)
    }
  
    drawRocket() {
      ctx.drawImage(this.rocketImg, this.x, this.y, this.width, this.height);

    }
    setInFocus(){
        this.x = canvas.width/2 -600;
        this.y = canvas.height/2 - 100;
        if(currentPlanetIndex ==3){
            this.x = canvas.width/2-450;
            this.y = canvas.height/2-200;
        }
        this.width = 400;
        this.height = 400;
    }
    setBackFocus(){ 
        this.x = 100;
        this.y = canvas.height/2 + 50;
        this.width = canvas.width * 0.15;
        this.height = canvas.height * 0.3;
    }
    goByeBye(){
        this.x += 10;
    }
   
    
  }
  

const images = [
    'img/Pluto.png',
    'img/Neptune.png',
    'img/Uranus.png',
    'img/Saturn.png',
    'img/Jupiter.png',
    'img/Mars.png',
    'img/Earth.png',
    'img/Venus.png',
    'img/Mercury.png'
  ];

  
  class Planet {
    constructor(x, y, imageSrc) {
      this.width = canvas.width*0.15;
      this.height = canvas.height*0.3;
      
      this.x = x;
      this.y = y;
      this.image = new Image();
      this.image.src = imageSrc;
      this.colided = false;
      this.initialX=x;
      this.initialY=y;

    }
  
    drawPlanet() {
        if(!isEnded){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

    }
  
    updatePosition(rocketX, rocketY) {
      const speed = 5;
      this.x -= speed;
    }

    setInFocus(){
        this.width = canvas.width;
        this.height = canvas.height;
        this.initialY=this.y;
        this.y = canvas.height /1.7;
        this.initialX=this.x;
        if(currentPlanetIndex==3){
            this.y=canvas.height/2;
            this.x=100; 
        }
        this.x = 0
    }
    setBackFocus(){
        this.x = this.initialX;
        this.y = this.initialY;
        this.width = canvas.width*0.15;
        this.height = canvas.height*0.3;
    }
  }




class Astronaut {
constructor(x, y, imageSrc) {
    this.width = canvas.width*0.25;
    this.height = canvas.width*0.25;
    this.x = x;
    this.y = y;
    this.astronautImage = new Image();
    this.astronautImage.src = imageSrc;
}


drawAstronaut() {
    ctx.drawImage(this.astronautImage, this.x, this.y, this.width, this.height);
}
}
  

  const rocket = new Rocket(canvas.width * 0.1, canvas.height/2);
  const planetSpacing = canvas.width * 0.25;
  const planets = [];
  const astronauts = [];
  for (let i = 0; i < images.length; i++) {
    const planetX = canvas.width + i * planetSpacing;
    const planetY = canvas.height / 2;
    const planet = new Planet(planetX, planetY, images[i]);
   
    planets.push(planet);
  }
 const imageSrc="img/flag.png"
  for (let i = 0; i < planets.length; i++) {
    const astronautX = canvas.width/2-planets[i].width/2;
    const astronautY = canvas.height/2-planets[i].height/1.3;
    
    const astronaut = new Astronaut(astronautX, astronautY, imageSrc);
    astronauts.push(astronaut);
  }

  function movePlanets(planet) {
      planet.updatePosition(rocket.x, rocket.y);

  }

  function checkCollision(planet) {
    const planetX = planet.x + planet.width / 2;
    const planetY = planet.y + planet.height / 2;
    const rocketX = rocket.x + rocket.width / 2;
    const rocketY = rocket.y + rocket.height / 2;
  
    const distance = Math.sqrt((planetX - rocketX) ** 2 + (planetY - rocketY) ** 2);
  
    if (distance < (planet.width + rocket.width) / 2 && !planet.colided) {
        planet.colided = true;
      return true;
    }
    return false;
  }
  
  let animationStopped = false;
  let planetOpened = false;
  let currentPLanet;
  let currentastronaut;
  let isEnded = false

  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      if(planetOpened){
        animatePlanet()
      }else{
        animateCosmos()
      }
    
  
      if (!animationStopped) { 
          requestAnimationFrame(animate);
      }else{
        
      }
  }

  function isEnd(){
    if (currentPlanetIndex == planets.length && !animationStopped) {
        isEnded = true;
      }
  }

  function animateCosmos(){
    
    for (const planet of planets) {
        if (!animationStopped) { 
            movePlanets(planet);
        }
        planet.drawPlanet();

        if (checkCollision(planet)) {
            animationStopped = true;
        }
    }
    rocket.changeStateUp('side')
    currentPLanet = planets[currentPlanetIndex];

    isEnd()

   if(isEnded){
        rocket.drawRocket();
        hideEnter();
        hideSpace();
        showButton();
        rocket.goByeBye()
    }else{
        rocket.setBackFocus();
        rocket.drawRocket();
        hideButton();
    }

    if(animationStopped){
        showEnter();
        showSpace();
        hideButton();
        hideEscape();
    }
  }
  


  function animatePlanet(){
    currentPLanet = planets[currentPlanetIndex];
    currentPLanet.setInFocus()
    currentPLanet.drawPlanet()
    rocket.changeStateUp("up");
    rocket.setInFocus()
    rocket.drawRocket();
    currentastronaut = astronauts[currentPlanetIndex];
    currentastronaut.drawAstronaut();
    }



let currentPlanetIndex = 0;

function showEscape(){
    let esc = document.querySelector(".escape");
    esc.classList.remove("hide");
}

function hideEscape(){
    let esc = document.querySelector(".escape");
    esc.classList.add("hide");
}

function showSpace(){
    let spac = document.querySelector(".space");
    spac.classList.remove("hide");
}

function hideSpace(){
    let spac = document.querySelector(".space");
    spac.classList.add("hide");
}
function showEnter(){
    var ent = document.querySelector('.enter');
    ent.classList.remove("hide");
}

function hideEnter(){
    var ent = document.querySelector('.enter');
    ent.classList.add("hide");
}

function hideButton(){
    var but = document.querySelector('.refresh');
    but.classList.add("hide");
}
function showButton(){
    var but = document.querySelector('.refresh');
    but.classList.remove("hide");
}

function showSorry(){
    var but = document.querySelector('.sorry');
    but.classList.remove("hide");
}

function hideSorry(){
    var but = document.querySelector('.sorry');
    but.classList.add("hide");
}


window.addEventListener('keydown', (event) => {
    if (event.key === ' ' && animationStopped && !planetOpened) {
      animationStopped = false;
  
      if (currentPlanetIndex !== planets.length )  {
        currentPlanetIndex++;
      }
      animate();
    }
  });
  
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && animationStopped) {
      planetOpened = true;
      let tempFlag = document.querySelector(".flag-" + currentPlanetIndex);
      let wrap = document.querySelector(".wrapper.flag-" + currentPlanetIndex);
      flagX=(canvas.width/2)-5;
      flagY=canvas.height/2 - 150;
      wrap.style.left=flagX+"px";
      wrap.style.top = flagY+"px";
      tempFlag.classList.remove("hide")
      hideEnter();
      hideSpace();
      hideButton();
      showEscape();
      animate();
    }
  });

    
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && planetOpened) {
      planetOpened = false;
      currentPLanet.setBackFocus();
      let tempFlag = document.querySelector(".flag-" + currentPlanetIndex)
      tempFlag.classList.add("hide")
      animate();
    }
  });

  document.getElementById("refreshButton").addEventListener("click", function() {
    location.reload();
});

 
let isLoaded = false;
let k = 1;          

const loadDiv = document.querySelector(".loading-screen");
let isItStarted = false;


function myLoop() {     
  setTimeout(function() {  
    if (document.readyState === "complete") {
        isLoaded = true;
        loadDiv.style.display='none';
        if(canvas.height > canvas.width){
            showSorry();
        }else{
            animate();
        }
        window.addEventListener('load',(e)=>{
            setTimeout(function(){
                isItStarted = true;
            }, 2000);    
        },{once:true})
    } 
    k++;
    if(isLoaded){
        return;
    }               
    if (k < 10) {       
      myLoop();            
    }                      
  }, 2000)
}

myLoop(); 


  