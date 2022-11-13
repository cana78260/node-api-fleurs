npm i
Dependencies :

express
cors
typeorm
reflect-metadata
pg
Dev dependencies :

@types/express
typescript
ts-node
nodemon
@types/cors
@types/node
Info init project
You don't have to do this, I already executed it while project initialization.

(Tu n'as pas à executer, c'est ce que j'ai fais pour initialiser le projet)

Initialization of .git hidden folder

git init
Initialization of .gitignore file and add node_modules in it

echo node_modules >> .gitignore
echo dist >> .gitignore
Connect my local repo and remote repo by url ([REPO_URL] to change with yours)

git remote add origin [REPO_URL]
Initialization of package.json file

npm init -y
Initialization of tsconfig.json file

tsc --init
and in the file tsconfig.json, and uncomment/modify this option "outDir": "./dist" (l.52)

Installation of dependencies :

npm i express cors typeorm reflect-metadata pg
Installation of dev dependencies :

npm i -D typescript @types/express ts-node nodemon @types/cors @types/node 
Create database
Dans un shell PSQL :

CREATE DATABASE library;
Ensuite je me connecte à cette base de données avec \c library et je créer la table book :

CREATE TABLE book(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255)
);
On insère quelques données de test :

INSERT INTO book (title) VALUES ('The Hobbit'), ('The Lord of the Rings');