const express = require('express')
const router = express.Router()
const gamesController = require('../controllers/games')

router.get('/', gamesController.getGames)

router.post('/addAGame', gamesController.addAGame)

router.put('/increasePlays', gamesController.increasePlays)

router.get('/searchAGame', gamesController.searchAGame)

router.delete('/deleteGame', gamesController.deleteGame)

module.exports = router