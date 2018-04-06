--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.12
-- Dumped by pg_dump version 9.5.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: articles; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.articles (
    topic character varying(1000),
    title character varying(1000) NOT NULL,
    url character varying(1000) NOT NULL,
    author character varying(1000),
    description character varying(1000),
    publishedat character varying(1000),
    source character varying(1000),
    urltoimage character varying(1000),
    articleid integer NOT NULL
);


ALTER TABLE public.articles OWNER TO ubuntu;

--
-- Name: articles_articleid_seq; Type: SEQUENCE; Schema: public; Owner: ubuntu
--

CREATE SEQUENCE public.articles_articleid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_articleid_seq OWNER TO ubuntu;

--
-- Name: articles_articleid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ubuntu
--

ALTER SEQUENCE public.articles_articleid_seq OWNED BY public.articles.articleid;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.ratings (
    ratingid integer NOT NULL,
    userid integer NOT NULL,
    articleid integer NOT NULL,
    written_fairly integer NOT NULL,
    topic character varying(20)
);


ALTER TABLE public.ratings OWNER TO ubuntu;

--
-- Name: ratings_ratingid_seq; Type: SEQUENCE; Schema: public; Owner: ubuntu
--

CREATE SEQUENCE public.ratings_ratingid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratings_ratingid_seq OWNER TO ubuntu;

--
-- Name: ratings_ratingid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ubuntu
--

ALTER SEQUENCE public.ratings_ratingid_seq OWNED BY public.ratings.ratingid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.users (
    username character varying(20) NOT NULL,
    password character varying(1000) NOT NULL,
    leaning integer NOT NULL,
    email character varying(200),
    userid integer NOT NULL
);


ALTER TABLE public.users OWNER TO ubuntu;

--
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: ubuntu
--

CREATE SEQUENCE public.users_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO ubuntu;

--
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ubuntu
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- Name: articleid; Type: DEFAULT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.articles ALTER COLUMN articleid SET DEFAULT nextval('public.articles_articleid_seq'::regclass);


--
-- Name: ratingid; Type: DEFAULT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.ratings ALTER COLUMN ratingid SET DEFAULT nextval('public.ratings_ratingid_seq'::regclass);


--
-- Name: userid; Type: DEFAULT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: ubuntu
--

COPY public.articles (topic, title, url, author, description, publishedat, source, urltoimage, articleid) FROM stdin;
\N	American states face a revenue crisis	http://www.economist.com/news/united-states/21739998-america-booming-yet-states-face-revenue-crisis-american-states-face-revenue-crisis	The Economist	America is booming, yet states face a revenue crisis	2018-04-07T00:00:00Z	The Economist	https://cdn.static-economist.com/sites/default/files/images/2018/04/articles/main/20180407_USP004.jpg	1
\N	Scam Alert: ElectrumPro is not an upgrade to Electrum	https://thenextweb.com/hardfork/2018/04/06/1117443/	Neer Varshney	If you are starting a new brand, remember to buy all the domains associated with that name. Electrum is learning this the hard way. Electrum, a popular bitcoin wallet service, uses electrum.org as its primary web address. “An alleged scammer has since bought …	2018-04-06T18:30:05Z	The Next Web	https://img-cdn.tnwcdn.com/image/hardfork?filter_last=1&fit=1280%2C640&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2018%2F04%2Fscam-alert.png&expires=17291032315&signature=886bc0ba2393957d86fc236430b46dde	2
\N	Fox News	http://www.foxnews.com/	Fox News	Most Watched. Most Trusted.	2018-04-06T16:53:03.9837195Z	Fox News	http://global.fncstatic.com/static/orion/styles/img/fox-news/og/og-fox-news.png	3
\N	Famous Japanese Snow Monkeys Take Baths to Lower Stress	https://news.nationalgeographic.com/2018/04/japanese-snow-monkey-macaques-bath-stress-spd.html	Sarah Gibbens	Just like us, snow monkeys may cope with winter weather by taking warm baths, a new study found.	2018-04-06T16:52:23.4017108Z	National Geographic	https://news.nationalgeographic.com/content/dam/news/2018/04/04/snow-monkeys/01-snow-monekys-NationalGeographic_1341881.jpg	4
\N	Plan the Perfect Weekend in Nashville	https://www.nationalgeographic.com/travel/destinations/north-america/united-states/tennessee/nashville/things-to-do-weekend-getaway.html	Kelly Barrett	This versatile city offers much more than bar-hopping and country music.	2018-04-06T16:52:22.2526037Z	National Geographic	https://www.nationalgeographic.com/content/dam/travel/2017-digital/nashville-getaways/nashville-Centennial-Park.jpg	5
\N	Exclusive: Massive Ancient Drawings Found in Peruvian Desert	https://news.nationalgeographic.com/2018/04/new-nasca-nazca-lines-discovery-peru-archaeology.html	Michael Greshko	Armed with satellites and drones, archaeologists discover new Nasca lines and dozens of other enigmatic geoglyphs carved into the earth.	2018-04-06T16:52:22.6339707Z	National Geographic	https://pmdvod.nationalgeographic.com/NG_Video/748/18/smpost_1522944446817.jpg	6
\N	“120 BPM” is a passionate tribute to gay activism	http://www.economist.com/blogs/prospero/2018/04/lgbt-history	The Economist	Recreating the protests of AIDS campaigners in the 1990s, the film holds lessons for social reformers today	2018-04-06T17:31:06Z	The Economist	https://cdn.static-economist.com/sites/default/files/20180407_BLP507.jpg	9
\N	Rep. Trey Gowdy gives fascinating Vice News interview	http://www.msnbc.com/morning-joe/watch/rep-trey-gowdy-gives-fascinating-vice-news-interview-1204367939880	MSNBC	Rep. Trey Gowdy of South Carolina gave an interview with Vice News wherein he discussed his congressional record and the difficulty of getting things done in Washington. Gowdy is set to retire from Congress this year.	2018-04-06T17:08:49.4493866Z	MSNBC	https://media1.s-nbcnews.com/j/MSNBC/Components/Video/201804/n_mj_trey_180406_1920x1080.1200;630;7;70;5.jpg	22
\N	Pentagon establishing border security cell to support to DHS	http://video.foxnews.com/v/5765669556001/	Fox News	The new planning cell will be manned 24/7 to liaise and support both Homeland Security and the Border Patrol; national security correspondent Jennifer Griffin reports from the Pentagon.	2018-04-06T17:08:21.7757878Z	Fox News	http://a57.foxnews.com/media2.foxnews.com/BrightCove/694940094001/2018/04/06/640/360/694940094001_5765681178001_5765669556001-vs.jpg	23
\N	China denies talks to avert trade war are underway	https://www.ft.com/content/623ce760-39a5-11e8-8b98-2f31af407cc8	null	White House adviser forced to admit negotiations have not begun	2018-04-06T17:08:22.9789455Z	Financial Times	https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fprod-upp-image-read.ft.com%2F933a0538-38d7-11e8-b161-65936015ebc3?source=next-opengraph&fit=scale-down&width=900	24
\N	Facebook’s Sandberg to hold EU data talks	https://www.ft.com/content/88a8682a-3996-11e8-8b98-2f31af407cc8	null	null	2018-04-06T17:08:26.8606767Z	Financial Times	https://www.ft.com/__assets/creatives/brand-ft/icons/v3/open-graph.png	25
\.


