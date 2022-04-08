var express = require("express");
var router = express.Router();
const multiparty = require("multiparty");
const mongoose = require("mongoose");
var Rank = require("../models/rank-model.js");

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

    const form = new multiparty.Form();
    form.parse(req, async (err, fields, files) => {
      var stringFields = new Object();
      for (var [key, value] of Object.entries(fields)) {
        stringFields[key] = value.toString();
      }
      const newRankDocument = new Rank(stringFields);
      // save the document
      try {
        await newRankDocument.save();
        res.send("Got a POST Ranking request ");
      } catch (error) {
        res.send(error);
      }
    });
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

    try {
      const ranksDocuments = await Rank.find();
      res.send(ranksDocuments);
    } catch (error) {
      res.send(error);
    }
  }
  //End Moongoose
});
module.exports = router;
