require('dotenv').config()
const http = require('http');
const pg = require('pg-promise')();
const db = pg(process.env.DB_PATH);
const jwt = require('jsonwebtoken');
const fs = require('fs');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('0873dd38116a4b1d9db9c7f2d99754a7');
const signature = '@!#$%%^&#$!@#^&***()ROBBY';

//newsapi functions
let getArticlesFromApi = () => {
  newsapi.v2.topHeadlines({
    language: 'en',
    pagesize: 100
  }).then(response => {
      let sqlArticles = makeSqlArray(response.articles);
      sqlArticles.forEach(article =>
        addArticleDb(article)
        .then(data => console.log('Article added!'))
        .catch(error => {
          console.log('article already exists');
        })
      )
  }).catch(error => console.log(error));
}
let makeSqlArray = articlesArray => {
  let articlesSqlArray = [];
  articlesArray.forEach(article => {
    article.source = article.source.name;
    let articleSql = insertsValuesObject(article);
    articlesSqlArray.push(articleSql);
  })
  return articlesSqlArray;
}

let checkArticlesStable = () => {
  checkNeedsRatings().then(data => {
    if (data.length <= 3) {
      getArticlesFromApi();
    }
  })
}

//functions to talk to DB
let checkNeedsRatings = () =>
  db.query(`SELECT COUNT(ratings.ratingid) as rating_count
  FROM articles
  LEFT JOIN ratings ON articles.articleid = ratings.articleid
  GROUP BY articles.articleid
  HAVING COUNT(ratings.ratingid) < 3;`);
    
let articlesReadyForDisplay = () =>
db.query(`SELECT articles.articleid
FROM articles
LEFT JOIN ratings ON articles.articleid = ratings.articleid
GROUP BY articles.articleid
HAVING COUNT(ratings.ratingid) > 3;
`);

let articlesToRate = () =>
db.query(`SELECT articles.articleid
FROM articles
LEFT JOIN ratings ON articles.articleid = ratings.articleid
GROUP BY articles.articleid
HAVING COUNT(ratings.ratingid) < 3;
`);


let createUserDb = (user) =>
    db.query(`INSERT INTO users
    (${user.inserts})
    VALUES(${user.values});`);

let rateArticleDb = (rating) =>
  db.query(`INSERT INTO ratings
  (${rating.inserts})
  VALUES(${rating.value}, 1);`);

let addArticleDb = (article) =>
  db.query(`INSERT INTO articles
  (${article.inserts})
  VALUES(${article.values});`);

let getUserDb = (id) =>
  db.query(`SELECT * from users where userid IN (${id});`);

let getArticleDb = (id) =>
  db.query(`SELECT * from articles where articleid IN (${id});`);

let getRatingDb = (id) =>
  db.query(`SELECT * from ratings where ratingid IN (${id});`);

let getUsersDb = () =>
  db.query(`SELECT * from users;`);

let getArticlesDb = () =>
  db.query(`SELECT * from articles;`);

let getRatingsDb = () =>
  db.query(`SELECT * from ratings;`);

let deleteUserDb = (id) =>
  db.query(`DELETE FROM users WHERE userid = ${id};`);

let deleteArticleDb = (id) =>
  db.query(`DELETE FROM articles WHERE articleid = ${id};`);

let deleteRatingDb = (id) =>
  db.query(`DELETE FROM ratings WHERE ratingid = ${id};`);

let editUserDb = (id, updateString) =>
  db.query(`UPDATE users
  SET ${updateString}
  WHERE userid = ${id};`);

let editArticleDb = (id, updateString) =>
  db.query(`UPDATE articles
  SET ${updateString}
  WHERE articleid = ${id};`);

let editRatingDb = (id, updateString) =>
  db.query(`UPDATE ratings
  SET ${updateString}
  WHERE ratingid = ${id};`);

//helper functions

let getSuffix = (fullUrl, prefix) =>
    fullUrl.slice(prefix.length);

let readIncoming = (request, callback) => {
  let incoming = '';
  request.on('data', (chunk) => {
      incoming += chunk.toString();
  });
  request.on('end', () => {
      callback(incoming);
  });
};

