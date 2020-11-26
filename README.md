# MiniMoo

 ### Initial setup
1. Install with homebrew or `nvm`:
- node
- postgres
- psql
2. `yarn` to install front-end dependencies

### Troubleshooting
- If you don't yet have a database named after your computer user, just type `createdb` with no arguments

 ## Database Configuration
 
 ### Initial setup
1. Create a user named `ko` for postgres with `createuser ko`
2. Create a database named `slp-backend` with `createdb slp-backend`

### Getting data
- Initial tables have to be created via raw SQL. We do not yet have SQL migration files or a migration solution.

### Steps
- For now, open `psql` (or `psql -d slp-backend`) and run whatever SQL files we do have to generate the tables
- For now, just add a few fakey records using TablePlus or Postico or whatever

