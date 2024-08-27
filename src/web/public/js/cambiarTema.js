const sol = document.getElementById('sol')
// const navbarMenu = document.getElementById('v')
const logo = document.getElementById('logo')

let currentTheme = getDefaultTheme();
setTheme(currentTheme);

sol.addEventListener('click', cambiarTema)

function cambiarTema(elem) {
    const newTheme = getNewTheme(currentTheme)
	setTheme(newTheme)
	currentTheme = newTheme
    saveTheme(newTheme)
}

function getNewTheme(theme) {
	return theme === 'dark' ? 'light' : 'dark'
}

function setTheme(theme) {
  const html = document.documentElement
  html.setAttribute('tema', theme)

  if(theme == 'light') {
    sol.src = '/img/sol-negro.svg'
    logo.src = '/img/logo.png'
  }
  if(theme == 'dark') {
    sol.src = '/img/sol.svg'
    logo.src = '/img/logo-negro.png'
  }
}

function getSavedTheme() {
  return localStorage.getItem('tema')
}

function saveTheme(theme) {
  localStorage.setItem('tema', theme)

  if(theme == 'light') {
    sol.src = '/img/sol-negro.svg'
    logo.src = '/img/logo.png'
  }
  if(theme == 'dark') {
    sol.src = '/img/sol.svg'
    logo.src = '/img/logo-negro.png'
  }
}

function getDefaultTheme() {
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
    const systemSettingTheme = systemSettingDark.matches ? "dark" : "light";
    const savedTheme = getSavedTheme();
    return savedTheme ? savedTheme : systemSettingTheme;
}