let updateString = (object) => {
  let newString = '';
  Object.keys(object).map((key) => {
    newString += key + '=' + "'" + object[key] + "'" + ', ';
 });
 return newString.slice(0, newString.length - 2);
}

let insertsValuesObject = (object) => {
  let newInserts = '';
  let newValues = '';
  Object.keys(object).map((key) => {
    newInserts += key + ', ';
    newValues += "'" + object[key] + "'" + ', ';
 });
 return {inserts: newInserts.slice(0, newInserts.length - 2),
          values: newValues.slice(0, newValues.length - 2)};
}

//handlers

let getUser = (request, response) => {
  let id = getSuffix(request.url, '/users/');
  getUserDb(id)
    .then((data) => response.end(JSON.stringify(data)))
    .catch(error => {console.log(error)});
}

let getUsers = (request, response) => {
  getUsersDb()
    .then((data) => response.end(JSON.stringify(data)))
    .catch(error => {console.log(error)});
}

let getArticle = (request, response) => {
  let id = getSuffix(request.url, '/articles/');
  getArticleDb(id)
    .then((data) => response.end(JSON.stringify(data)))
    .catch(error => {console.log(error)});
}

let getArticlesToView = (request, response) => {
  articlesReadyForDisplay().then(data => {
    let sqlIdString = data.map(element => element.articleid);
    getArticleDb(sqlIdString)
    .then((data) => response.end(JSON.stringify(data)))
    .catch(error => {console.log(error)});
  })
}

let getArticlesToRate = (request, response) => {
  checkArticlesStable();
  console.log(request);
  articlesToRate().then(data => {
    let sqlIdString = data.map(element => element.articleid);
    getArticleDb(sqlIdString)
    .then((data) => response.end(JSON.stringify(data)))
    .catch(error => {console.log(error)});
  })
}

let getRating = (request, response) => {
  let id = getSuffix(request.url, '/articles/');
  getRatingDb(id)
    .then((data) => response.end(JSON.stringify(data)))
    .catch(error => {console.log(error)});
}

let getRatings = (request, response) => {
  getRatingsDb()
    .then((data) => response.end(JSON.stringify(data)))
    .catch(error => {console.log(error)});;
}

let deleteUser = (request, response) => {
  let id = getSuffix(request.url, '/users/');
  deleteUserDb(id)
    .then((data) => response.end(JSON.stringify('User Deleted')))
    .catch(error => {console.log(error)});;
}

let deleteArticle = (request, response) => {
  let id = getSuffix(request.url, '/articles/');
  deleteArticleDb(id)
    .then((data) => response.end(JSON.stringify('Article Deleted')))
    .catch(error => {console.log(error)});;
}

let deleteRating = (request, response) => {
  let id = getSuffix(request.url, '/rating/');
  deleteRatingDb(id)
    .then((data) => response.end(JSON.stringify('Rating Deleted')))
    .catch(error => {console.log(error)});;
}

let postUser = (request, response) => {
  readIncoming(request, (incoming) => {
      let user = insertsValuesObject(JSON.parse(incoming));
      console.log(user);
      createUserDb(user)
        .then(response => validateCredentials(user.username, user.password))
        .then(user => createToken(user))
        .then(token => {response.end(token)})
        .catch(error => {console.log(error)});;
  });
};

let postRating = (request, response) => {
  readIncoming(request, (incoming) => {
      let rating = insertsValuesObject(JSON.parse(incoming));
      rateArticleDb(rating)
        .then((data) => response.end('Added rating!'))
        .catch(error => {console.log(error)});;
  });
};

let postArticle = (request, response) => {
  readIncoming(request, (incoming) => {
      let article = insertsValuesObject(JSON.parse(incoming));
      console.log(article);
      addArticleDb(article)
        .then((data) => response.end('Added article!'))
        .catch(error => {console.log(error)});;
  });
};

let editUser = (request, response) => {
  readIncoming(request, (incoming) => {
    let id = getSuffix(request.url, '/users/');
    let update = JSON.parse(incoming);
    let setInfo = updateString(update);
    editUserDb(id, setInfo)
      .then((data) => response.end('Updated user!'))
      .catch(error => {console.log(error)});
  })
}

