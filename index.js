const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const dotenv = require("dotenv");
const services = require("./services/twitterServices");
const fs = require("fs");

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./my-app/dist/my-app"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// const path = __dirname + '/views/';
const port = process.env.SERVER_PORT;

router.use((req, res, next) => {
  console.log("/" + req.method);
  next();
});

router.get("/", (req, res) => {
  res.status(200).send("Hola mundo!");
  app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
  });
});

router.get("/tweets", async (req, res) => {
  try {
    const response = await services.getTweets(req);

    res.status(200).send(response);
  } catch (error) {
    console.log(`An error has ocurred getTweets: ${error}`);
    res.status(500);
  }
});

router.get("/tweetsfromfile", async (req, res) => {
  try {
    const response = await services.getSentimentMeanFromFile(req);
    fs.appendFile(
      "./data/geolocation_scores.json",
      JSON.stringify(response),
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      }
    );

    res.status(200).send(response);
  } catch (error) {
    console.log(`An error has ocurred getTweets: ${error}`);
    res.status(500);
  }
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening on ${process.env.HOST_URL}:${port}`);
});
