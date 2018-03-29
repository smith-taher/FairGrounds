const http = require('http');
const pg = require('pg-promise')();
const db = pg('postgres://rachelpoulos@localhost:5432/fairgrounds');
const getNews = require('./newsAPI');


//functions to talk to DB

let createUserDb = (username, password, leaning, email) => {
  return db.query(`INSERT INTO users
    (username, password, leaning, email)
    VALUES('${username}', '${password}', '${leaning}', '${email}');`);
};

let getUserDb = (id) => {
  return db.query(`SELECT * from users where articleid = ${id}`);
}

let getUsersDb = () => {
  return db.query(`SELECT * from users`);
}

let getArticleDb = (id) => {
  return db.query(`SELECT * from articles where article = ${id}`);
}

let getArticlesDb = () => {
  return db.query(`SELECT * from articles`);
}

let rateArticleDb = (userid, articleid, rating) => {
  return db.query(`INSERT INTO ratings(userid, articleid, ${rating}) VALUES('${userid}', '${articleid}', 1);`);
};

let addArticleDb = (url, author, description, publishedAt, source, urlToImage, topic) => {
  return db.query(`INSERT INTO articles(topic, url, author, description, publishedAt, source, urlToImage)
  VALUES('${topic}', '${url}', '${author}', '${description}', '${publishedAt}', '${source}', '${urlToImage}');`);
};

//helper functions

let getSuffix = (fullUrl, prefix) => fullUrl.slice(prefix.length);

//handlers

let getUser = (request, response) => {
  let id = getSuffix(request.url, '/users/');
  getUserDb(id).then((data) => response.end(JSON.stringify(data)));
}

let getUsers = (request, response) => {
  getUsersDb().then((data) => response.end(JSON.stringify(data)));
}

let getArticle = (request, response) => {
  let id = getSuffix(request.url, '/articles/');
  getArticleDb(id).then((data) => response.end(JSON.stringify(data)));
}

let getUsers = (request, response) => {
  getArticlesDb().then((data) => response.end(JSON.stringify(data)));
}

//Routes and server

let matches = (request, method, path) => {
  return request.method === method &&
         path.exec(request.url);
};

let notFound = (request, response) => {
  response.statusCode = 404;
  response.end('404, nothing here!');
};

let routes = [
  // { method: 'DELETE', path: /^\/users\/([0-9]+)$/, handler: deleteUser },
  { method: 'GET', path: /^\/users\/([0-9]+)$/, handler: getUser },
  // { method: 'PUT', path: /^\/users\/([0-9]+)$/, handler: putUser },
  { method: 'GET', path: /^\/users\/?$/, handler: getUsers },
  // { method: 'POST', path: /^\/users\/?$/, handler: postUser },
  // { method: 'POST', path: /^\/signin\/?$/, handler: signIn },
  // { method: 'DELETE', path: /^\/articles\/([0-9]+)$/, handler: deleteArticle },
  // { method: 'GET', path: /^\/articles\/([0-9]+)$/, handler: getArticle },
  // { method: 'PUT', path: /^\/articles\/([0-9]+)$/, handler: putArticle },
  // { method: 'GET', path: /^\/articles\/?$/, handler: getArticles },
  // { method: 'POST', path: /^\/articles\/?$/, handler: postArticle },
  // { method: 'DELETE', path: /^\/ratings\/([0-9]+)$/, handler: deleteRating},
  // { method: 'GET', path: /^\/ratings\/([0-9]+)$/, handler: getRating },
  // { method: 'PUT', path: /^\/ratings\/([0-9]+)$/, handler: putRating },
  // { method: 'GET', path: /^\/ratings\/?$/, handler: getRatings },
  // { method: 'POST', path: /^\/ratings\/?$/, handler: postRating }
];

let server = http.createServer(function(request, response) {
      let route = routes.find(route => matches(request, route.method, route.path));
  
      (route ? route.handler : notFound)(request, response);
});

server.listen(3000);