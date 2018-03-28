
var url = 'https://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2018-03-28&' +
          'sortBy=popularity&' +
          'apiKey=0873dd38116a4b1d9db9c7f2d99754a7';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());
    })

