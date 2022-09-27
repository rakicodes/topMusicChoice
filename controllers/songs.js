const Songs = require('../models/Song')

module.exports = {
    getSongs: async (req, res) => {
      const songItems = await Songs.find().sort({"likes": -1});
      res.render("songs.ejs", { song: songItems, user: req.user });
    },
    createSong: async (req, res) => {
      try {      
          await Songs.create({
            name: req.body.name,
            likes: [],
            likesCount: 0,
            createdBy: req.user.id,
          });
          console.log("Songs has been added!");
          res.redirect("/songs");
        } catch (err) {
          console.log(err);
        }
    },
    likeSong: async (req, res) => {
      try {
        await Songs.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likesCount: 1 },
            $push: { likes: req.user.id }
          }
        );
        console.log("Likes +1");
        res.redirect(`/songs`);
      } catch (err) {
        console.log(err);
      }
    },
    unlikeSong: async (req, res) => {
      try {
        await Songs.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likesCount: -1 },
            $pull: { likes: req.user.id }
          }
        );
        console.log("Likes -1");
        res.redirect(`/songs`);
      } catch (err) {
        console.log(err);
      }
    },
    deleteSong: async (req, res) => {
      try {
        await Songs.deleteOne({ _id: req.params.id });

        console.log("Deleted Songs");
        res.redirect("/songs");
      } catch (err) {
        res.redirect("/songs");
      }
    },
  };