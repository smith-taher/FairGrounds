const articlesDbUrl = 'http://localhost:3000/articles';
const $printResult = $('.printResults');
$.get(articlesDbUrl, data => {
	let articles = JSON.parse(data);
	articles.slice(0, 25);
	articles.forEach(element => {
		printArticles(element, $printResult);
	});
})

let printArticles = (source, divToAppend) => {
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

	let $viewArticleButtonDiv = $('<div></div>').addClass('view-article-div');
	$thumbnailDiv.append($viewArticleButtonDiv);

	let $viewArticleButton = $('<button></button>').addClass('view-article-button');
	$viewArticleButton.attr('type', 'button');
	$viewArticleButton.text('View Article');
	$viewArticleButton.click(() => {
		window.open(source.url);
	});
	$viewArticleButtonDiv.append($viewArticleButton);
}