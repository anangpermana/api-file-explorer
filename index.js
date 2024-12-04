require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fileExplorerRoutes = require('./routes/fileExplorerRoutes');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: [process.env.CORS_ORIGIN],
}));
app.use(bodyParser.json());
app.use('/api', fileExplorerRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
