const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const eventData = require("./models/img.modal");

const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongo DB success");
});

// const imgRouter = require("./routes/record");
// app.use("/upload", imgRouter);

app.get("/", (req, res) => {
  res.send("Image Page");
});

app.post("/upload", (req, res) => {
  var imageData = {
    tag: req.body.tag,
    url: req.body.url,
  };
  new eventData(imageData)
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

app.get("/files", async (req, res) => {
  try {
    const allImages = await eventData.find();
    res.send(allImages.reverse());
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await eventData.deleteOne({ _id: req.params.id });
    res.status(200).send('deleted');
  } catch (error) {
    console.log(error);
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
} else {
  app.use(express.static("images"));
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
