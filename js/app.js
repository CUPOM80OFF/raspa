let saldo = 0;
let pixConfirmado = false;

/* COOKIES */
function acceptCookies(){
  document.getElementById("cookieBox").style.display="none";
}

/* PIX */
function confirmarPix(){
  pixConfirmado = true;
  saldo += 50;
  document.getElementById("saldo").innerText = saldo.toFixed(2);
  alert("✅ Pix confirmado! Agora você pode raspar.");
  criarRaspas();
}

/* ONLINE */
let online = 1248;
setInterval(()=>{
  online += Math.floor(Math.random()*6 - 2);
  if(online < 900) online = 900;
  document.getElementById("onlineCount").innerText = online;
},3000);

/* PLAYERS */
const players = [
  {nome:"Lucas", idade:27, foto:"https://randomuser.me/api/portraits/men/32.jpg"},
  {nome:"Mariana", idade:24, foto:"https://randomuser.me/api/portraits/women/45.jpg"},
  {nome:"Rafael", idade:31, foto:"https://randomuser.me/api/portraits/men/76.jpg"},
  {nome:"Camila", idade:29, foto:"https://randomuser.me/api/portraits/women/68.jpg"},
  {nome:"Diego", idade:35, foto:"https://randomuser.me/api/portraits/men/12.jpg"},
  {nome:"Ana", idade:22, foto:"https://randomuser.me/api/portraits/women/19.jpg"}
];

/* AVATARES AO VIVO */
function atualizarAvatares(){
  const box = document.getElementById("liveAvatars");
  box.innerHTML="";
  players.sort(()=>0.5-Math.random()).slice(0,4).forEach(p=>{
    const img=document.createElement("img");
    img.src=p.foto;
    box.appendChild(img);
  });
}
atualizarAvatares();
setInterval(atualizarAvatares,5000);

/* NOTIFICAÇÃO TOPO */
function mostrarTopo(){
  const p = players[Math.floor(Math.random()*players.length)];
  const premio = Math.floor(Math.random()*900)+50;
  const box = document.getElementById("topNotify");

  box.innerHTML = `
    <img src="${p.foto}">
    <strong>${p.nome}</strong>, ${p.idade} anos<br>
    sacou <span>R$ ${premio},00</span>
  `;
  box.style.display="block";

  setTimeout(()=>box.style.display="none",4500);
}
mostrarTopo();
setInterval(mostrarTopo,100000);

/* RASPADINHAS */
function criarRaspas(){
  const grid=document.getElementById("raspas");
  grid.innerHTML="";
  for(let i=0;i<6;i++){
    const card=document.createElement("div");
    card.className="card";

    const premio=Math.random()<0.35?Math.floor(Math.random()*1000)+10:0;
    const span=document.createElement("span");
    span.innerText=premio>0?`R$ ${premio}`:"";

    const canvas=document.createElement("canvas");
    canvas.width=200;
    canvas.height=120;

    raspar(canvas,premio);
    card.append(span,canvas);
    grid.appendChild(card);
  }
}

function raspar(canvas,premio){
  const ctx=canvas.getContext("2d");
  ctx.fillStyle="#9a9a9a";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  canvas.addEventListener("mousemove",e=>{
    if(!pixConfirmado||e.buttons!==1) return;
    const r=canvas.getBoundingClientRect();
    ctx.globalCompositeOperation="destination-out";
    ctx.beginPath();
    ctx.arc(e.clientX-r.left,e.clientY-r.top,18,0,Math.PI*2);
    ctx.fill();
  });

  canvas.addEventListener("mouseup",()=>{
    if(premio>0){
      saldo+=premio;
      document.getElementById("saldo").innerText=saldo.toFixed(2);
    }
  });
}
