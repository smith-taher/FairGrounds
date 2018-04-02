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
-- Name: articles; Type: TABLE; Schema: public; Owner: robby
--

CREATE TABLE articles (
    articleid serial PRIMARY KEY,
    title character varying(500) NOT NULL,
    url character varying(500) NOT NULL,
    author character varying(500),
    description character varying(500),
    publishedat character varying(500),
    urltoimage character varying(500),
    topic character varying(500)
);


ALTER TABLE public.articles OWNER TO robby;

--
-- Name: articles_articleid_seq; Type: SEQUENCE; Schema: public; Owner: robby
--

CREATE SEQUENCE public.articles_articleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_articleid_seq OWNER TO robby;

--
-- Name: articles_articleid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robby
--

ALTER SEQUENCE public.articles_articleid_seq OWNED BY public.articles.articleid;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: robby
--

CREATE TABLE public.ratings (
    ratingid serial PRIMARY KEY,
    userid integer,
    articleid integer,
    fair integer,
    unfair integer,
    newsworthy integer,
    not_newsworthy integer
);


ALTER TABLE public.ratings OWNER TO robby;

--
-- Name: users; Type: TABLE; Schema: public; Owner: robby
--

CREATE TABLE public.users (
    username character varying(200) UNIQUE NOT NULL,
    password character varying(200) UNIQUE NOT NULL,
    userid serial PRIMARY KEY,
    leaning integer,
    email character varying(200) UNIQUE NOT NULL
);


ALTER TABLE public.users OWNER TO robby;

--
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: robby
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO robby;

--
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robby
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- Name: articles articleid; Type: DEFAULT; Schema: public; Owner: robby
--

ALTER TABLE ONLY public.articles ALTER COLUMN articleid SET DEFAULT nextval('public.articles_articleid_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: robby
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: robby
--

COPY public.articles (articleid, title, url, author, description, publishedat, source, urltoimage, topic) FROM stdin;
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: robby
--

COPY public.ratings (userid, articleid, fair, unfair, newsworthy, not_newsworthy) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: robby
--

COPY public.users (username, password, userid, leaning, email) FROM stdin;
robby	password	1	85	rcackerley@me.com
rachel	password	2	20	rachel@rachel.com
joel	password	3	47	joel@joel.com
testuser1	password	4	61	test@test.com
\.


--
-- Name: articles_articleid_seq; Type: SEQUENCE SET; Schema: public; Owner: robby
--

SELECT pg_catalog.setval('public.articles_articleid_seq', 1, false);


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: robby
--

SELECT pg_catalog.setval('public.users_userid_seq', 4, true);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: robby
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (articleid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: robby
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- PostgreSQL database dump complete
--

