const express = require("express");
const router = express.Router();
// router.get("/api", (req, res) => {
//   res.send({ response: "I am alive" }).status(200);
//   console.log(req.data);
// });
router.post('/api', function (req, res) {
    console.log(req.body);
    res.status(200).send(req.body);
});
module.exports = router;