let editArticle = (request, response) => {
  readIncoming(request, (incoming) => {
    let id = getSuffix(request.url, '/articles/');
    let update = JSON.parse(incoming);
    let setInfo = updateString(update);
    editArticleDb(id, setInfo)
      .then((data) => response.end('Updated article!'))
      .catch(error => {console.log(error)});;
  })
}

let editRating = (request, response) => {
  readIncoming(request, (incoming) => {
    let id = getSuffix(request.url, '/ratings/');
    let update = JSON.parse(incoming);
    let setInfo = updateString(update);
    editRatingDb(id, setInfo)
      .then((data) => response.end('Updated rating!'))
      .catch(error => {console.log(error)});;
  })
}

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
    let credentials = JSON.parse(incoming);
    let {username, password} = credentials;
    console.log(username, password);
    validateCredentials(username, password)
    .then( queryOutcome => {
      if (queryOutcome.length > 0) {
        let token = createToken(queryOutcome[0]);
        console.log(token);
        // response.setHeader('jwt', token);
        response.statusCode = 200;
        response.end(token);
      } else {
        response.statusCode = 404;
        response.end('Username not found');
      }
    }).catch( results => {
      console.log(results);
    });
  });
};

let renderFile = (request, response) => {
  // let token = request.getHeader('authorization');
  var fileName = 'public/' + request.url.slice(1);
  // console.log(fileName);
  if (fileName.endsWith('.png')) {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        data = err;
        data = JSON.stringify(data);
      }
      response.end(data);
    })
  } else {
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
          data = err;
          data = JSON.stringify(data);
        }
        response.end(data);
    })
  }
}

let tokenValidator = (request, response) => {
  let { authorization: token } = request.headers;
  let payload;
  try {
    payload = jwt.verify(token, signature);
  } catch(err) {
    console.log('No Token');
  }
  if (payload) {
    let { userId } = payload;
    response.end('You are signed in');
  } else {
    response.statusCode = 404;
    response.end('You do not have a valid token');
  }
}

//Routes and server

let matches = (request, method, path) =>
  request.method === method && path.exec(request.url);

let notFound = (request, response) => {
  response.statusCode = 404;
  response.end('404, nothing here!');
};

let routes = [
  { method: 'DELETE', path: /^\/users\/([0-9]+)$/, handler: deleteUser },
  { method: 'GET', path: /^\/users\/([0-9]+)$/, handler: getUser },
  { method: 'PUT', path: /^\/users\/([0-9]+)$/, handler: editUser },
  { method: 'GET', path: /^\/users\/?$/, handler: getUsers },
  { method: 'POST', path: /^\/users\/?$/, handler: postUser },
  { method: 'DELETE', path: /^\/articles\/([0-9]+)$/, handler: deleteArticle },
  { method: 'POST', path: /^\/signin\/?$/, handler: signIn },
  { method: 'GET', path: /^\/articles\/([0-9]+)$/, handler: getArticle },
  { method: 'PUT', path: /^\/articles\/([0-9]+)$/, handler: editArticle },
  { method: 'GET', path: /^\/articles\/?$/, handler: getArticlesToView },
  { method: 'GET', path: /^\/articlestorate\/?$/, handler: getArticlesToRate },
  { method: 'POST', path: /^\/articles\/?$/, handler: postArticle },
  { method: 'DELETE', path: /^\/ratings\/([0-9]+)$/, handler: deleteRating},
  { method: 'GET', path: /^\/ratings\/([0-9]+)$/, handler: getRating },
  { method: 'PUT', path: /^\/ratings\/([0-9]+)$/, handler: editRating },
  { method: 'GET', path: /^\/ratings\/?$/, handler: getRatings },
  { method: 'POST', path: /^\/ratings\/?$/, handler: postRating },
  { method: 'GET', path: /^\/token\/?$/, handler: tokenValidator },
  { method: 'GET', path: /.*/, handler: renderFile}
];

let server = http.createServer(function(request, response) {
      let route = routes.find(route => matches(request, route.method, route.path));

      (route ? route.handler : notFound)(request, response);
});

server.listen(3000);
