const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    "data": {
      "P2S": {
        "months": [
          "Nov"
        ],
        "sum": [
          1100000
        ],
        "name": "P2S"
      },
      "ALL": {
        "months": [
          "Jun",
          "Nov",
          "Dec",
          "Apr",
          "May"
        ],
        "sum": [
          1100000,
          25300000,
          555550,
          1100000,
          1100000
        ],
        "name": "ALL"
      },
      "P2P": {
        "months": [
          "Jun",
          "Nov",
          "Dec",
          "Apr",
          "May"
        ],
        "sum": [
          1100000,
          24200000,
          555550,
          1100000,
          1100000
        ],
        "name": "P2P"
      }
    },
    "errorKey": null,
    "errorMessage": null,
    "timestamp": 1714639594400
  });
});

module.exports = router;
