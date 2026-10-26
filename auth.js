function switchAuthTab(tab) {
  const loginForm = document.getElementById('formLogin');
  const registerForm = document.getElementById('formRegister');
  const loginTab = document.getElementById('authTabLogin');
  const registerTab = document.getElementById('authTabRegister');

  if (tab === 'login') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    loginTab.className = 'flex-1 py-2 rounded-xl bg-white text-[#0E7A4A] shadow-xs transition font-bold';
    registerTab.className = 'flex-1 py-2 rounded-xl text-slate-600 hover:text-slate-900 transition font-medium';
    return;
  }

  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
  registerTab.className = 'flex-1 py-2 rounded-xl bg-white text-[#0E7A4A] shadow-xs transition font-bold';
  loginTab.className = 'flex-1 py-2 rounded-xl text-slate-600 hover:text-slate-900 transition font-medium';
}

function saveUserAndContinue(user) {
  const session = encodeURIComponent(JSON.stringify({
    name: user.name,
    community: user.community
  }));
  window.location.href = `./app.html#session=${session}`;
}

function handleAuthLogin(event) {
  event.preventDefault();
  const userField = document.getElementById('loginUser').value.trim();

  saveUserAndContinue({
    name: userField.includes('@') ? 'Maria' : userField,
    email: userField,
    community: 'Vila Nova do Rio'
  });
}

function handleAuthRegister(event) {
  event.preventDefault();

  saveUserAndContinue({
    name: document.getElementById('regName').value.trim(),
    email: document.getElementById('regEmail').value.trim(),
    community: document.getElementById('regCommunity').value.trim()
  });
}
