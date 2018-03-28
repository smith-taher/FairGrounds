const signIn = document.getElementById('sign-in');
const rateArticles = document.getElementById('rate-articles');
const viewArticles = document.getElementById('view-articles');
const viewButton = document.getElementById('view');
const rateButton = document.getElementById('rate');

let login = (username, password) => {
  var credentials = {
    'username': username,
    'password': password
  };
  return fetch('/sign-in', {method: 'GET', body: JSON.stringify(credentials)})
};

let showPageButton = function(buttonDom, newViewableDom) {
    buttonDom.addEventListener('click', function(){
        let visiblePage = document.getElementsByClassName('viewable-on')[0];
        visiblePage.className = 'viewable-off';
        newViewableDom.className = "viewable-on";
    });
};

let renderButtons = function() {
    let userViewArticles = showPageButton(viewButton, viewArticles);
    let userRateArticles = showPageButton(rateButton, rateArticles);
}

renderButtons();
