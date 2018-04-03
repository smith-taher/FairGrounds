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

let setTokenToHeader = (token, request) => {
  request.setHeader('authorization', token);
}

let renderButtons = () => {
    showPageButton(viewButton, viewArticles);
    showPageButton(rateButton, rateArticles);
    showPageButton(signInButton, signIn);
}

renderButtons();
