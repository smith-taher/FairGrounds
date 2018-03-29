const http = require('http');
const db = require('./db.js');
const getNews = require('./newsAPI');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const signature = '@!#$%%^&#$!@#^&***()ROBBY';

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

let validateCredentials = (username, password) => {
  return db.query(`SELECT username, password, userid from users where
    username = '${username}' and password = '${password}';`);
}

let createToken = user => {
  console.log(user.userid);
  return jwt.sign({
    userId: user.userid,
  }, signature, { expiresIn: '7d' });
}

//functions to generate token for login
let signIn = (request, response) => {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk.toString();
  });
  request.on('end', () => {
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
        JSON.stringify(data);
    }
    response.end(data);
  })
}

let matches = function(request, method, path) {
  // console.log(method, path);
  // console.log(request.method, request.url);
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
     { method: 'GET', path: /.*/, handler: renderFile}
];

let server = http.createServer(function(request, response) {
      console.log(request);
      let route = routes.find(route => matches(request, route.method, route.path));
      // console.log(request);
      (route ? route.handler : notFound)(request, response);
});

server.listen(3000);
