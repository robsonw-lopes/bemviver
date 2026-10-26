function saveUserAndContinue(user) {
  try {
    localStorage.removeItem('app_comunitario_terms_accepted');
    localStorage.removeItem('app_comunitario_pending_user');
  } catch (error) {
    console.warn('Não foi possível limpar o estado de consentimento anterior.', error);
  }

  const session = encodeURIComponent(JSON.stringify({
    name: user.name,
    community: user.community
  }));

  window.location.href = `./app.html#session=${session}`;
}

function handleAuthLogin(event) {
  event.preventDefault();

  saveUserAndContinue({
    name: 'Maria',
    community: 'Vila Nova do Rio'
  });
}
