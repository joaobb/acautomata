# FAVA (Finite Automata Validation App) 🫘

## Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- Node.js (version 12 or higher)
- Node.JS package manager (Yarn or npm)

## Step 1: Clone the Repository

First, clone the fava-api repository to your local machine. Open a terminal and run the following command:

```bash
git clone https://github.com/joaobb/fava.git
```
This command will create a local copy of the repository on your machine.



## Step 2: Install Dependencies

Navigate to the project directory:

```bash
cd fava
```

Once inside the project directory, use `yarn` or `npm` to install the required dependencies. Run either of the following commands:


```bash
yarn
```

Using npm:

```bash
npm install
```


This will download and install all the necessary dependencies specified in the `package.json` file.

## Step 3: Configure API Route

If you chose to use a local API, run the following command then replace its variable value to match your actual API URL:
```bash
cp .env.example .env
```

Otherwise, for using the deployed API, run this command, and you're ready to go!
```bash
cp .env.deploy .env
```

## Step 4: Start the React Development Server

To start the React development server and run your project, execute one of the following commands based on your package manager:

Using Yarn:

```bash
yarn start
```

Using npm:

```bash
npm start
```

This command will start the development server and make your ReactJS project accessible at `http://localhost:3000` in your web browser.
