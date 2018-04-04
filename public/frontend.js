const signIn = document.getElementById('sign-in-page');
const rateArticles = document.getElementById('rate-articles');
const viewArticles = document.getElementById('view-articles');
const $viewButton = $('#view');
const $rateButton = $('#rate');
const $signInButton = $('#sign-in');
const $printResult = $('.printResults');
const $printArticleForRating = $('.printArticleForRating');


//drawing tiles functions
let printArticles = (source, divToAppend) => {
	let $thumbnailDiv = $('<div></div>').addClass('thumbnail');
	divToAppend.append($thumbnailDiv);
	
	let $thumbnailImgContainer = $('<div></div>').addClass('image-container');
	$thumbnailDiv.append($thumbnailImgContainer);
	
	let $thumbnailImg = $('<img></img>').attr('src', source.urltoimage);
	$thumbnailImg.attr('alt', 'Story Image');
	$thumbnailImg.addClass('news-image');
	$thumbnailImgContainer.append($thumbnailImg);

	let $captionDiv = $('<div></div>').addClass('caption');
	$thumbnailDiv.append($captionDiv);

	let $titleH2 = $('<h2></h2>').addClass('title');
	$titleH2.text(source.title);
	$captionDiv.append($titleH2);
	
	let $authorSourceDate = $('<h6></h6>').addClass('author-source-date');
	$authorSourceDate.text(`By ${source.author} from ${source.source} on ${source.publishedat}`);
	$captionDiv.append($authorSourceDate);

	let $descriptionH4 = $('<p></p>').addClass('description');
	$descriptionH4.text(source.description);
	$captionDiv.append($descriptionH4);

	let $viewArticleButtonDiv = $('<div></div>').addClass('view-article-div');
	$thumbnailDiv.append($viewArticleButtonDiv);

	let $viewArticleButton = $('<button></button>').addClass('view-article-button');
	$viewArticleButton.attr('type', 'button');
	$viewArticleButton.text('View Article');
	$viewArticleButton.click(() => {
		window.open(source.url);
	});
    $viewArticleButtonDiv.append($viewArticleButton);
    
    let $ratingsDiv = $('<div></div>').addClass('ratings-container');
    $thumbnailDiv.append($ratingsDiv);

    let $conservativeRating = $('<div></div').addClass('rating');
    $conservativeRating.text(source.conservative);
    $ratingsDiv.append($conservativeRating);
}

let printArticlesForRating = (source, divToAppend, currentArticle) => {
	divToAppend.empty();

	let $thumbnailDiv = $('<div></div>').addClass('thumbnail');
	divToAppend.append($thumbnailDiv);
	
	let $thumbnailImgContainer = $('<div></div>').addClass('image-container');
	$thumbnailDiv.append($thumbnailImgContainer);
	
	let $thumbnailImg = $('<img></img>').attr('src', source.urltoimage);
	$thumbnailImg.attr('alt', 'Story Image');
	$thumbnailImg.addClass('news-image');
	$thumbnailImgContainer.append($thumbnailImg);

	let $captionDiv = $('<div></div>').addClass('caption');
	$thumbnailDiv.append($captionDiv);

	let $titleH2 = $('<h2></h2>').addClass('title');
	$titleH2.text(source.title);
	$captionDiv.append($titleH2);
	
	let $authorSourceDate = $('<h6></h6>').addClass('author-source-date');
	$authorSourceDate.text(`By ${source.author} from ${source.source} on ${source.publishedat}`);
	$captionDiv.append($authorSourceDate);

	let $descriptionH4 = $('<p></p>').addClass('description');
	$descriptionH4.text(source.description);
	$captionDiv.append($descriptionH4);

	let $buttonDiv = $('<div></div>').addClass('view-article-div');
	$thumbnailDiv.append($buttonDiv);

	let $viewArticleButton = $('<button></button>').addClass('view-article-button');
	$viewArticleButton.attr('type', 'button');
	$viewArticleButton.text('View Article');
	$viewArticleButton.click(() => {
		window.open(source.url);
	});
	$buttonDiv.append($viewArticleButton);

	let $skipArticleButton = $('<button></button>').addClass('skip-article-button');
	$skipArticleButton.attr('type', 'button');
	$skipArticleButton.text('Skip Article');
	$skipArticleButton.click(() => {
		getDBArticleForRating(currentArticle + 1);
	});
	$buttonDiv.append($skipArticleButton);

	let $fairArticleButton = $('<button></button>').addClass('fair-article-button');
	$fairArticleButton.attr('type', 'button');
	$fairArticleButton.text('Fair');
	$fairArticleButton.click(() => {
		getDBArticleForRating();
	});
	$buttonDiv.append($fairArticleButton);

	let $unfairArticleButton = $('<button></button>').addClass('unfair-article-button');
	$unfairArticleButton.attr('type', 'button');
	$unfairArticleButton.text('Unfair');
	$unfairArticleButton.click(() => {
		getDBArticleForRating();
	});
	$buttonDiv.append($unfairArticleButton);
}

//sign-in info

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
        $signInButton.remove();
        let signOutButton = createSignOutButton();
        let buttonParent = document.querySelector('.navigation-top');
        buttonParent.appendChild(signOutButton);
      };
    })
  } catch(err) {
    console.log(err);
  }

//database requests
let getDBArticleForRating = (articleToGet) => {
	$.get('http://localhost:3000/articlestorate', data => {
        let articles = JSON.parse(data);
		let theArticle = articles[articleToGet];
		printArticlesForRating(theArticle, $printArticleForRating, articleToGet);
	})
}

let getDBArticlesView  = () => {
    $.get('http://localhost:3000/articles', data => {
        let articles = JSON.parse(data);
        articles.forEach(element => {
            console.log(element);
            printArticles(element, $printResult);
        })
    })
}

//button functions
let showPageButton = (buttonDom, newViewableDom) => {
    buttonDom.click(function(){
        let visiblePage = document.getElementsByClassName('viewable-on')[0];
        visiblePage.className = 'viewable-off';
        newViewableDom.className = "viewable-on";
    });
};

let renderButtons = () => {
    showPageButton($viewButton, viewArticles);
    $viewButton.click(() => {
        $printResult.empty();
        getDBArticlesView();
    })
    showPageButton($rateButton, rateArticles);
    $rateButton.click(() => getDBArticleForRating(0));
    showPageButton($signInButton, signIn);
}

renderButtons();
