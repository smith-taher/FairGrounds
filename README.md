# FairGrounds
News Rating App

<h2>Database setup</h2>

We are using a Postgres database that have three tables set up as follow:

<h3>Users:</h3>
    <p>userid integer NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(20) NOT NULL,
    leaning integer NOT NULL</p>
<h3>Articles:</h3>
    CREATE TABLE public.articles (
    articleid integer NOT NULL,
    topic character varying(1000),
    title character varying(1000) NOT NULL,
    url character varying(1000) NOT NULL,
    author character varying(1000),
    description character varying(1000),
    publishedat character varying(1000),
    source character varying(1000),
    urltoimage character varying(1000)
);
<h3>Ratings:</h3>
    <p>
    ratingid serial,
    userid integer NOT NULL,
    articleid integer NOT NULL,
    written_fairly bit(1) NOT NULL
</p>
    
<h2>Restful API format</h2>
<h3>GET</h3>
<h4>Full tables</h4>
<p>To retrieve JSON of entire database tables, make GET request at location:</p>
<h6>localhost:3000/{insert_table}</h6>
<p>Optional tables are <em>users</em>, <em>articles</em>, and <em>ratings</em> (listed in the database section)</p>
<h5>An example return of GET request to localhost:3000/users :</h5>
<p>[{"username":"rfpoulos","password":"newTestPassword","userid":6,"leaning":80,"email":"rfpoulos@outlook.com"},{"username":"rfpoulos2","password":"test","userid":7,"leaning":75,"email":"rfpoulos2@outlook.com"}]</p>
<h4>Individual entries</h4>
<p>For individual entries in each table, send GET request to:</p>
<h6>localhost:3000/{insert_table}/{insert_id#}</h6>
<p>For example localhost:3000/users/6 will return the entire column of the user with the serial id 6.  Same for articles and ratings.
<h5>An example return of GET request to localhost:3000/users/6 :</h5>
<p>[{"username":"rfpoulos","password":"newTestPassword","userid":6,"leaning":80,"email":"rfpoulos@outlook.com"}]</p>
<h3>POST</h3>
<p>POST requests can be done to each of the three tables in the following format</p>
<h6>localhost:3000/{insert_table}</h6>
<p>The sent object <strong><em>must</em></strong> have all of the NOT NULL values as listed in the datatables section.  Otherwise, the value is optional.</p>
<h5>Examples of acceptable POST user objects</h5>
<p>{"username":"rfpoulos2","password":"test", "leaning":75,"email":"rfpoulos2@outlook.com"}</p>
<p><strong>OR</strong> {"username":"rfpoulos2","password":"test", "email":"rfpoulos2@outlook.com"} because the "leaning" attribute is not required by the PSQL database.</p>
<h3>PUT</h3>
<p>A PUT request for any of the tables can be done to the following address:</p>
<h6>localhost:3000/{insert_table}/{insert_id#}</h6>
<p>The JSON package with it only needs the values that need to be updated.  For example, lets say you want to update the following user object:</p>
<h6>{"username":"rfpoulos","password":"newTestPassword","userid":6,"leaning":80,"email":"rfpoulos@outlook.com"}</h6>
<p>You would send a PUT request to localhost:3000/users/6 with a JSON object that just contained the values you wanted to change.  Lets say just the e-mail and password.  You would send the following object:</p>
<h6>{"email": "new-email@email.com", "password": "betterPassword"}</h6>
<p>Now a GET request to localhost:3000/users/6 would reflect the following:</p>
<h6>{"username":"rfpoulos","password":<strong>"betterPassword"</strong>,"userid":6,"leaning":80,"email":<strong>"rfpoulos@outlook.com"}</strong></h6>
<h3>DELETE</h3>
<p>To delete a column in any database, send a DELETE request to the following location:</p>
<h6>localhost:3000/{insert_table}/{insert_id#}</h6>
