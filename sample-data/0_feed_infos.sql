--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: feed_infos; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.feed_infos (
    feed_publisher_name character varying(255),
    feed_publisher_url character varying(255),
    feed_lang character varying(255),
    feed_start_date character varying(255),
    feed_end_date character varying(255),
    feed_version character varying(255)
);


ALTER TABLE public.feed_infos OWNER TO root;

--
-- Data for Name: feed_infos; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.feed_infos (feed_publisher_name, feed_publisher_url, feed_lang, feed_start_date, feed_end_date, feed_version) FROM stdin;
SBB	http://www.sbb.ch/	DE	20231210	20241214	20240530
\.


--
-- PostgreSQL database dump complete
--

