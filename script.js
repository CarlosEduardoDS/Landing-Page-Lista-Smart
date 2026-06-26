(function(){
  "use strict";

  /* ----- price compare demo ----- */
  var PRODUCTS = [
    {name:"Café torrado 500g", icon:"☕", prices:{"Atacão Real":15.49,"Boa Compra":16.90,"Super Econômico":18.90,"Preço Bom":19.20}},
    {name:"Arroz 5kg",          icon:"🍚", prices:{"Atacão Real":24.90,"Boa Compra":22.49,"Super Econômico":27.90,"Preço Bom":25.50}},
    {name:"Leite 1L",           icon:"🥛", prices:{"Atacão Real":4.79,"Boa Compra":5.29,"Super Econômico":4.49,"Preço Bom":5.10}},
    {name:"Detergente 500ml",   icon:"🧴", prices:{"Atacão Real":2.99,"Boa Compra":2.49,"Super Econômico":3.20,"Preço Bom":2.79}}
  ];
  var CODES = ["B0ULDD","K7MZQA","P3XRT9","V2WLN6"];
  var brl = function(n){ return "R$ " + n.toFixed(2).replace(".",","); };

  var chipsEl = document.getElementById("chips");
  var rowsEl  = document.getElementById("rows");
  var nameEl  = document.getElementById("cmpName");
  var saveEl  = document.getElementById("saveVal");
  var codeEl  = document.getElementById("shareCode");
  var current = 0, countTimer = null;

  PRODUCTS.forEach(function(p,i){
    var b = document.createElement("button");
    b.className = "chip" + (i===0?" active":"");
    b.setAttribute("role","tab");
    b.innerHTML = "<span aria-hidden='true'>"+p.icon+"</span> "+p.name;
    b.addEventListener("click", function(){ select(i); });
    chipsEl.appendChild(b);
  });

  function countTo(target){
    if(countTimer) cancelAnimationFrame(countTimer);
    if(window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches){
      saveEl.textContent = brl(target); return;
    }
    var start = performance.now(), dur = 600;
    function step(t){
      var k = Math.min((t-start)/dur, 1);
      var e = 1 - Math.pow(1-k, 3);
      saveEl.textContent = brl(target*e);
      if(k<1) countTimer = requestAnimationFrame(step); else saveEl.textContent = brl(target);
    }
    countTimer = requestAnimationFrame(step);
  }

  function select(i){
    current = i;
    var p = PRODUCTS[i];
    nameEl.textContent = p.name;
    codeEl.textContent = CODES[i % CODES.length];

    var arr = Object.keys(p.prices).map(function(m){ return {m:m, v:p.prices[m]}; });
    arr.sort(function(a,b){ return a.v - b.v; });
    var min = arr[0].v, max = arr[arr.length-1].v;

    rowsEl.innerHTML = "";
    arr.forEach(function(item, idx){
      var row = document.createElement("div");
      row.className = "row" + (idx===0?" best":"");
      var ribbon = idx===0 ? "<span class='tag'>Mais barato</span>" : "";
      row.innerHTML = ribbon +
        "<span class='market'><span class='dot'></span>"+item.m+"</span>" +
        "<span class='price'>"+brl(item.v)+"</span>";
      rowsEl.appendChild(row);
    });

    Array.prototype.forEach.call(chipsEl.children, function(c, ci){
      c.classList.toggle("active", ci===i);
    });
    countTo(max - min);
  }
  select(0);

  /* ----- nav scroll state + mobile menu ----- */
  var nav = document.getElementById("nav");
  window.addEventListener("scroll", function(){
    nav.classList.toggle("scrolled", window.scrollY > 8);
  }, {passive:true});

  var burger = document.getElementById("burger");
  var navlinks = document.getElementById("navlinks");
  burger.addEventListener("click", function(){
    var open = navlinks.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navlinks.addEventListener("click", function(e){
    if(e.target.tagName === "A"){ navlinks.classList.remove("open"); burger.setAttribute("aria-expanded","false"); }
  });

  /* ----- reveal on scroll ----- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
  }, {threshold:.16});
  document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });

  /* ----- problem bars animate when visible ----- */
  var spread = document.querySelector(".spread");
  if(spread){
    var io2 = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          en.target.querySelectorAll(".fill").forEach(function(f){ f.style.width = f.getAttribute("data-w"); });
          io2.unobserve(en.target);
        }
      });
    }, {threshold:.4});
    io2.observe(spread);
  }

  /* ----- contact form (front-end only) ----- */
  var sendBtn = document.getElementById("sendBtn");
  var formMsg = document.getElementById("formMsg");
  sendBtn.addEventListener("click", function(){
    var req = ["mkt","resp","cidade","email"];
    var ok = true, firstBad = null;
    req.forEach(function(id){
      var el = document.getElementById(id);
      if(!el.value.trim()){ ok=false; el.style.borderColor="#D32F2F"; if(!firstBad) firstBad=el; }
      else { el.style.borderColor=""; }
    });
    if(!ok){ if(firstBad) firstBad.focus(); return; }
    formMsg.classList.add("show");
    sendBtn.textContent = "Enviado ✓";
    sendBtn.disabled = true;
    sendBtn.style.opacity = ".7";
  });

})();
