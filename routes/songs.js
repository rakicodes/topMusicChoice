const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const songsController = require("../controllers/songs");

router.get('/', songsController.getSongs);
router.put('/like/:id', ensureAuth, songsController.likeSong);
router.put('/unlike/:id', ensureAuth, songsController.unlikeSong);
router.post('/create', ensureAuth, songsController.createSong);
router.delete('/delete/:id', ensureAuth, songsController.deleteSong);

module.exports = router;