const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const albumController = require("../controllers/albums");

router.get('/', albumController.getAlbums);
router.put('/like/:id', ensureAuth, albumController.likeAlbum);
router.put('/unlike/:id', ensureAuth, albumController.unlikeAlbum);
router.post('/create', ensureAuth, albumController.createAlbum);
router.delete('/delete/:id', ensureAuth, albumController.deleteAlbum);

module.exports = router;