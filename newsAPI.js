
$(document).ready(()=>{
	getNews();

	function getNews()
	{
		let endPoint = "https://newsapi.org/v1/articles";
		let apiKey = "0873dd38116a4b1d9db9c7f2d99754a7";
		//sources can be added from the included links.txt
		let urls = [
			`${endPoint}?source=engadget&sortBy=latest&apiKey=${apiKey} `,
			`${endPoint}?source=fortune&sortBy=latest&apiKey=${apiKey} `
		];

		let allResults = [];

		let count = urls.length-1;
		const get =(real)=>{
			$.getJSON(urls[ count ], function(data) {
				console.log("JSON data has been retrieved from " + data.source);
				let news = data.articles; //get only the news articles
				allResults.push(news)
				// printNews(news);
				real();
			})
		};
		recurse();		

		function recurse(){
			if(count >= 0){
				get(recurse);
				count--;
			}
			else
				//allResults is  an arrray of nested objects
				printNews(allResults);
		}
	}

	//display the news
	function printNews(result)
	{	

		let res=[];
		//flatten the array of nested objects into one single array
		result.map(list=>{
			// console.log(list)
			return list.map(item=>{
				// console.log(item)
				res.push(item)
			})
		})
		console.log(res)
		//Shuffle all the news items
		shuffleArray(res);		
		let $printArticlesDiv = $('.printResults');
		for(let i = 0; i < res.length; i++) {
			printArticles(res[i], $printArticlesDiv);
		}
	}
	let printArticles = (source, divToAppend) => {
		let $thumbnailDiv = $('<div></div>').addClass('thumbnail');
		$(divToAppend).append($thumbnailDiv);
		
		let $thumbnailImgContainer = $('<div></div>').addClass('image-container');
		$thumbnailDiv.append($thumbnailImgContainer);
		
		let $thumbnailImg = $('<img></img>').attr('src', source.urlToImage);
		$thumbnailImg.attr('alt', source.title);
		$thumbnailImg.addClass('news-image');
		$thumbnailImgContainer.append($thumbnailImg);
	
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
	
		let $viewArticleButton = $('<button></button>').addClass('view-article-button');
		$viewArticleButton.attr('type', 'button');
		$viewArticleButton.text('View Article');
		$viewArticleButton.click(() => {
			window.open(source.url);
		});
		$viewArticleButtonDiv.append($viewArticleButton);
	}	

	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	}
});