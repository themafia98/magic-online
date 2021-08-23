document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[name="regForm"]');

  if (!form) {
    return;
  }

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
  });
});
