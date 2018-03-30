# FairGrounds
News Rating App

<h2>Database setup</h2>

We are using a Postgres database that have three tables set up as follow:

<h3>Users:</h3>
    <p class="indent">username character varying(200) UNIQUE NOT NULL,<br>
    password character varying(200) UNIQUE NOT NULL,<br>
    userid serial PRIMARY KEY,<br>
    leaning integer,<br>
    email character varying(200) UNIQUE NOT NULL</p>
<h3>Articles:</h3>
    <p>articleid serial PRIMARY KEY,<br>
    topic character varying(200) NOT NULL,<br>
    url character varying(200) NOT NULL,<br>
    author character varying(200),<br>
    description character varying(300),<br>
    publishedat character varying(200),<br>
    source character varying(200),<br>
    urltoimage character varying(300)</p>
<h3>Ratings:</h3>
    <p>ratingid serial PRIMARY KEY,<br>
    userid integer,<br>
    articleid integer,<br>
    fair integer,<br>
    unfair integer,<br>
    newsworthy integer,<br>
    not_newsworthy integer</p>
    
<h2>Restful API format</h2>
<h3>GET</h3>
<h4>Full tables</h4>
<p>To retrieve JSON of entire database tables, make GET request localhost:3000/{insert_table}.  Optional tables are <em>users</em>, <em>articles</em>, and <em>ratings</em>.</p>
<p>An example return of GET request to localhost:3000/users :</p>
<p>[{"username":"rfpoulos","password":"newTestPassword","userid":6,"leaning":80,"email":"rfpoulos@outlook.com"},{"username":"rfpoulos2","password":"test","userid":7,"leaning":75,"email":"rfpoulos2@outlook.com"}]</p>
<h4>Individual entries</h4>
<p>For individual entries in each table, got to localhost:3000/{insert_table}/{insert_id#}.  For example localhost:3000/users/6 will return the entire column of the user with the serial id 6.  Same for articles and ratings.
<p>An example return of GET request to localhost:3000/users/6 :</p>
<p>[{"username":"rfpoulos","password":"newTestPassword","userid":6,"leaning":80,"email":"rfpoulos@outlook.com"}]</p>
<h3>POST</h3>
<p>{"username":"rfpoulos2","password":"test", "leaning":75,"email":"rfpoulos2@outlook.com"}</p>
<h3>PUT</h3>
<h3>DELETE</h3>
