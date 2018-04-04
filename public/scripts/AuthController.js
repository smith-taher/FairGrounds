const loginButton = document.getElementById('login');
const notUserButton = document.getElementById('creation');

let login = (username, password) => {
  var credentials = {
    'username': username,
    'password': password
  };
  console.log(credentials);
  return fetch('/signin', {method: 'POST', body: JSON.stringify(credentials)})
};

let generateUserInput = () => {
  let userInput = document.createElement('input');
  userInput.setAttribute('placeholder', 'username');
  userInput.setAttribute('id', 'newUser');
  return userInput
}

let generatePassInput = () => {
  let passInput = document.createElement('input');
  passInput.setAttribute('placeholder', 'password');
  passInput.setAttribute('id', 'newPass');
  return passInput
};

let generateSlider = () => {
  var leaningSlider = document.createElement('input');
  leaningSlider.setAttribute('type', 'range');
  leaningSlider.setAttribute('min', '1');
  leaningSlider.setAttribute('max', '100');
  leaningSlider.setAttribute('value', '50');
  leaningSlider.setAttribute('class', 'slider');
  leaningSlider.setAttribute('id', 'newLeaning');
  return leaningSlider;
};

let generateEmailInput = () => {
  var emailInput = document.createElement('input');
  emailInput.setAttribute('placeholder', 'email address');
  emailInput.setAttribute('id', 'newEmail');
  return emailInput;
};

let generateCreateAccountButton = () => {
  var createButton = document.createElement('button');
  createButton.textContent = 'Create Account';
  createButton.addEventListener('click', event => {
    sendCreationCredentials(event)
    .then(response => response.text())
    .then(token => {
      localStorage.setItem('token', token);})
    .then(response => {
        window.location.href="/index.html"
    });
  })
  return createButton;
};

let sendCreationCredentials = (event) => {
  let credentials = {
    'username': document.getElementById('newUser').value,
    'password': document.getElementById('newPass').value,
    'email': document.getElementById('newEmail').value,
    'leaning': document.getElementById('newLeaning').value
  };
  return fetch('/users', {method: 'POST', body: JSON.stringify(credentials)});
}

let removeLoginForm = () => {
  let username = document.getElementById('user');
  let password = document.getElementById('pass');
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
  let username = document.getElementById('user').value;
  let password = document.getElementById('pass').value;
  login(username, password)
  .then(response => {
    if (response.status != 404) {
      return response.text()
    }
  })
  .then(token => {
    console.log(token);
    localStorage.setItem('token', token);
  })
  .then(response => {
    window.location.href="/index.html";
  });
});

notUserButton.addEventListener('click', (event) => {
  generateCreateUserForm();
})
