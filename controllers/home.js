const Artist = require('../models/Artist')
const Album = require('../models/Album')
const Song = require('../models/Song')
const Lyrics = require('../models/Lyrics')


module.exports = {
    getHome: (req, res) => {
        res.render('home.ejs', { user: req.user })
    },
    getProfile: async (req, res) => {
        const artistItems = await Artist.find({likes: req.user.id})
        const albumItems = await Album.find({likes: req.user.id})
        const lyricsItems = await Lyrics.find({likes: req.user.id})
        const songItems = await Song.find({likes: req.user.id})

        res.render('profile.ejs', {
            artist: artistItems,
            album: albumItems,
            lyrics: lyricsItems,
            song: songItems,
            user: req.user,
        })
    },
    getTop: async (req, res) => {
        const artistItems = await Artist.find()
        const albumItems = await Album.find()
        const lyricsItems = await Lyrics.find()
        const songItems = await Song.find()

        res.render('top.ejs', { 
            artist: artistItems,
            album: albumItems,
            lyrics: lyricsItems,
            song: songItems,
            user: req.user,
        })
    },

}