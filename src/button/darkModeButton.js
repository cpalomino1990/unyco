export const darkModeButton = document.getElementById('toggle-dark-mode');
  darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });