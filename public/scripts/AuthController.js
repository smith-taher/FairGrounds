const loginButton = document.getElementById('login');

let login = (username, password) => {
  var credentials = {
    'username': username,
    'password': password
  };
  return fetch('http://localhost:3000/signin', {method: 'POST', body: JSON.stringify(credentials)})
};

loginButton.addEventListener('click', (event) => {
  let username = document.querySelector('#sign-in-page > div > div > input:nth-child(2)').value;
  let password = document.querySelector('#sign-in-page > div > div > input:nth-child(3)').value;
  login(username, password)
  .then(response => response.text())
  .then(token => {
  localStorage.setItem('token', token);})
  .then(response => {
    window.location.href="http://localhost:3000/index.html"
  });
});
