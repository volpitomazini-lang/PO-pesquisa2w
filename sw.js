/* CONTROLE DE TELAS */
function showCard(id) {
  if (window.intervaloAtivo) clearInterval(window.intervaloAtivo);
  document.querySelectorAll('.card').forEach(card => card.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

/* TELA 1 -> TELA 2 (ACORDO) */
function goLogin() {
  const agree = document.getElementById('agree');
  if (!agree || !agree.checked) {
    alert('Você precisa concordar com os termos.');
    return;
  }
  showCard('t2');
}

/* TELA 2 -> TELA 3 (LOGIN) */
function login() {
  const email = document.getElementById('email')?.value.trim();
  const pix = document.getElementById('pix')?.value.trim();

  if (!email || !pix) {
    alert('Preencha todos os campos.');
    return;
  }

  // Preenche os dados na tela de usuário (Perfil)
  const dispEmail = document.getElementById('dispEmail');
  const dispPix = document.getElementById('dispPix');
  if(dispEmail) dispEmail.innerText = email;
  if(dispPix) dispPix.innerText = pix;

  showCard('t3');
  startTimer(30, 'timer30', ['like', 'dislike'], true);
}

/* TIMER UNIFICADO (COM GATILHO MONETAG) */
function startTimer(segundos, displayId, btnIds, temVignette) {
  let time = segundos;
  const timerEl = document.getElementById(displayId);
  
  btnIds.forEach(id => {
    const btn = document.getElementById(id);
    if(btn) btn.disabled = true;
  });

  if(timerEl) timerEl.textContent = time;

  window.intervaloAtivo = setInterval(() => {
    time--;
    if(timerEl) timerEl.textContent = time;

    // Gatilho Crítico: 10 segundos na T3 (exibe anúncio)
    if (temVignette && time === 20) {
      window.dispatchEvent(new Event('click'));
    }

    if (time <= 0) {
      clearInterval(window.intervaloAtivo);
      btnIds.forEach(id => {
        const btn = document.getElementById(id);
        if(btn) btn.disabled = false;
      });
    }
  }, 1000);
}

/* TRANSIÇÕES DE TELA */
function proximaEtapa(proximaTela) {
  window.dispatchEvent(new Event('click')); // Trigger Monetag
  showCard(proximaTela);
  
  // Configura os timers específicos de cada tela após a T3
  if(proximaTela === 't4') startTimer(10, 'timer10a', ['utilSim', 'utilNao'], false);
  if(proximaTela === 't5') startTimer(10, 'timer10b', ['indSim', 'indNao'], false);
  if(proximaTela === 't6') startTimer(10, 'timer10c', ['btnResgate'], false);
}

function showUserPage() {
  showCard('t_user');
}
