const $printArticleForRating = $('.printArticleForRating');
const $RateArticleButton = $('#rate');

let getDBArticleForRating = () => {
	$.get('http://localhost:3000/articlestorate', data => {
		let articles = JSON.parse(data);
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		let theArticle = articles[getRandomInt(articles.length)];
		// console.log(getRandomInt(articles.length));
		printArticleForRating(articles[getRandomInt(articles.length)], $printArticleForRating);
	})
}
getDBArticleForRating();

$RateArticleButton.click(function() {
	getDBArticleForRating();
});

let printArticleForRating = (source, divToAppend) => {
	divToAppend.empty();
		let $thumbnailDiv = $('<div></div>').addClass('thumbnail');
	$(divToAppend).append($thumbnailDiv);
	
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
		getDBArticleForRating();
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