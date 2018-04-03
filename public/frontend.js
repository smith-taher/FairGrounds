const signIn = document.getElementById('sign-in-page');
const rateArticles = document.getElementById('rate-articles');
const viewArticles = document.getElementById('view-articles');
const viewButton = document.getElementById('view');
const rateButton = document.getElementById('rate');
const signInButton = document.getElementById('sign-in');



let showPageButton = (buttonDom, newViewableDom) => {
    buttonDom.addEventListener('click', function(){
        let visiblePage = document.getElementsByClassName('viewable-on')[0];
        visiblePage.className = 'viewable-off';
        newViewableDom.className = "viewable-on";
    });
};

let getToken = () => localStorage.getItem('token');

let setTokenToHeader = (token) => {
  let tokenHeader = new Headers();
  tokenHeader.append('authorization', token);
  return tokenHeader;
}

let createSignOutButton = () => {
  let signOutButton = document.createElement('li');
  signOutButton.classList.add('nav-button');
  signOutButton.setAttribute('id', 'sign-out');
  signOutButton.textContent = 'Sign Out';
  signOutButton.addEventListener('click', (event) => {
    localStorage.clear();
    window.location.href="http://localhost:3000/index.html";
  })
  return signOutButton;
}

  try {
    let token = getToken();
    let tokenHeader = setTokenToHeader(token);
    fetch('http://localhost:3000/token', {method: 'GET', headers: tokenHeader})
    .then(response => {
      if (response.status != 404) {
        signInButton.remove();
        let signOutButton = createSignOutButton();
        let buttonParent = document.querySelector('.navigation-top');
        buttonParent.appendChild(signOutButton);
      };
    })
  } catch(err) {
    console.log(err);
  }

let renderButtons = () => {
    showPageButton(viewButton, viewArticles);
    showPageButton(rateButton, rateArticles);
    showPageButton(signInButton, signIn);
}

renderButtons();
