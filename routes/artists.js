const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const artistController = require("../controllers/artists");

router.get('/', artistController.getArtists);
router.put('/like/:id', ensureAuth, artistController.likeArtist);
router.put('/unlike/:id', ensureAuth, artistController.unlikeArtist);
router.post('/create', ensureAuth, artistController.createArtist);
router.delete('/delete/:id', ensureAuth, artistController.deleteArtist);

module.exports = router;