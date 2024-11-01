const Game = require('../models/game')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    getGames: async (req,res)=>{
        const gameName = req.query.searchGame;
        let games;
    
        if (gameName) {
            // If a search term is provided, filter by that name
            games = await Game.find({ Name: gameName });
        } else {
            // Otherwise, fetch all games
            games = await Game.find({});
        }
        
        const gameCount = games.length;
        res.render('games.ejs', { items: games, count: gameCount });
    },

    addAGame: async (req, res)=>{
        try{
            await Game.create({Name: req.body.gameName, Rating: Number(req.body.gameRating), Notes: req.body.gameNotes, Plays: Number(req.body.gamePlays)})
            console.log('Game has been added!')
            res.redirect('/games')
        }catch(err){
            console.log(err)
        }
    },
    increasePlays: async (req, res)=>{
        try{
            await Game.findOneAndUpdate({_id: new ObjectId(req.body.itemId)},{
                $inc: { Plays: 1 }
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },

    deleteGame: async (req, res)=>{
        console.log(req.body.itemId)
        try{
            await Game.findOneAndDelete({_id: new ObjectId(req.body.itemId)})
            console.log('Deleted')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },

    searchAGame: async(req, res) => {
const gameName = req.query.searchGame;
    const game = await Game.find({ Name: gameName });
    const gameCount = game.length;

    // Redirect to the /games route and pass the game data as query parameters or via session data
    res.redirect(`/games?searchGame=${encodeURIComponent(gameName)}`);
    }   
}    