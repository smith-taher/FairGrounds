--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3
-- Dumped by pg_dump version 10.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: articles; Type: TABLE; Schema: public; Owner: rachelpoulos
--

CREATE TABLE public.articles (
    articleid integer NOT NULL,
    topic character varying(500),
    url character varying(500) NOT NULL,
    author character varying(500),
    description character varying(500),
    publishedat character varying(500),
    urltoimage character varying(500),
    source character varying(500),
    title character varying(500)
);


ALTER TABLE public.articles OWNER TO rachelpoulos;

--
-- Name: articles_articleid_seq; Type: SEQUENCE; Schema: public; Owner: rachelpoulos
--

CREATE SEQUENCE public.articles_articleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_articleid_seq OWNER TO rachelpoulos;

--
-- Name: articles_articleid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rachelpoulos
--

ALTER SEQUENCE public.articles_articleid_seq OWNED BY public.articles.articleid;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: rachelpoulos
--

CREATE TABLE public.ratings (
    ratingid integer NOT NULL,
    userid integer,
    articleid integer,
    fair integer,
    unfair integer,
    newsworthy integer,
    not_newsworthy integer
);


ALTER TABLE public.ratings OWNER TO rachelpoulos;

--
-- Name: ratings_ratingid_seq; Type: SEQUENCE; Schema: public; Owner: rachelpoulos
--

CREATE SEQUENCE public.ratings_ratingid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratings_ratingid_seq OWNER TO rachelpoulos;

--
-- Name: ratings_ratingid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rachelpoulos
--

ALTER SEQUENCE public.ratings_ratingid_seq OWNED BY public.ratings.ratingid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: rachelpoulos
--

CREATE TABLE public.users (
    username character varying(200) NOT NULL,
    password character varying(200) NOT NULL,
    userid integer NOT NULL,
    leaning integer,
    email character varying(200) NOT NULL
);


ALTER TABLE public.users OWNER TO rachelpoulos;

--
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: rachelpoulos
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO rachelpoulos;

--
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rachelpoulos
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- Name: articles articleid; Type: DEFAULT; Schema: public; Owner: rachelpoulos
--

ALTER TABLE ONLY public.articles ALTER COLUMN articleid SET DEFAULT nextval('public.articles_articleid_seq'::regclass);


--
-- Name: ratings ratingid; Type: DEFAULT; Schema: public; Owner: rachelpoulos
--

