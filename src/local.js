document.addEventListener('DOMContentLoaded', function() {
  const modal = document.querySelector('.modal');
  const title = document.querySelector('.title');
  const maxNameLength = 15;

  function truncateName(name) {
    return name.length > maxNameLength ? name.substring(0, maxNameLength) + '...' : name;
  }

  const storedName = localStorage.getItem('name') || sessionStorage.getItem('name');

  if (storedName) {
    title.textContent = localStorage.getItem('name')
      ? `Welcome ${truncateName(localStorage.getItem('name'))}!`
      : truncateName(sessionStorage.getItem('name'));
    modal.style.display = 'none';
  } else {
    modal.style.display = 'flex';
  }

  document.getElementById('submit-btn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    if (name) {
      const truncatedName = truncateName(name);
      localStorage.setItem('name', truncatedName);
      title.textContent = `Welcome ${truncatedName}!`;
      modal.style.display = 'none';
    } else {
      alert('Please enter a name.');
    }
  });

  document.getElementById('cancel-btn').addEventListener('click', function() {
    const defaultName = "Welcome Folks!";
    sessionStorage.setItem('name', defaultName);
    title.textContent = defaultName;
    modal.style.display = 'none';
  });
});
