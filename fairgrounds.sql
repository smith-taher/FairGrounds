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
    topic character varying(1000),
    title character varying(1000) NOT NULL,
    url character varying(1000) NOT NULL,
    author character varying(1000),
    description character varying(1000),
    publishedat character varying(1000),
    source character varying(1000),
    urltoimage character varying(1000)
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
    userid integer NOT NULL,
    articleid integer NOT NULL,
    written_fairly bit(1) NOT NULL
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
    userid integer NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(20) NOT NULL,
    leaning integer NOT NULL
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

COPY public.articles (articleid, topic, title, url, author, description, publishedat, source, urltoimage) FROM stdin;
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: rachelpoulos
--

COPY public.ratings (ratingid, userid, articleid, written_fairly) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: rachelpoulos
--

COPY public.users (userid, username, password, leaning) FROM stdin;
\.


--
-- Name: articles_articleid_seq; Type: SEQUENCE SET; Schema: public; Owner: rachelpoulos
--

SELECT pg_catalog.setval('public.articles_articleid_seq', 1, false);


--
-- Name: ratings_ratingid_seq; Type: SEQUENCE SET; Schema: public; Owner: rachelpoulos
--

SELECT pg_catalog.setval('public.ratings_ratingid_seq', 1, false);


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: rachelpoulos
--

SELECT pg_catalog.setval('public.users_userid_seq', 1, false);


--
-- Name: articles articles_url_key; Type: CONSTRAINT; Schema: public; Owner: rachelpoulos
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_url_key UNIQUE (url);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: rachelpoulos
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

