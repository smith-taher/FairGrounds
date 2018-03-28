let db = require('./db.js');
let getNews = require('./newsAPI');


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
