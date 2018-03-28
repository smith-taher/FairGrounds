const signIn = document.getElementById('sign-in');
const rateArticles = document.getElementById('rate-articles');
const viewArticles = document.getElementById('view-articles');
const viewButton = document.getElementById('view');
const rateButton = document.getElementById('rate');

let showPageButton = function(buttonDom, newViewableDom) {
    buttonDom.addEventListener('click', function(){
        let visiblePage = document.getElementsByClassName('viewable-on')[0];
        console.log(visiblePage);
        visiblePage.className = 'viewable-off';
        newViewableDom.className = "viewable-on";
    });
};


showPageButton(viewButton, viewArticles);
showPageButton(rateButton, rateArticles);
