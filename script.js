const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
const header=$('.site-header'), progress=$('#progressBar'), backTop=$('#backTop'), nav=$('#nav'), menu=$('#menuToggle');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
$('#year').textContent=new Date().getFullYear();
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
$$('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));
function onScroll(){
 const y=window.scrollY, max=document.documentElement.scrollHeight-window.innerHeight;
 progress.style.width=(max>0?y/max*100:0)+'%';
 header.classList.toggle('scrolled',y>30);backTop.classList.toggle('show',y>600);
 if(!reduceMotion){const photo=$('#heroPhoto');if(photo){const t=Math.min(y/750,1);photo.style.transform=`rotateY(${t*13}deg) rotateX(${t*-5}deg) translateY(${t*18}px)`;}}
}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));
const sections=$$('main section[id]'), links=$$('.nav a');
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>sectionObserver.observe(s));
const glow=$('.cursor-glow');
window.addEventListener('pointermove',e=>{if(glow&&e.pointerType==='mouse'){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';}});
const heroVisual=$('.hero-visual');
if(heroVisual&&!reduceMotion){heroVisual.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=heroVisual.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;$('#heroPhoto').style.transform=`rotateY(${x*12}deg) rotateX(${-y*9}deg)`;});heroVisual.addEventListener('pointerleave',()=>{$('#heroPhoto').style.transform='';});}
$('#contactForm').addEventListener('submit',e=>{e.preventDefault();const name=$('#senderName').value.trim(),email=$('#senderEmail').value.trim(),message=$('#senderMessage').value.trim();const subject=encodeURIComponent('Portfolio enquiry from '+name);const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);$('#formStatus').textContent='Opening your email application…';window.location.href=`mailto:ritesh4180507997@gmail.com?subject=${subject}&body=${body}`;});
