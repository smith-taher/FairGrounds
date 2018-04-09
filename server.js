require('dotenv').config()
const http = require('http');
const pg = require('pg-promise')();
const db = pg(process.env.DB_PATH);
const jwt = require('jsonwebtoken');
const fs = require('fs');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('0873dd38116a4b1d9db9c7f2d99754a7');
const signature = '@!#$%%^&#$!@#^&***()ROBBY';
const bcrypt = require('bcrypt');

//newsapi functions
let getArticlesFromApi = () => {
  newsapi.v2.topHeadlines({
    language: 'en',
    pagesize: 10
  }).then(response => {
      let sqlArticles = makeSqlArray(response.articles);
      sqlArticles.forEach(article => {
        addArticleDb(article)
        .then(data => console.log('Articles added!'))
        .catch(error => {
          console.log('article already exists');
        })
      })
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
  HAVING COUNT(ratings.ratingid) >= 3;
  `);

let articlesToRateDb = () =>
  db.query(`SELECT articles.articleid
  FROM ratings
  RIGHT JOIN articles ON ratings.articleid = articles.articleid
  GROUP BY ratings.articleid, articles.articleid
  HAVING COUNT(ratings.articleid) < 3;
  `);

let articlesUserAlreadyRatedDb = (userid) =>
  db.query(`SELECT ratings.articleid
  FROM ratings
  WHERE ratings.userid = ${userid};`);

let createUserDb = (user) =>
  db.query(`INSERT INTO users
  (${user.inserts})
  VALUES(${user.values});`);


let rateArticleDb = (rating) =>
  db.query(`INSERT INTO ratings
  (written_fairly, topic, userid, articleid)
  VALUES(${rating.written_fairly}, '${rating.topic}', ${rating.userid}, ${rating.articleid});`);

let addArticleDb = (article) =>
  db.query(`INSERT INTO articles
  (${article.inserts})
  VALUES(${article.values});`);

let getUserDb = (id) =>
  db.query(`SELECT * from users where userid IN (${id});`);

let getArticlesDb = (id) =>
  db.query(`Select *
  from articles
  full join
   (SELECT AVG(written_fairly) as conservative_score, ratings.articleid as conserve_id
    FROM ratings
    JOIN articles ON ratings.articleid = articles.articleid
    JOIN users ON ratings.userid = users.userid
    WHERE users.leaning <= 33 AND articles.articleid IN (${id})
    GROUP BY ratings.articleid) conservativeScore
  on conservativeScore.conserve_id = articles.articleid
  full join
   (SELECT AVG(written_fairly) as moderate_score, ratings.articleid as moderate_id
    FROM ratings
    JOIN articles ON ratings.articleid = articles.articleid
    JOIN users ON ratings.userid = users.userid
    WHERE (users.leaning BETWEEN 34 AND 66) AND articles.articleid IN (${id})
    GROUP BY ratings.articleid) moderateScore
  on moderateScore.moderate_id = articles.articleid
  full join
   (SELECT AVG(written_fairly) as liberal_score, ratings.articleid as liberal_id
    FROM ratings
    JOIN articles ON ratings.articleid = articles.articleid
    JOIN users ON ratings.userid = users.userid
    WHERE users.leaning >= 67 AND articles.articleid IN (${id})
    GROUP BY ratings.articleid) liberalScore
  on liberalScore.liberal_id = articles.articleid
  join
   (SELECT AVG(written_fairly) as total_score, ratings.articleid as total_id
    FROM ratings
    JOIN articles ON ratings.articleid = articles.articleid
    JOIN users ON ratings.userid = users.userid
    WHERE articles.articleid IN (${id})
    GROUP BY ratings.articleid) totalScore
  on totalScore.total_id = articles.articleid;


  `);

let getArticlesToRateDb = (id, userid) =>
  db.query(`SELECT * from articles where articleid IN (${id});`);

let getRatingDb = (id) =>
  db.query(`SELECT * from ratings where ratingid IN (${id});`);

let getUsersDb = () =>
  db.query(`SELECT * from users;`);

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
  articlesReadyForDisplay()
  .then(data => {
    let sqlIdString = data.map(element => element.articleid);
    getArticlesDb(sqlIdString)
    .then((data) => {
      response.end(JSON.stringify(data))})
    .catch(error => {console.log(error)});
  })
  .catch(error => {console.log(error)});
}

let getArticlesToRate = (request, response) => {
  checkArticlesStable()
  readIncoming(request, (incoming) => {
    let parseid = JSON.parse(incoming);
    let userid = jwt.verify(parseid.userid, signature);
    articlesUserAlreadyRatedDb(userid.userId)
    .then(userArticles => {
      articlesToRateDb()
      .then(data => {
        let userArticlesArray = userArticles.map(element => element.articleid);
        let allArticles = data.map(element => element.articleid);
        let sqlArticleIds = allArticles.filter(element => {
          userArticlesArray.includes(element);
        });
        getArticlesToRateDb(allArticles)
        .then(finalData => {
          console.log("JSON.stringify(finalData): " + JSON.stringify(finalData));
          response.end(JSON.stringify(finalData));
        })
        .catch(error => console.log(error));
      })
    })
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
    let credentials = JSON.parse(incoming);
    bcrypt.hash(credentials.password, 10)
    .then(hash => Object.assign({}, credentials, {password: hash}))
    .then(hashedCreds => {
      let user = insertsValuesObject(hashedCreds);
      createUserDb(user)
      .then(response => validateCredentials(credentials.username, credentials.password))
      .then(users => createToken(users[0]))
      .then(token => {response.end(token)})
      .catch(error => {console.log(error)});
    });
  });
};

let postRating = (request, response) => {
  readIncoming(request, (incoming) => {
      let rating = JSON.parse(incoming);
      payload = jwt.verify(rating.userid, signature);
      rating.userid = payload.userId;
      rateArticleDb(rating)
        .then((data) => response.end('Added rating!'))
        .catch((error) => response.end(error));
      })
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
let validateCredentials = (username, password) => {
    let userQuery = db.query(`SELECT username, password, userid from users where
    username = '${username}';`)
    .then(users => {
      let user = users[0];
      return bcrypt.compare(password, user.password)
      .then(response => {
        console.log(response);
        if (response) {
          // console.log(user);
          return true;
        } else {
          return false;
        }
      })
      .then(response => {
        if (response) {return users}
        else {return false}
      })
    })
    return userQuery.then(response => response)
}
let createToken = user => {
  console.log(user);
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
        console.log('This should be the token');
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
  let fileName = 'public/' + request.url.slice(1);
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

let getIdFromToken = (token) => {
  let payload;
  console.log(token);
  try {
    payload = jwt.verify(token, signature);
  } catch(err) {
    console.log('No Token');
  }
  return payload;

}
let tokenValidator = (request, response) => {
  let { authorization: token } = request.headers;
  let payload = getIdFromToken(token);
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
  { method: 'GET', path: /^\/articles\/?$/, handler: getArticlesToView },
  { method: 'POST', path: /^\/articlestorate\/?$/, handler: getArticlesToRate },
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
