PGDMP     !    #    
             u            sinhvien    9.6.0    9.6.0     e           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            f           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            g           1262    32774    sinhvien    DATABASE     �   CREATE DATABASE sinhvien WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE sinhvien;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            h           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12387    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            i           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    49165    Likes    TABLE     o   CREATE TABLE "Likes" (
    id bigint NOT NULL,
    user_id bigint,
    note_id bigint,
    create_time date
);
    DROP TABLE public."Likes";
       public         postgres    false    3            �            1259    49163    Likes_id_seq    SEQUENCE     p   CREATE SEQUENCE "Likes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Likes_id_seq";
       public       postgres    false    3    190            j           0    0    Likes_id_seq    SEQUENCE OWNED BY     3   ALTER SEQUENCE "Likes_id_seq" OWNED BY "Likes".id;
            public       postgres    false    189            �            1259    40973    Notes    TABLE     �   CREATE TABLE "Notes" (
    id bigint NOT NULL,
    note text,
    title text,
    possition text,
    create_time date,
    update_time date,
    user_id bigint,
    "like" integer
);
    DROP TABLE public."Notes";
       public         postgres    false    3            �            1259    40971    Nodes_id_seq    SEQUENCE     p   CREATE SEQUENCE "Nodes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Nodes_id_seq";
       public       postgres    false    3    188            k           0    0    Nodes_id_seq    SEQUENCE OWNED BY     3   ALTER SEQUENCE "Nodes_id_seq" OWNED BY "Notes".id;
            public       postgres    false    187            �            1259    40962    Users    TABLE     �   CREATE TABLE "Users" (
    id bigint NOT NULL,
    password text,
    email text,
    create_time date,
    username text,
    realname text
);
    DROP TABLE public."Users";
       public         postgres    false    3            �            1259    40960    user_id_seq    SEQUENCE     m   CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public       postgres    false    3    186            l           0    0    user_id_seq    SEQUENCE OWNED BY     0   ALTER SEQUENCE user_id_seq OWNED BY "Users".id;
            public       postgres    false    185            �           2604    49168    Likes id    DEFAULT     Z   ALTER TABLE ONLY "Likes" ALTER COLUMN id SET DEFAULT nextval('"Likes_id_seq"'::regclass);
 9   ALTER TABLE public."Likes" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    190    189    190            �           2604    40976    Notes id    DEFAULT     Z   ALTER TABLE ONLY "Notes" ALTER COLUMN id SET DEFAULT nextval('"Nodes_id_seq"'::regclass);
 9   ALTER TABLE public."Notes" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    188    187    188            �           2604    40965    Users id    DEFAULT     W   ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    185    186    186            b          0    49165    Likes 
   TABLE DATA               =   COPY "Likes" (id, user_id, note_id, create_time) FROM stdin;
    public       postgres    false    190   <       m           0    0    Likes_id_seq    SEQUENCE SET     6   SELECT pg_catalog.setval('"Likes_id_seq"', 35, true);
            public       postgres    false    189            n           0    0    Nodes_id_seq    SEQUENCE SET     6   SELECT pg_catalog.setval('"Nodes_id_seq"', 71, true);
            public       postgres    false    187            `          0    40973    Notes 
   TABLE DATA               a   COPY "Notes" (id, note, title, possition, create_time, update_time, user_id, "like") FROM stdin;
    public       postgres    false    188   Y       ^          0    40962    Users 
   TABLE DATA               P   COPY "Users" (id, password, email, create_time, username, realname) FROM stdin;
    public       postgres    false    186   �       o           0    0    user_id_seq    SEQUENCE SET     3   SELECT pg_catalog.setval('user_id_seq', 22, true);
            public       postgres    false    185            �           2606    49170    Likes Likes_pkey 
   CONSTRAINT     K   ALTER TABLE ONLY "Likes"
    ADD CONSTRAINT "Likes_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Likes" DROP CONSTRAINT "Likes_pkey";
       public         postgres    false    190    190            �           2606    40981    Notes Nodes_pkey 
   CONSTRAINT     K   ALTER TABLE ONLY "Notes"
    ADD CONSTRAINT "Nodes_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Notes" DROP CONSTRAINT "Nodes_pkey";
       public         postgres    false    188    188            �           2606    40970    Users user_pkey 
   CONSTRAINT     H   ALTER TABLE ONLY "Users"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 ;   ALTER TABLE ONLY public."Users" DROP CONSTRAINT user_pkey;
       public         postgres    false    186    186            b      x������ � �      `   /   x�37�L�L)N"ΜԴN#Cs]C]s�?N##NC�=... �	      ^   f   x�32�5r+Nqˎ0�.pw6s�pt����w.0�N�
M�K/5�*�uK���H�tH�M���K���4204�50�50IXg	��P��Z� dp��qqq �d1     