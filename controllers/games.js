const Game = require('../models/game')

module.exports = {
    getGames: async (req,res)=>{
        try{
            const games = await Game.find()
            const gameCount = await Game.countDocuments()
            res.render('games.ejs', {items: games, count: gameCount})
        }catch(err){
            console.log(err)
        }
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
            await Todo.findOneAndUpdate({_id: new ObjectId(req.body.itemId)},{
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
            await Todo.findOneAndDelete({_id: new ObjectId(req.body.itemId)})
            console.log('Deleted')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    