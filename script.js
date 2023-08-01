const canvas = document.getElementById('canvas');
canvas.width = window.outerWidth;
canvas.height = window.outerHeight;
const ctx = canvas.getContext('2d');

class Rocket {
    constructor(x, y) {
      this.width = 200;
      this.height = 200;
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
        this.x = 300;
        // this.y = canvas.height/2 + 50;
        this.width = 400;
        this.height = 400;
    }
    setBackFocus(){ 
        this.x = 100;
        // this.y = canvas.height/2 + 50;
        this.width = 200;
        this.height = 200;
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
      this.width = 300;
      this.height = 300;
      
      this.x = x;
      this.y = y;
      this.image = new Image();
      this.image.src = imageSrc;
      this.colided = false;
      this.initialX=x;
      this.initialY=y;

    }
  
    drawPlanet() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    updatePosition(rocketX, rocketY) {
      const speed = 4;
      this.x -= speed;
    }

    setInFocus(){
        this.width = canvas.width;
        this.height = canvas.height;
        this.initialY=this.y;
        this.y = canvas.height /1.5;
        this.initialX=this.x;
        this.x = 0
    }
    setBackFocus(){
        this.x = this.initialX;
        this.y = this.initialY;
        this.width = 300;
        this.height = 300;
    }
  }

const flagImages =[
    'img/flag1.png',
    'img/flag2.png',
    'img/flag3.png',
    'img/flag1.png',
    'img/flag1.png',
    'img/flag1.png',
    'img/flag1.png',
    'img/flag1.png',
    'img/flag1.png'
]


class Flag {
constructor(x, y, imageSrc) {
    this.width = 400;
    this.height = 400;
    this.x = x;
    this.y = y;
    this.flagImage = new Image();
    this.flagImage.src = imageSrc;
}

drawFlag() {
    ctx.drawImage(this.flagImage, this.x, this.y, this.width, this.height);
}
}
  

  const rocket = new Rocket(100, canvas.height/2);
  const planetSpacing = 400;
  const planets = [];
  const flags = [];
  for (let i = 0; i < images.length; i++) {
    const planetX = canvas.width + i * planetSpacing;
    const planetY = canvas.height / 2;
    const planet = new Planet(planetX, planetY, images[i]);
   
    planets.push(planet);
  }

  for (let i = 0; i < flagImages.length; i++) {
    const flagX = 850 ;
    const flagY = 400;
    const flag = new Flag(flagX, flagY, flagImages[i]);
    flags.push(flag);
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
  let currentFlag;


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
    rocket.setBackFocus();
    currentPLanet = planets[currentPlanetIndex];
    

    rocket.drawRocket();
    if(animationStopped){
        var element = document.querySelector('.enter');
        element.classList.remove("hide");
    }
  }
  

  function animatePlanet(){
    currentPLanet = planets[currentPlanetIndex];
    currentPLanet.setInFocus()
    currentPLanet.drawPlanet()
    rocket.changeStateUp("up");
    rocket.setInFocus()
    rocket.drawRocket();
    currentFlag = flags[currentPlanetIndex];
    currentFlag.drawFlag();
 
      }

let currentPlanetIndex = 0;

window.addEventListener('keydown', (event) => {
    if (event.key === ' ' && animationStopped) {
      animationStopped = false;
  
      if (currentPlanetIndex === planets.length - 1) {
        currentPlanetIndex = 0; 
      } else {
        currentPlanetIndex++;
      }
      animate();
    }
  });
  
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && animationStopped) {
      planetOpened = true;
  
      animate();
    }
  });

    
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && planetOpened) {
      planetOpened = false;
      currentPLanet.setBackFocus();
      animate();
    }
  });

 
  animate();
  