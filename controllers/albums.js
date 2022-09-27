const Album = require('../models/Album')

module.exports = {
    getAlbums: async (req, res) => {
        const albumItems = await Album.find().sort({"likes": -1});
        res.render("albums.ejs", { album: albumItems, user: req.user });
    },
    createAlbum: async (req, res) => {
        try {      
            await Album.create({
              name: req.body.name,
              likes: [],
              likesCount: 0,
              createdBy: req.user.id,
            });
            console.log("Album has been added!");
            res.redirect("/albums");
          } catch (err) {
            console.log(err);
          }
    },
    likeAlbum: async (req, res) => {
        try {
            await Album.findOneAndUpdate(
            { _id: req.params.id },
            {
                $inc: { likesCount: 1 },
                $push: { likes: req.user.id }
            }
            );
            console.log("Likes +1");
            res.redirect(`/albums`);
        } catch (err) {
            console.log(err);
        }
    },
    unlikeAlbum: async (req, res) => {
        try {
            await Album.findOneAndUpdate(
            { _id: req.params.id },
            {
                $inc: { likesCount: -1 },
                $pull: { likes: req.user.id }
            }
            );
            console.log("Likes -1");
            res.redirect(`/albums`);
        } catch (err) {
            console.log(err);
        }
    },
    deleteAlbum: async (req, res) => {
        try {
          await Album.deleteOne({ _id: req.params.id });

          console.log("Deleted Album");
          res.redirect("/albums");
        } catch (err) {
          res.redirect("/albums");
        }
    },
  };
  