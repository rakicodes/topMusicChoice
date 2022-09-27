const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const lyricsController = require("../controllers/lyrics");

router.get('/', lyricsController.getLyrics);
router.put('/like/:id', ensureAuth, lyricsController.likeLyrics);
router.put('/unlike/:id', ensureAuth, lyricsController.unlikeLyrics);
router.post('/create', ensureAuth, lyricsController.createLyrics);
router.delete('/delete/:id', ensureAuth, lyricsController.deleteLyrics);

module.exports = router;