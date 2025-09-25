# Install-vuejs
This guide explains the system requirements, prerequisites, and steps to install and set up a Vue.js project on your machine.

## 📋 Prerequisites
Before you begin, ensure the following:
* Familiarity with the command line
* Install Node.js version ^20.19.0 || >=22.12.0 (To check version of node, Run the following command "node -v")

## Project Setup
Use the following command to create vue project

```sh
npm create vue@latest project-name
```

* Select the features you need (Router, ESLint, Prettier, etc.).
* After setup, navigate to your project folder:

```sh
cd project-name
npm install
npm run dev
```

Your development server will start and display a local URL (like http://localhost:5173)

### Compile and Minify for Production
```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)
```sh
npm run lint
```

## Recommended IDE Setup
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration
See [Vite Configuration Reference](https://vite.dev/config/).