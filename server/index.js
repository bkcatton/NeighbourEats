const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000

// middleware
app.use(cors());
app.use(express.json());

// routes


// set-up
app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