--
-- Name: articles_articleid_seq; Type: SEQUENCE SET; Schema: public; Owner: ubuntu
--

SELECT pg_catalog.setval('public.articles_articleid_seq', 25, true);


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: ubuntu
--

COPY public.ratings (ratingid, userid, articleid, written_fairly, topic) FROM stdin;
1	2	1	1	Science
2	2	2	0	Science
3	2	3	1	Science
4	2	4	0	Science
5	3	1	0	Science
6	3	2	0	Science
7	3	3	0	Science
8	3	4	0	Science
9	4	1	0	Science
10	4	2	1	Science
11	4	3	1	Science
12	4	1	0	Science
13	4	1	0	Science
14	4	2	1	Science
15	4	3	0	Science
16	2	2	1	Science
17	2	3	0	Science
18	2	4	1	Science
19	5	4	1	Science
20	2	2	1	Science
21	2	2	1	Science
22	2	2	0	Science
23	2	2	0	Science
\.


--
-- Name: ratings_ratingid_seq; Type: SEQUENCE SET; Schema: public; Owner: ubuntu
--

SELECT pg_catalog.setval('public.ratings_ratingid_seq', 23, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ubuntu
--

COPY public.users (username, password, leaning, email, userid) FROM stdin;
rpoulos	$2a$10$RFHYmEDUqs0WLIogYuwFkO8L9D2RnSSinXqo1LZOk6d6WTEEVd3rq	50	rfpoulos@outlook.com	1
rfpoulos	$2a$10$gxSZTDwsV62j8RS9Maj4QeGJKJRse5BXfnwwBDmh5NV0pzQAIPtEm	50	rfpoulos@outlook.com	2
conservative	$2a$10$LUmwY/XZ8JKnWqHn3LeL0O3JTB2sHw2YB2pSkPFagze5F4WbZ5rD2	1	email@email.com	3
liberal	$2a$10$tk6Djv2nR/qXsQk43XkEIu6RcM78AUhsFyfI7/pNypXXxedgRx6ee	100	email2@email.com	4
smith	$2a$10$araTV/O4GlP2MmaNvdwpoOoriFVCBsTDGPfqiKsTfLEkq0N1uf5hW	50	smith@smith.com	5
\.


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: ubuntu
--

SELECT pg_catalog.setval('public.users_userid_seq', 5, true);


--
-- Name: articles_url_key; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_url_key UNIQUE (url);


--
-- Name: users_username_key; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

