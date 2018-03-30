const http = require('http');
const pg = require('pg-promise')();
const db = pg('postgres://rachelpoulos@localhost:5432/fairgrounds');
// const getNews = require('./newsAPI');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const signature = '@!#$%%^&#$!@#^&***()ROBBY';


//functions to talk to DB

let createUserDb = (user) => 
    db.query(`INSERT INTO users
    (username, password, leaning, email)
    VALUES('${user.username}', '${user.password}', '${user.leaning}', '${user.email}');`);

let getUserDb = (id) => db.query(`SELECT * from users where userid = ${id}`);

let getUsersDb = () => db.query(`SELECT * from users`);

let getArticleDb = (id) => db.query(`SELECT * from articles where articleid = ${id}`);

let getArticlesDb = () => db.query(`SELECT * from articles`);

let getRatingDb = (id) => db.query(`SELECT * from ratings where ratingid = ${id}`);

let getRatingsDb = () => db.query(`SELECT * from ratings`);

let deleteUserDb = (id) => db.query(`DELETE FROM users WHERE userid = ${id}`);

let deleteArticleDb = (id) => db.query(`DELETE FROM articles WHERE articleid = ${id}`);

let deleteRatingDb = (id) => db.query(`DELETE FROM ratings WHERE ratingid = ${id}`);

let rateArticleDb = (rating) => 
  db.query(`INSERT INTO ratings(userid, articleid, ${rating.rating}) VALUES('${rating.userid}', '${rating.articleid}', 1);`);

let addArticleDb = (url, author, description, publishedAt, source, urlToImage, topic) => 
  db.query(`INSERT INTO articles(topic, url, author, description, publishedAt, source, urlToImage)
  VALUES('${topic}', '${url}', '${author}', '${description}', '${publishedAt}', '${source}', '${urlToImage}');`);

//helper functions

let getSuffix = (fullUrl, prefix) => fullUrl.slice(prefix.length);

let readIncoming = (request, callback) => {
  let incoming = '';
  request.on('data', function(chunk) {
      incoming += chunk.toString();
  });
  request.on('end', function() {
      callback(incoming);
  });
};

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

let getArticles = (request, response) => {
  getArticlesDb().then((data) => response.end(JSON.stringify(data)));
}

let getRating = (request, response) => {
  let id = getSuffix(request.url, '/articles/');
  getRatingDb(id).then((data) => response.end(JSON.stringify(data)));
}

let getRatings = (request, response) => {
  getRatingsDb().then((data) => response.end(JSON.stringify(data)));
}

let deleteUser = (request, response) => {
  let id = getSuffix(request.url, '/users/');
  deleteUserDb(id).then((data) => response.end(JSON.stringify('User Deleted')));
}

let deleteArticle = (request, response) => {
  let id = getSuffix(request.url, '/articles/');
  deleteArticleDb(id).then((data) => response.end(JSON.stringify('Article Deleted')));
}

let deleteRating = (request, response) => {
  let id = getSuffix(request.url, '/rating/');
  deleteRatingDb(id).then((data) => response.end(JSON.stringify('Rating Deleted')));
}

let postUser = function(request, response) {
  readIncoming(request, function(incoming) {
      let user = JSON.parse(incoming);
      createUserDb(user).then((data) => response.end(data + 'Created user!'));      
  });
};

let postRating = function(request, response) {
  readIncoming(request, function(incoming) {
      let rating = JSON.parse(incoming);
      rateArticleDb(rating).then((data) => response.end(data + 'Added rating!'));      
  });
};

//functions to generate token for login
let validateCredentials = (username, password) => 
    db.query(`SELECT username, password, userid from users where
    username = '${username}' and password = '${password}';`);

let createToken = user => {
  console.log(user.userid);
  return jwt.sign({
    userId: user.userid,
  }, signature, { expiresIn: '7d' });
}


let signIn = (request, response) => {
    readIncoming(request, (incoming) => {
    let credentials = JSON.parse(body);
    let {username, password} = credentials;
    var credentialsPromise = validateCredentials(username, password);
    credentialsPromise.then( queryOutcome => {

      if (queryOutcome.length > 0) {
        let token = createToken(queryOutcome[0]);
        console.log(token);
        // response.setHeader('jwt', token);
        response.end(token);
      } else {
        response.end('Username not found');
      }
    }).catch( results => {
      console.log(results);
    });
  });
};

let renderFile = (request, response) => {
  var fileName = request.url.slice(1);
  // console.log(fileName);
  fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
        data = err;
        data = JSON.stringify(data);
    }
    response.end(data);
  })
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
  { method: 'DELETE', path: /^\/users\/([0-9]+)$/, handler: deleteUser },
  { method: 'GET', path: /^\/users\/([0-9]+)$/, handler: getUser },
  // { method: 'PUT', path: /^\/users\/([0-9]+)$/, handler: putUser },
  { method: 'GET', path: /^\/users\/?$/, handler: getUsers },
  { method: 'POST', path: /^\/users\/?$/, handler: postUser },
  { method: 'DELETE', path: /^\/articles\/([0-9]+)$/, handler: deleteArticle },
  { method: 'POST', path: /^\/signin\/?$/, handler: signIn },
  { method: 'GET', path: /^\/articles\/([0-9]+)$/, handler: getArticle },
  // { method: 'PUT', path: /^\/articles\/([0-9]+)$/, handler: putArticle },
  { method: 'GET', path: /^\/articles\/?$/, handler: getArticles },
  // { method: 'POST', path: /^\/articles\/?$/, handler: postArticle },
  { method: 'DELETE', path: /^\/ratings\/([0-9]+)$/, handler: deleteRating},
  { method: 'GET', path: /^\/ratings\/([0-9]+)$/, handler: getRating },
  // { method: 'PUT', path: /^\/ratings\/([0-9]+)$/, handler: putRating },
  { method: 'GET', path: /^\/ratings\/?$/, handler: getRatings },
  { method: 'POST', path: /^\/ratings\/?$/, handler: postRating }
  { method: 'GET', path: /.*/, handler: renderFile}
];

let server = http.createServer(function(request, response) {
      let route = routes.find(route => matches(request, route.method, route.path));

      (route ? route.handler : notFound)(request, response);
});

server.listen(3000);
