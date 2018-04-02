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
-- Name: articles; Type: TABLE; Schema: public; Owner: joelsmith
--

CREATE TABLE public.articles (
    articleid integer NOT NULL,
    title character varying(200) NOT NULL,
    topic character varying(200),
    url character varying(200) NOT NULL,
    author character varying(200),
    description character varying(300) NOT NULL,
    publishedat character varying(200),
    source character varying(200),
    urltoimage character varying(300)
);


ALTER TABLE public.articles OWNER TO joelsmith;

--
-- Name: articles_articleid_seq; Type: SEQUENCE; Schema: public; Owner: joelsmith
--

CREATE SEQUENCE public.articles_articleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_articleid_seq OWNER TO joelsmith;

--
-- Name: articles_articleid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joelsmith
--

ALTER SEQUENCE public.articles_articleid_seq OWNED BY public.articles.articleid;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: joelsmith
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


ALTER TABLE public.ratings OWNER TO joelsmith;

--
-- Name: ratings_ratingid_seq; Type: SEQUENCE; Schema: public; Owner: joelsmith
--

CREATE SEQUENCE public.ratings_ratingid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratings_ratingid_seq OWNER TO joelsmith;

--
-- Name: ratings_ratingid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joelsmith
--

ALTER SEQUENCE public.ratings_ratingid_seq OWNED BY public.ratings.ratingid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: joelsmith
--

CREATE TABLE public.users (
    username character varying(200) NOT NULL,
    password character varying(200) NOT NULL,
    userid integer NOT NULL,
    leaning integer,
    email character varying(200) NOT NULL
);


ALTER TABLE public.users OWNER TO joelsmith;

--
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: joelsmith
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO joelsmith;

--
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joelsmith
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- Name: articles articleid; Type: DEFAULT; Schema: public; Owner: joelsmith
--

ALTER TABLE ONLY public.articles ALTER COLUMN articleid SET DEFAULT nextval('public.articles_articleid_seq'::regclass);


--
-- Name: ratings ratingid; Type: DEFAULT; Schema: public; Owner: joelsmith
--

ALTER TABLE ONLY public.ratings ALTER COLUMN ratingid SET DEFAULT nextval('public.ratings_ratingid_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: joelsmith
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: joelsmith
--

COPY public.articles (articleid, title, topic, url, author, description, publishedat, source, urltoimage) FROM stdin;
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: joelsmith
--

COPY public.ratings (ratingid, userid, articleid, fair, unfair, newsworthy, not_newsworthy) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: joelsmith
--

COPY public.users (username, password, userid, leaning, email) FROM stdin;
\.


--
-- Name: articles_articleid_seq; Type: SEQUENCE SET; Schema: public; Owner: joelsmith
--

SELECT pg_catalog.setval('public.articles_articleid_seq', 1, false);


--
-- Name: ratings_ratingid_seq; Type: SEQUENCE SET; Schema: public; Owner: joelsmith
--

SELECT pg_catalog.setval('public.ratings_ratingid_seq', 1, false);


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: joelsmith
--

SELECT pg_catalog.setval('public.users_userid_seq', 4, true);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: joelsmith
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (articleid);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: joelsmith
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (ratingid);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: joelsmith
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_password_key; Type: CONSTRAINT; Schema: public; Owner: joelsmith
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_password_key UNIQUE (password);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: joelsmith
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: joelsmith
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

