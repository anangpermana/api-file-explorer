const { Folder, File } = require('../models');

exports.getFolderContent = async (req, res) => {
  const { folderId } = req.params;

  try {
    const folder = await Folder.findByPk(folderId, {
      include: [
        { model: Folder, as: 'subfolders' },
        { model: File, as: 'files' },
      ],
    });

    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    res.json({ folder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addFolder = async (req, res) => {
  const { name, parentId } = req.body;

  try {
    const folder = await Folder.create({ name, parent_id: parentId });
    res.status(201).json({ folder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addFile = async (req, res) => {
  const { name, type, size, path, folderId } = req.body;

  try {
    const file = await File.create({ name, type, size, path, folder_id: folderId });
    res.status(201).json({ file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