ALTER TABLE ONLY public.ratings ALTER COLUMN ratingid SET DEFAULT nextval('public.ratings_ratingid_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: rachelpoulos
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: rachelpoulos
--

COPY public.articles (articleid, topic, url, author, description, publishedat, urltoimage, source, title) FROM stdin;
1	\N	https://www.ccn.com/april-fools-vitalik-buterin-pranks-ethereum-trolls-tron-with-meta-eip/	null	Ethereum creator Vitalik Buterin has formally proposed implementing a currency cap into the cryptocurrency network’s next hard fork that alters block reward distributions -- well, sort of.	2018-04-02T14:24:14Z	https://www.ccn.com/wp-content/uploads/2018/04/Vitalik-Buterin-e1522675308283.jpg	Crypto Coins News	April Fool’s: Vitalik Buterin Pranks Ethereum, Trolls Tron with ‘Meta’ EIP
2	\N	https://www.ccn.com/april-fools-vitalik-buterin-pranks-ethereum-trolls-tron-with-meta-eip/	null	Ethereum creator Vitalik Buterin has formally proposed implementing a currency cap into the cryptocurrency network’s next hard fork that alters block reward distributions -- well, sort of.	2018-04-02T14:24:14Z	https://www.ccn.com/wp-content/uploads/2018/04/Vitalik-Buterin-e1522675308283.jpg	Crypto Coins News	April Fool’s: Vitalik Buterin Pranks Ethereum, Trolls Tron with ‘Meta’ EIP
3	\N	https://www.ccn.com/april-fools-vitalik-buterin-pranks-ethereum-trolls-tron-with-meta-eip/	null	Ethereum creator Vitalik Buterin has formally proposed implementing a currency cap into the cryptocurrency network’s next hard fork that alters block reward distributions -- well, sort of.	2018-04-02T14:24:14Z	https://www.ccn.com/wp-content/uploads/2018/04/Vitalik-Buterin-e1522675308283.jpg	Crypto Coins News	April Fool’s: Vitalik Buterin Pranks Ethereum, Trolls Tron with ‘Meta’ EIP
4	\N	https://www.ccn.com/april-fools-vitalik-buterin-pranks-ethereum-trolls-tron-with-meta-eip/	null	Ethereum creator Vitalik Buterin has formally proposed implementing a currency cap into the cryptocurrency network’s next hard fork that alters block reward distributions -- well, sort of.	2018-04-02T14:24:14Z	https://www.ccn.com/wp-content/uploads/2018/04/Vitalik-Buterin-e1522675308283.jpg	Crypto Coins News	April Fool’s: Vitalik Buterin Pranks Ethereum, Trolls Tron with ‘Meta’ EIP
5	\N	https://www.ccn.com/april-fools-vitalik-buterin-pranks-ethereum-trolls-tron-with-meta-eip/	null	Ethereum creator Vitalik Buterin has formally proposed implementing a currency cap into the cryptocurrency network’s next hard fork that alters block reward distributions -- well, sort of.	2018-04-02T14:24:14Z	https://www.ccn.com/wp-content/uploads/2018/04/Vitalik-Buterin-e1522675308283.jpg	Crypto Coins News	April Fool’s: Vitalik Buterin Pranks Ethereum, Trolls Tron with ‘Meta’ EIP
6	\N	https://www.ccn.com/april-fools-vitalik-buterin-pranks-ethereum-trolls-tron-with-meta-eip/	null	Ethereum creator Vitalik Buterin has formally proposed implementing a currency cap into the cryptocurrency network’s next hard fork that alters block reward distributions -- well, sort of.	2018-04-02T14:24:14Z	https://www.ccn.com/wp-content/uploads/2018/04/Vitalik-Buterin-e1522675308283.jpg	Crypto Coins News	April Fool’s: Vitalik Buterin Pranks Ethereum, Trolls Tron with ‘Meta’ EIP
7	\N	https://www.ccn.com/april-fools-vitalik-buterin-pranks-ethereum-trolls-tron-with-meta-eip/	null	Ethereum creator Vitalik Buterin has formally proposed implementing a currency cap into the cryptocurrency network’s next hard fork that alters block reward distributions -- well, sort of.	2018-04-02T14:24:14Z	https://www.ccn.com/wp-content/uploads/2018/04/Vitalik-Buterin-e1522675308283.jpg	Crypto Coins News	April Fool’s: Vitalik Buterin Pranks Ethereum, Trolls Tron with ‘Meta’ EIP
8	\N	https://www.ccn.com/april-fools-vitalik-buterin-pranks-ethereum-trolls-tron-with-meta-eip/	null	Ethereum creator Vitalik Buterin has formally proposed implementing a currency cap into the cryptocurrency network’s next hard fork that alters block reward distributions -- well, sort of.	2018-04-02T14:24:14Z	https://www.ccn.com/wp-content/uploads/2018/04/Vitalik-Buterin-e1522675308283.jpg	Crypto Coins News	April Fool’s: Vitalik Buterin Pranks Ethereum, Trolls Tron with ‘Meta’ EIP
9	\N	https://www.ccn.com/april-fools-vitalik-buterin-pranks-ethereum-trolls-tron-with-meta-eip/	null	Ethereum creator Vitalik Buterin has formally proposed implementing a currency cap into the cryptocurrency network’s next hard fork that alters block reward distributions -- well, sort of.	2018-04-02T14:24:14Z	https://www.ccn.com/wp-content/uploads/2018/04/Vitalik-Buterin-e1522675308283.jpg	Crypto Coins News	April Fool’s: Vitalik Buterin Pranks Ethereum, Trolls Tron with ‘Meta’ EIP
10	\N	https://www.ccn.com/april-fools-vitalik-buterin-pranks-ethereum-trolls-tron-with-meta-eip/	null	Ethereum creator Vitalik Buterin has formally proposed implementing a currency cap into the cryptocurrency network’s next hard fork that alters block reward distributions -- well, sort of.	2018-04-02T14:24:14Z	https://www.ccn.com/wp-content/uploads/2018/04/Vitalik-Buterin-e1522675308283.jpg	Crypto Coins News	April Fool’s: Vitalik Buterin Pranks Ethereum, Trolls Tron with ‘Meta’ EIP
11	\N	https://www.ccn.com/april-fools-vitalik-buterin-pranks-ethereum-trolls-tron-with-meta-eip/	null	Ethereum creator Vitalik Buterin has formally proposed implementing a currency cap into the cryptocurrency network’s next hard fork that alters block reward distributions -- well, sort of.	2018-04-02T14:24:14Z	https://www.ccn.com/wp-content/uploads/2018/04/Vitalik-Buterin-e1522675308283.jpg	Crypto Coins News	April Fool’s: Vitalik Buterin Pranks Ethereum, Trolls Tron with ‘Meta’ EIP
12	\N	https://www.ccn.com/april-fools-vitalik-buterin-pranks-ethereum-trolls-tron-with-meta-eip/	null	Ethereum creator Vitalik Buterin has formally proposed implementing a currency cap into the cryptocurrency network’s next hard fork that alters block reward distributions -- well, sort of.	2018-04-02T14:24:14Z	https://www.ccn.com/wp-content/uploads/2018/04/Vitalik-Buterin-e1522675308283.jpg	Crypto Coins News	April Fool’s: Vitalik Buterin Pranks Ethereum, Trolls Tron with ‘Meta’ EIP
13	\N	http://www.telegraph.co.uk/news/2018/04/02/anti-apartheid-campaigner-winnie-mandela-dies/	Our Foreign Staff	Winnie Mandela, the South African anti-apartheid campaigner and former wife of Nelson Mandela, has died aged 81, according to her assistant.	2018-04-02T15:03:34Z	https://www.telegraph.co.uk/content/dam/news/2018/04/02/5926821_AP_South-Africa-Nelson-Mandela-Release-xlarge_trans_NvBQzQNjv4BqTw4-AaCxUhcMgOYbK39rJVF2ZHR0HBTdDSG7qZU5Rbw.jpg	The Telegraph	Anti-apartheid campaigner Winnie Mandela dies
14	\N	http://www.telegraph.co.uk/news/2018/04/02/anti-apartheid-campaigner-winnie-mandela-dies/	Our Foreign Staff	Winnie Mandela, the South African anti-apartheid campaigner and former wife of Nelson Mandela, has died aged 81, according to her assistant.	2018-04-02T15:03:34Z	https://www.telegraph.co.uk/content/dam/news/2018/04/02/5926821_AP_South-Africa-Nelson-Mandela-Release-xlarge_trans_NvBQzQNjv4BqTw4-AaCxUhcMgOYbK39rJVF2ZHR0HBTdDSG7qZU5Rbw.jpg	The Telegraph	Anti-apartheid campaigner Winnie Mandela dies
15	\N	http://www.telegraph.co.uk/news/2018/04/02/anti-apartheid-campaigner-winnie-mandela-dies/	Our Foreign Staff	Winnie Mandela, the South African anti-apartheid campaigner and former wife of Nelson Mandela, has died aged 81, according to her assistant.	2018-04-02T15:03:34Z	https://www.telegraph.co.uk/content/dam/news/2018/04/02/5926821_AP_South-Africa-Nelson-Mandela-Release-xlarge_trans_NvBQzQNjv4BqTw4-AaCxUhcMgOYbK39rJVF2ZHR0HBTdDSG7qZU5Rbw.jpg	The Telegraph	Anti-apartheid campaigner Winnie Mandela dies
16	\N	http://www.telegraph.co.uk/news/2018/04/02/anti-apartheid-campaigner-winnie-mandela-dies/	Our Foreign Staff	Winnie Mandela, the South African anti-apartheid campaigner and former wife of Nelson Mandela, has died aged 81, according to her assistant.	2018-04-02T15:03:34Z	https://www.telegraph.co.uk/content/dam/news/2018/04/02/5926821_AP_South-Africa-Nelson-Mandela-Release-xlarge_trans_NvBQzQNjv4BqTw4-AaCxUhcMgOYbK39rJVF2ZHR0HBTdDSG7qZU5Rbw.jpg	The Telegraph	Anti-apartheid campaigner Winnie Mandela dies
17	\N	http://www.telegraph.co.uk/news/2018/04/02/anti-apartheid-campaigner-winnie-mandela-dies/	Our Foreign Staff	Winnie Mandela, the South African anti-apartheid campaigner and former wife of Nelson Mandela, has died aged 81, according to her assistant.	2018-04-02T15:03:34Z	https://www.telegraph.co.uk/content/dam/news/2018/04/02/5926821_AP_South-Africa-Nelson-Mandela-Release-xlarge_trans_NvBQzQNjv4BqTw4-AaCxUhcMgOYbK39rJVF2ZHR0HBTdDSG7qZU5Rbw.jpg	The Telegraph	Anti-apartheid campaigner Winnie Mandela dies
18	\N	http://www.telegraph.co.uk/news/2018/04/02/anti-apartheid-campaigner-winnie-mandela-dies/	Our Foreign Staff	Winnie Mandela, the South African anti-apartheid campaigner and former wife of Nelson Mandela, has died aged 81, according to her assistant.	2018-04-02T15:03:34Z	https://www.telegraph.co.uk/content/dam/news/2018/04/02/5926821_AP_South-Africa-Nelson-Mandela-Release-xlarge_trans_NvBQzQNjv4BqTw4-AaCxUhcMgOYbK39rJVF2ZHR0HBTdDSG7qZU5Rbw.jpg	The Telegraph	Anti-apartheid campaigner Winnie Mandela dies
19	\N	http://www.telegraph.co.uk/news/2018/04/02/anti-apartheid-campaigner-winnie-mandela-dies/	Our Foreign Staff	Winnie Mandela, the South African anti-apartheid campaigner and former wife of Nelson Mandela, has died aged 81, according to her assistant.	2018-04-02T15:03:34Z	https://www.telegraph.co.uk/content/dam/news/2018/04/02/5926821_AP_South-Africa-Nelson-Mandela-Release-xlarge_trans_NvBQzQNjv4BqTw4-AaCxUhcMgOYbK39rJVF2ZHR0HBTdDSG7qZU5Rbw.jpg	The Telegraph	Anti-apartheid campaigner Winnie Mandela dies
20	\N	http://www.telegraph.co.uk/news/2018/04/02/anti-apartheid-campaigner-winnie-mandela-dies/	Our Foreign Staff	Winnie Mandela, the South African anti-apartheid campaigner and former wife of Nelson Mandela, has died aged 81, according to her assistant.	2018-04-02T15:03:34Z	https://www.telegraph.co.uk/content/dam/news/2018/04/02/5926821_AP_South-Africa-Nelson-Mandela-Release-xlarge_trans_NvBQzQNjv4BqTw4-AaCxUhcMgOYbK39rJVF2ZHR0HBTdDSG7qZU5Rbw.jpg	The Telegraph	Anti-apartheid campaigner Winnie Mandela dies
21	\N	http://www.telegraph.co.uk/news/2018/04/02/anti-apartheid-campaigner-winnie-mandela-dies/	Our Foreign Staff	Winnie Mandela, the South African anti-apartheid campaigner and former wife of Nelson Mandela, has died aged 81, according to her assistant.	2018-04-02T15:03:34Z	https://www.telegraph.co.uk/content/dam/news/2018/04/02/5926821_AP_South-Africa-Nelson-Mandela-Release-xlarge_trans_NvBQzQNjv4BqTw4-AaCxUhcMgOYbK39rJVF2ZHR0HBTdDSG7qZU5Rbw.jpg	The Telegraph	Anti-apartheid campaigner Winnie Mandela dies
22	\N	http://www.telegraph.co.uk/news/2018/04/02/anti-apartheid-campaigner-winnie-mandela-dies/	Our Foreign Staff	Winnie Mandela, the South African anti-apartheid campaigner and former wife of Nelson Mandela, has died aged 81, according to her assistant.	2018-04-02T15:03:34Z	https://www.telegraph.co.uk/content/dam/news/2018/04/02/5926821_AP_South-Africa-Nelson-Mandela-Release-xlarge_trans_NvBQzQNjv4BqTw4-AaCxUhcMgOYbK39rJVF2ZHR0HBTdDSG7qZU5Rbw.jpg	The Telegraph	Anti-apartheid campaigner Winnie Mandela dies
23	\N	http://www.telegraph.co.uk/news/2018/04/02/anti-apartheid-campaigner-winnie-mandela-dies/	Our Foreign Staff	Winnie Mandela, the South African anti-apartheid campaigner and former wife of Nelson Mandela, has died aged 81, according to her assistant.	2018-04-02T15:03:34Z	https://www.telegraph.co.uk/content/dam/news/2018/04/02/5926821_AP_South-Africa-Nelson-Mandela-Release-xlarge_trans_NvBQzQNjv4BqTw4-AaCxUhcMgOYbK39rJVF2ZHR0HBTdDSG7qZU5Rbw.jpg	The Telegraph	Anti-apartheid campaigner Winnie Mandela dies
24	\N	http://www.telegraph.co.uk/news/2018/04/02/anti-apartheid-campaigner-winnie-mandela-dies/	Our Foreign Staff	Winnie Mandela, the South African anti-apartheid campaigner and former wife of Nelson Mandela, has died aged 81, according to her assistant.	2018-04-02T15:03:34Z	https://www.telegraph.co.uk/content/dam/news/2018/04/02/5926821_AP_South-Africa-Nelson-Mandela-Release-xlarge_trans_NvBQzQNjv4BqTw4-AaCxUhcMgOYbK39rJVF2ZHR0HBTdDSG7qZU5Rbw.jpg	The Telegraph	Anti-apartheid campaigner Winnie Mandela dies
25	\N	https://www.ccn.com/investor-banks-like-goldman-sachs-entering-crypto-will-lead-to-bitcoin-price-surge/	null	Jon Matonis, a co-founder of Bitcoin Foundation and executive at VISA, stated that the entrance of major banks and financial institutions like Goldman Sachs will lead to an increase in the liquidity of bitcoin, and ultimately, the bitcoin price.	2018-04-02T15:23:07Z	https://www.ccn.com/wp-content/uploads/2017/11/Bitcoin-chart-bg.jpg	Crypto Coins News	Goldman Sachs Entering Crypto Will Lead to Bitcoin Price Surge: Matonis
26	\N	https://www.ccn.com/investor-banks-like-goldman-sachs-entering-crypto-will-lead-to-bitcoin-price-surge/	null	Jon Matonis, a co-founder of Bitcoin Foundation and executive at VISA, stated that the entrance of major banks and financial institutions like Goldman Sachs will lead to an increase in the liquidity of bitcoin, and ultimately, the bitcoin price.	2018-04-02T15:23:07Z	https://www.ccn.com/wp-content/uploads/2017/11/Bitcoin-chart-bg.jpg	Crypto Coins News	Goldman Sachs Entering Crypto Will Lead to Bitcoin Price Surge: Matonis
27	\N	https://www.ccn.com/investor-banks-like-goldman-sachs-entering-crypto-will-lead-to-bitcoin-price-surge/	null	Jon Matonis, a co-founder of Bitcoin Foundation and executive at VISA, stated that the entrance of major banks and financial institutions like Goldman Sachs will lead to an increase in the liquidity of bitcoin, and ultimately, the bitcoin price.	2018-04-02T15:23:07Z	https://www.ccn.com/wp-content/uploads/2017/11/Bitcoin-chart-bg.jpg	Crypto Coins News	Goldman Sachs Entering Crypto Will Lead to Bitcoin Price Surge: Matonis
28	\N	https://www.washingtonpost.com/local/obituaries/winnie-madikizela-mandela-south-africas-mother-of-the-nation-dies-at-81/2018/04/02/095c5360-3680-11e8-acd5-35eac230e514_story.html	Stephanie Hanes, Stephanie Hanes	She was the former wife of Nelson Mandela and one of the country’s most polarizing figures.	2018-04-02T15:34:00Z	https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2018/04/02/Obituaries/Images/AFP_13L45D.jpg?t=20170517	The Washington Post	Winnie Madikizela-Mandela, South Africa’s ‘Mother of the Nation,’ dies at 81
29	\N	https://www.washingtonpost.com/local/obituaries/winnie-madikizela-mandela-south-africas-mother-of-the-nation-dies-at-81/2018/04/02/095c5360-3680-11e8-acd5-35eac230e514_story.html	Stephanie Hanes, Stephanie Hanes	She was the former wife of Nelson Mandela and one of the country’s most polarizing figures.	2018-04-02T15:34:00Z	https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2018/04/02/Obituaries/Images/AFP_13L45D.jpg?t=20170517	The Washington Post	Winnie Madikizela-Mandela, South Africa’s ‘Mother of the Nation,’ dies at 81
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: rachelpoulos
--

COPY public.ratings (ratingid, userid, articleid, fair, unfair, newsworthy, not_newsworthy) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: rachelpoulos
--

COPY public.users (username, password, userid, leaning, email) FROM stdin;
\.


--
-- Name: articles_articleid_seq; Type: SEQUENCE SET; Schema: public; Owner: rachelpoulos
--

SELECT pg_catalog.setval('public.articles_articleid_seq', 29, true);


--
-- Name: ratings_ratingid_seq; Type: SEQUENCE SET; Schema: public; Owner: rachelpoulos
--

SELECT pg_catalog.setval('public.ratings_ratingid_seq', 1, false);


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: rachelpoulos
--

SELECT pg_catalog.setval('public.users_userid_seq', 1, false);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: rachelpoulos
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (articleid);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: rachelpoulos
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (ratingid);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: rachelpoulos
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_password_key; Type: CONSTRAINT; Schema: public; Owner: rachelpoulos
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_password_key UNIQUE (password);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: rachelpoulos
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: rachelpoulos
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

