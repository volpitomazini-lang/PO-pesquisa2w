<script>
/* Controle de telas */
function showCard(id) {
  document.querySelectorAll('.card').forEach(card => {
    card.classList.remove('active');
  });
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

/* Tela 1 -> Tela 2 */
function goLogin() {
  const agree = document.getElementById('agree');
  if (!agree || !agree.checked) {
    alert('Você precisa concordar com os termos.');
    return;
  }
  showCard('t2');
}

/* Tela 2 -> Tela 3 */
function login() {
  const email = document.getElementById('email')?.value.trim();
  const pix = document.getElementById('pix')?.value.trim();

  if (!email || !pix) {
    alert('Preencha todos os campos.');
    return;
  }

  showCard('t3');
  startTimer30();
}

/* Timer 30s */
function startTimer30() {
  let time = 30;
  const timer = document.getElementById('timer30');
  const like = document.getElementById('like');
  const dislike = document.getElementById('dislike');

  like.disabled = true;
  dislike.disabled = true;

  timer.textContent = time;

  const interval = setInterval(() => {
    time--;
    timer.textContent = time;

    if (time <= 0) {
      clearInterval(interval);
      like.disabled = false;
      dislike.disabled = false;
    }
  }, 1000);
}

/* Tela 3 -> Tela 4 */
function nextUtil() {
  showCard('t4');
  startTimer10();
}

/* Timer 10s */
function startTimer10() {
  let time = 10;
  const timer = document.getElementById('timer10a');
  const yes = document.getElementById('utilSim');
  const no = document.getElementById('utilNao');

  yes.disabled = true;
  no.disabled = true;

  timer.textContent = time;

  const interval = setInterval(() => {
    time--;
    timer.textContent = time;

    if (time <= 0) {
      clearInterval(interval);
      yes.disabled = false;
      no.disabled = false;
    }
  }, 1000);
}

/* Tela 4 -> Volta */
function nextIndicaria() {
  showCard('t3');
  startTimer30();
}

/* Página do usuário (se existir) */
function showUserPage() {
  alert('Página do usuário em desenvolvimento');
}
</script>