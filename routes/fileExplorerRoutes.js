const express = require('express');
const router = express.Router();
const controller = require('../controllers/fileExplorerController');

router.get('/folders/:folderId', controller.getFolderContent);
router.post('/folders', controller.addFolder);
router.post('/files', controller.addFile);

module.exports = router;
