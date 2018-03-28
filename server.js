const http = require('http');
const db = require('./db.js');
const getNews = require('./newsAPI');


//functions to talk to DB

let createUser = (username, password, leaning, email) => {
  return db.query(`INSERT INTO users
    (username, password, leaning, email)
    VALUES('${username}', '${password}', '${leaning}', '${email}');`);
};

let rateArticle = (userid, articleid, rating) => {
  return db.query(`INSERT INTO ratings(userid, articleid, ${rating}) VALUES('${userid}', '${articleid}', 1);`);
};

let addArticle = (url, author, description, publishedAt, source, urlToImage, topic) => {
  return db.query(`INSERT INTO articles(topic, url, author, description, publishedAt, source, urlToImage)
  VALUES('${topic}', '${url}', '${author}', '${description}', '${publishedAt}', '${source}', '${urlToImage}');`);
};

let matches = function(request, method, path) {
  return request.method === method &&
         path.exec(request.url);
};

let routes = [
  { method: 'DELETE', path: /^\/users\/([0-9]+)$/, handler: deleteUser },
  { method: 'GET', path: /^\/users\/([0-9]+)$/, handler: getUser },
  { method: 'PUT', path: /^\/users\/([0-9]+)$/, handler: putUser },
  { method: 'GET', path: /^\/users\/?$/, handler: getUsers },
  { method: 'POST', path: /^\/users\/?$/, handler: postUser },
  { method: 'DELETE', path: /^\/articles\/([0-9]+)$/, handler: deleteArticle },
  { method: 'GET', path: /^\/articles\/([0-9]+)$/, handler: getArticle },
  { method: 'PUT', path: /^\/articles\/([0-9]+)$/, handler: putArticle },
  { method: 'GET', path: /^\/articles\/?$/, handler: getArticles },
  { method: 'POST', path: /^\/articles\/?$/, handler: postUser },
];

let server = http.createServer(function(request, response) {
      let route = routes.find(route => matches(request, route.method, route.path));
  
      (route ? route.handler : notFound)(request, response);
});

server.listen(3000);