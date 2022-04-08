var express = require("express");
var router = express.Router();
const multiparty = require("multiparty");
const mongoose = require("mongoose");

// router.post("/ranking", (req, res, next) => {
//   res.send("Got a POST request");
// });

router.post("/", function (req, res, next) {
  //Moongoose
  main().catch((err) => console.log(err));

  async function main() {
    await mongoose.connect(
      "mongodb://admin:admin@basecluster-shard-00-00.hirbx.mongodb.net:27017,basecluster-shard-00-01.hirbx.mongodb.net:27017,basecluster-shard-00-02.hirbx.mongodb.net:27017/rankingDB?ssl=true&replicaSet=atlas-12fzsk-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    const rankingSchema = new mongoose.Schema({
      playerName: String,
      score: String,
      date: String,
    });
    const Rank = mongoose.model("Rank", rankingSchema);
    const form = new multiparty.Form();
    form.parse(req, async (err, fields, files) => {
      var stringFields = new Object();
      for (var [key, value] of Object.entries(fields)) {
        stringFields[key] = value.toString();
      }
      const newRankDocument = new Rank(stringFields);
      // save the document
      await newRankDocument.save();
      res.send("Got a POST Ranking request ");
    });
    //retrieve all documents
    // const ranksDocuments = await Rank.find();
  }
  //End Moongoose
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  //Moongoose
  main().catch((err) => console.log(err));

  async function main() {
    await mongoose.connect(
      "mongodb://admin:admin@basecluster-shard-00-00.hirbx.mongodb.net:27017,basecluster-shard-00-01.hirbx.mongodb.net:27017,basecluster-shard-00-02.hirbx.mongodb.net:27017/rankingDB?ssl=true&replicaSet=atlas-12fzsk-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    const rankingSchema = new mongoose.Schema({
      playerName: [String],
      score: [Number],
      date: [String],
    });
    const Rank = mongoose.model("Rank", rankingSchema);
    const form = new multiparty.Form();
    //retrieve all documents
    const ranksDocuments = await Rank.find();
    res.send(ranksDocuments);
  }
  //End Moongoose
});
module.exports = router;
