const Artist = require('../models/Artist')

module.exports = {
    getArtists: async (req, res) => {
      const artistItems = await Artist.find().sort({"likes": -1});
      res.render("artists.ejs", { artist: artistItems, user: req.user });
    },
    createArtist: async (req, res) => {
      try {      
          await Artist.create({
            name: req.body.name,
            likes: [],
            likesCount: 0,
            createdBy: req.user.id,
          });
          console.log("Artist has been added!");
          res.redirect("/artists");
        } catch (err) {
          console.log(err);
        }
    },
    likeArtist: async (req, res) => {
      try {
        await Artist.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likesCount: 1 },
            $push: { likes: req.user.id }
          }
        );
        console.log("Likes +1");
        res.redirect(`/artists`);
      } catch (err) {
        console.log(err);
      }
    },
    unlikeArtist: async (req, res) => {
      try {
        await Artist.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likesCount: -1 },
            $pull: { likes: req.user.id }
          }
        );
        console.log("Likes -1");
        res.redirect(`/artists`);
      } catch (err) {
        console.log(err);
      }
    },
    deleteArtist: async (req, res) => {
      try {
        await Artist.deleteOne({ _id: req.params.id });

        console.log("Deleted Artist");
        res.redirect("/artists");
      } catch (err) {
        res.redirect("/artists");
      }
    },
  };
  