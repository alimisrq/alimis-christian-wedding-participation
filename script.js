// UNIFIED WEDDING PARTICIPATION

const envelopeScreen = document.getElementById('envelopeScreen');
const envelope = document.getElementById('envelope');
const mainContent = document.getElementById('mainContent');
const openBtn = document.getElementById('openInvitation');
const musicBtn = document.getElementById('musicToggle');
const music = document.getElementById('bgMusic');
const sparkles = document.getElementById('sparkles');

document.body.classList.add('no-scroll');

if(openBtn){
  openBtn.addEventListener('click',()=>{
    envelope.classList.add('open');

    if(music){
      music.volume=.45;
      music.play().then(()=>{
        if(musicBtn) musicBtn.textContent='❚❚';
      }).catch(()=>{});
    }

    setTimeout(()=>{
      envelopeScreen.classList.add('fade-out');
    },1500);

    setTimeout(()=>{
      envelopeScreen.style.display='none';
      mainContent.classList.remove('hidden-content');
      mainContent.classList.add('show-content');
      document.body.classList.remove('no-scroll');
      window.scrollTo({top:0,behavior:'instant'});
    },2600);
  });
}

if(musicBtn){
  musicBtn.addEventListener('click',()=>{
    if(!music) return;

    if(music.paused){
      music.play().then(()=>musicBtn.textContent='❚❚').catch(()=>{});
    }else{
      music.pause();
      musicBtn.textContent='♪';
    }
  });
}

function createSparkle(){
  if(!sparkles) return;

  const sparkle=document.createElement('span');
  sparkle.className='sparkle';
  sparkle.style.left=Math.random()*100+'vw';
  sparkle.style.animationDuration=(5+Math.random()*6)+'s';
  sparkle.style.opacity=.35+Math.random()*.65;
  sparkle.style.transform=`scale(${.6+Math.random()*1.2})`;

  sparkles.appendChild(sparkle);
  setTimeout(()=>sparkle.remove(),12000);
}

setInterval(createSparkle,240);

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
},{threshold:.12});

document.querySelectorAll('.section,.story-card,.event-card,.dress-simple-card').forEach(el=>{
  el.classList.add('hidden');
  observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click',event=>{
    event.preventDefault();
    const target=document.querySelector(anchor.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
});
