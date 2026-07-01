/* SAMVEDNA — main.js (no dependencies) */
(function(){
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* year */
  var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

  /* header shadow */
  var header=document.getElementById('site-header');
  function hs(){ if(header) header.classList.toggle('scrolled', window.scrollY>8); }
  hs(); window.addEventListener('scroll',hs,{passive:true});

  /* mobile nav */
  var tog=document.getElementById('nav-toggle'), nav=document.getElementById('main-nav');
  if(tog&&nav){
    tog.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      tog.setAttribute('aria-expanded',String(open));
      tog.setAttribute('aria-label',open?'Close menu':'Open menu');
    });
    nav.addEventListener('click',function(e){ if(e.target.tagName==='A'){nav.classList.remove('open');tog.setAttribute('aria-expanded','false');} });
  }

  /* hero particles */
  var pc=document.getElementById('particles');
  if(pc&&!reduced){
    for(var i=0;i<18;i++){
      var s=document.createElement('span');
      s.style.left=Math.random()*100+'%'; s.style.top=Math.random()*100+'%';
      s.style.animationDelay=(Math.random()*6)+'s';
      s.style.opacity=(0.15+Math.random()*0.35);
      s.style.transform='scale('+(0.5+Math.random()*1.5)+')';
      pc.appendChild(s);
    }
  }

  /* typewriter */
  var tws=document.querySelectorAll('.tw');
  if(reduced){ tws.forEach(function(el){el.textContent=el.dataset.tw;el.classList.add('done');}); }
  else {
    tws.forEach(function(el){
      var text=el.dataset.tw, delay=parseInt(el.dataset.delay||'0',10), idx=0;
      setTimeout(function(){
        (function type(){
          if(idx<=text.length){ el.textContent=text.slice(0,idx); idx++; setTimeout(type,55); }
          else { el.classList.add('done'); }
        })();
      },delay+200);
    });
  }

  /* scroll reveal */
  var reveals=document.querySelectorAll('.reveal');
  if(reduced||!('IntersectionObserver' in window)){ reveals.forEach(function(el){el.classList.add('in');}); }
  else{
    var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    reveals.forEach(function(el,i){ el.style.transitionDelay=Math.min((i%4)*.07,.25)+'s'; ro.observe(el); });
  }

  /* counters */
  function count(el){
    var t=parseInt(el.dataset.count,10)||0, suf=el.dataset.suffix||'';
    if(reduced){ el.textContent=t.toLocaleString('en-IN')+suf; return; }
    var st=null,d=1700;
    function step(ts){ if(st===null)st=ts; var p=Math.min((ts-st)/d,1),e=1-Math.pow(1-p,3);
      el.textContent=Math.floor(e*t).toLocaleString('en-IN')+suf; if(p<1)requestAnimationFrame(step); else el.textContent=t.toLocaleString('en-IN')+suf; }
    requestAnimationFrame(step);
  }
  var nums=document.querySelectorAll('.stat-num[data-count]');
  if('IntersectionObserver' in window){
    var co=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){count(e.target);co.unobserve(e.target);}});},{threshold:.6});
    nums.forEach(function(el){co.observe(el);});
  } else nums.forEach(count);

  /* bars + squiggle */
  var animEls=document.querySelectorAll('.bar, .squiggle');
  if('IntersectionObserver' in window){
    var bo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');bo.unobserve(e.target);}});},{threshold:.35});
    animEls.forEach(function(el){bo.observe(el);});
  } else animEls.forEach(function(el){el.classList.add('in');});

  /* testimonials */
  var track=document.getElementById('t-track'), dots=document.getElementById('t-dots');
  if(track&&dots){
    var slides=track.children, n=slides.length, cur=0, timer=null;
    function render(){
      var shift = cur*65; // 60% width + 5% margin
      track.style.transform='translateX(calc(17.5% - '+shift+'%))';
      for(var i=0;i<n;i++) slides[i].classList.toggle('active',i===cur);
      for(var d=0;d<dots.children.length;d++) dots.children[d].classList.toggle('active',d===cur);
    }
    for(var i=0;i<n;i++){(function(idx){
      var b=document.createElement('button'); b.setAttribute('role','tab'); b.setAttribute('aria-label','Testimonial '+(idx+1));
      if(idx===0)b.classList.add('active');
      b.addEventListener('click',function(){cur=idx;render();restart();}); dots.appendChild(b);
    })(i);}
    function nx(){cur=(cur+1)%n;render();}
    function restart(){ if(reduced)return; clearInterval(timer); timer=setInterval(nx,5000); }
    render(); restart();
    var vp=track.parentElement;
    vp.addEventListener('mouseenter',function(){clearInterval(timer);});
    vp.addEventListener('mouseleave',restart);
  }

  /* scrollspy */
  var links=document.querySelectorAll('.main-nav a'), secs=[];
  links.forEach(function(l){var id=l.getAttribute('href'); if(id&&id[0]==='#'){var s=document.querySelector(id); if(s)secs.push({l:l,s:s});}});
  if('IntersectionObserver' in window&&secs.length){
    var sp=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.remove('active');});var m=secs.find(function(x){return x.s===e.target;});if(m)m.l.classList.add('active');}});},{rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(x){sp.observe(x.s);});
  }

  /* scroll progress */
  var prog=document.getElementById('scroll-progress');
  if(prog){var raf=false;function up(){var h=document.documentElement,mx=h.scrollHeight-h.clientHeight;prog.style.width=(mx>0?(h.scrollTop||window.scrollY)/mx*100:0)+'%';raf=false;}
    window.addEventListener('scroll',function(){if(!raf){raf=true;requestAnimationFrame(up);}},{passive:true});up();}

  /* ===== Orange particle-trail cursor (like reference image) ===== */
  var canvas=document.getElementById('cursor-canvas');
  if(canvas&&fine&&!reduced){
    var ctx=canvas.getContext('2d'), W,H, parts=[], mouse={x:-100,y:-100}, moved=false;
    function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
    resize(); window.addEventListener('resize',resize);
    window.addEventListener('mousemove',function(e){
      mouse.x=e.clientX; mouse.y=e.clientY; moved=true;
      // spawn a couple particles per move
      for(var k=0;k<2;k++){
        parts.push({
          x:mouse.x+(Math.random()*8-4), y:mouse.y+(Math.random()*8-4),
          vx:(Math.random()*1.2-0.6), vy:(Math.random()*1.2-0.6),
          r:1.5+Math.random()*3, life:1, dec:0.012+Math.random()*0.02
        });
      }
      if(parts.length>240) parts.splice(0,parts.length-240);
    });
    function tick(){
      ctx.clearRect(0,0,W,H);
      for(var i=parts.length-1;i>=0;i--){
        var p=parts[i]; p.x+=p.vx; p.y+=p.vy; p.life-=p.dec;
        if(p.life<=0){ parts.splice(i,1); continue; }
        ctx.beginPath();
        ctx.fillStyle='rgba(232,101,26,'+ (p.life*0.85) +')';
        ctx.arc(p.x,p.y,p.r*p.life,0,Math.PI*2); ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* magnetic buttons */
  if(fine&&!reduced){
    document.querySelectorAll('.btn').forEach(function(b){
      b.addEventListener('mousemove',function(e){
        var r=b.getBoundingClientRect();
        var x=(e.clientX-r.left-r.width/2)/(r.width/2), yy=(e.clientY-r.top-r.height/2)/(r.height/2);
        b.style.transform='translate('+(x*10)+'px,'+(yy*10)+'px)';
      });
      b.addEventListener('mouseleave',function(){b.style.transform='';});
    });
  }
})();