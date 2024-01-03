const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

app.get(`/:endpoint`, async (req, res) => {
  try {
    const endpoint = req.params.endpoint;
    const response = await axios.get(`${endpoint}`);
    const data = response.data;
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    res.status(403).json({ error: 'Forbidden' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
