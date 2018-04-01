let getNews = number

let printArticles = (sourceObject, divToAppend) => {
    let $bsDiv = $('<div></div>').addClass('col-sm-4 col-md-4');
    $(divToAppend).append($bsDiv);
    
    let $thumbnailDiv = $('<div></div>').addClass('thumbnail');
    $bsDiv.append($thumbnailDiv);
    
    let $thumbnailImg = $('<img>').attr('src', source.urlToImage);
    $thumbnailImg.attr('alt', source.title);
    $thumbnailImg.addClass(img-responsive);
    $thumbnailDiv.append($thumbnailImg);

    let $captionDiv = $('<div></div>').addClass('caption');
    $thumbnailDiv.append($captionDiv);

    let $titleH2 = $('<h2></h2>').addClass('title');
    $titleH2.text(source.title);
    $captionDiv.append($titleH2);

    let $descriptionH4 = $('<h4></h4>').addClass('description');
    $descriptionH4.text(source.description);
    $captionDiv.append($descriptionH4);

    let $viewArticleButtonDiv = $('<div></div>').addClass('view-article-div');
    $captionDiv.append($viewArticleButtonDiv);

    let $viewArticleButton = $('<a></a>').addClass('btn btn-primary');
    $viewArticleButton.attr('href', source.url);
    $viewArticleButton.attr('target', '_blank');
    $viewArticleButton.attr('role', 'button');
    $viewArticleButton.text('View Article');
    $viewArticleButtonDiv.append($viewArticleButton);
}