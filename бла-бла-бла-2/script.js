const animItems = document.querySelectorAll('._anim-items');
if (animItems.length > 0){
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll(){
		for (let i = 0; i < animItems.length; i++){
			const animItem = animItems[i];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;
			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight){
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}
			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
				animItem.classList.add('_active');
			} else{
				if (animItem.classList.contains('_anim_no_hide')){
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el){
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
	}
	setTimeout(() => {
		animOnScroll();
	}, 800);
}
const animTexts = document.querySelectorAll('._anim_text');
if (animTexts.length > 0){
	window.addEventListener('scroll', animTextScroll);
	function animTextScroll(){
		for (let i = 0; i < animTexts.length; i++){
			const animText = animTexts[i];
			const animTextHeight = animText.offsetHeight;
			const animTextOffset = offset(animText).top;
			const animStart = 4;
			let animTextPoint = window.innerHeight - animTextHeight / animStart;
			if (animTextHeight > window.innerHeight){
				animTextPoint = window.innerHeight - window.innerHeight / animStart;
			}
			if ((pageYOffset > animTextOffset - animTextPoint) && pageYOffset < (animTextOffset + animTextHeight)){
				animText.classList.add('_active_text');
			} else{
				if (animText.classList.contains('_anim_no_hide')){
					animText.classList.remove('_active_text');
				}
			}
		}
	}
	function offset(el){
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
	}
	setTimeout(() => {
		animOnScroll();
	}, 800);
}
const sections = document.querySelectorAll('.section');
if (sections.length > 0){
	window.addEventListener('scroll', sectionScroll);
	function sectionScroll(){
		for (let i = 0; i < sections.length; i++){
			const section = sections[i];
			const sectionHeight = section.offsetHeight;
			const sectionOffset = offset(section).top;
			const animStart = 3;
			let sectionPoint = window.innerHeight - sectionHeight / animStart;
			if (sectionHeight > window.innerHeight){
				sectionPoint = window.innerHeight - window.innerHeight / animStart;
			}
			if ((pageYOffset > sectionOffset - sectionPoint) && pageYOffset < (sectionOffset + sectionHeight)){
				section.classList.add('color-' + section.dataset.color);
			} 
		}
	}
	function offset(el){
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
	}
	sectionScroll();
}

let button = document.querySelector('#burger-box'); 
let menu = document.querySelector('.menu'); 

button.onclick = () => {
   if(menu.classList.contains('_menu_active')){
	   menu.classList.remove('_menu_active')
   }else{
	   menu.classList.add('_menu_active');
   }
}

(function(){

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = innerWidth,
    h = canvas.height = innerHeight,
    particles = [],
    properties = {
        bgColor             : 'rgba(17, 17, 19, 1)',
        particleColor       : 'rgba(255, 40, 40, 1)',
        particleRadius      : 3,
        particleCount       : 60,
        particleMaxVelocity : 0.5,
        lineLength          : 150,
        particleLife        : 6,
    };

    document.querySelector('body').appendChild(canvas);

    window.onresize = function(){
        w = canvas.width = innerWidth,
        h = canvas.height = innerHeight;        
    }

    class Particle{
        constructor(){
            this.x = Math.random()*w;
            this.y = Math.random()*h;
            this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
            this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
            this.life = Math.random()*properties.particleLife*60;
        }
        position(){
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0? this.velocityX*=-1 : this.velocityX;
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0? this.velocityY*=-1 : this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        reDraw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }
        reCalculateLife(){
            if(this.life < 1){
                this.x = Math.random()*w;
                this.y = Math.random()*h;
                this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.life = Math.random()*properties.particleLife*60;
            }
            this.life--;
        }
    }

    function reDrawBackground(){
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);
    }

    function drawLines(){
        var x1, y1, x2, y2, length, opacity;
        for(var i in particles){
            for(var j in particles){
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if(length < properties.lineLength){
                    opacity = 1-length/properties.lineLength;
                    ctx.lineWidth = '0.5';
                    ctx.strokeStyle = 'rgba(255, 40, 40, '+opacity+')';
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }

    function reDrawParticles(){
        for(var i in particles){
            particles[i].reCalculateLife();
            particles[i].position();
            particles[i].reDraw();
        }
    }

    function loop(){
        reDrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    }

    function init(){
        for(var i = 0 ; i < properties.particleCount ; i++){
            particles.push(new Particle);
        }
        loop();
    }

    init();

}())

const anchors = document.querySelectorAll('a[href*="#"]');
for(let anchor of anchors){
    anchor.addEventListener('click',function(e){
		e.preventDefault();
		const sectID = 	anchor.getAttribute('href');
		document.querySelector('' + sectID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	})
}
document.querySelectorAll('.pazzle-block').forEach(e => {
  e.draggable = true;
  e.ondragstart = e => {
    e.dataTransfer.setData("id", e.target.id);
    e.target.classList.add('dragging');
  }
  e.ondragover = e => {
    let old = document.querySelector('.over');
    old && old.classList.remove('over')
    e.target.classList.add('over');
    e.preventDefault();
  };
  e.ondrop = e => {
    let old = document.querySelector('.dragging');
    old && old.classList.remove('dragging')
    old = document.querySelector('.over');
    old && old.classList.remove('over');
    let v = e.target.innerHTML;
    let fromEl = document.querySelector('#'+ e.dataTransfer.getData('id'));
    e.target.innerHTML = fromEl.innerHTML;
    fromEl.innerHTML = v;

  };
})