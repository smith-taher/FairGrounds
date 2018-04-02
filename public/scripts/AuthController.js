const loginButton = document.getElementById('login');
const notUserButton = document.getElementById('creation');

let login = (username, password) => {
  var credentials = {
    'username': username,
    'password': password
  };
  return fetch('http://localhost:3000/signin', {method: 'POST', body: JSON.stringify(credentials)})
};

let generateUserInput = () => {
  let userInput = document.createElement('input');
  userInput.setAttribute('placeholder', 'username');
  return userInput
}

let generatePassInput = () => {
  let passInput = document.createElement('input');
  passInput.setAttribute('placeholder', 'password');
  return passInput
}

let generateSlider = () => {
  var leaningSlider = document.createElement('input');
  leaningSlider.setAttribute('type', 'range');
  leaningSlider.setAttribute('min', '1');
  leaningSlider.setAttribute('max', '100');
  leaningSlider.setAttribute('value', '50');
  leaningSlider.setAttribute('class', 'slider');
  return leaningSlider;
}

let generateEmailInput = () => {
  var emailInput = document.createElement('input');
  emailInput.setAttribute('placeholder', 'email address');
  return emailInput;
}

let generateCreateAccountButton = () => {
  var createButton = document.createElement('button');
  createButton.textContent = 'Create Account';
  return createButton;
}

let removeLoginForm = () => {
  let username = document.querySelector('#sign-in-page > div > div > input:nth-child(2)')
  let password = document.querySelector('#sign-in-page > div > div > input:nth-child(3)')
  username.remove();
  password.remove();
  loginButton.remove();
  notUserButton.remove();
}

let generateCreateUserForm = () => {
  let userInput = generateUserInput();
  let passInput = generatePassInput();
  let emailInput = generateEmailInput();
  let leaningSlider = generateSlider();
  let createButton = generateCreateAccountButton();
  let signInDiv = document.querySelector('.sign-in-buttons');
  removeLoginForm();
  signInDiv.appendChild(userInput);
  signInDiv.appendChild(passInput);
  signInDiv.appendChild(emailInput);
  signInDiv.appendChild(leaningSlider);
  signInDiv.appendChild(createButton);


}

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

notUserButton.addEventListener('click', (event) => {
  generateCreateUserForm();
})
