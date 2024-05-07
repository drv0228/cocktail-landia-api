const express = require("express");
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

app.use(cors({
  // origin: "*",
  origin: 'https://cocktaillandia.netlify.app',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
}));


app.use(express.json());
app.use("/public", express.static("public"));


function readCocktailsFile() {
  const cocktailsList = fs.readFileSync("./data/topCocktails.json");
  const parsedCocktailsList = JSON.parse(cocktailsList);
  return parsedCocktailsList;
}

app.get("/cocktails", (req, res) => {
  const cocktails = readCocktailsFile();
  res.json(cocktails);
});

app.get("/search", (req, res) => {
  const query = req.query.q;
  const cocktails = readCocktailsFile();
  const searchResults = cocktails.filter((cocktail) =>
    cocktail.ingredients.toLowerCase().includes(query.toLowerCase())
  );
  res.json(searchResults);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});