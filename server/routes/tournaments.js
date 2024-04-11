const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.post('/', async (req, res) => {
  const { name, sport } = req.body
  const newTournament = await prisma.tournament.create({
    data: {
      name,
      sport
    }
  })
  res.json(newTournament)
})

router.get('/', async (req, res) => {
  const tournaments = await prisma.tournament.findMany()
  res.json(tournaments)
})

router.put('/:id', async (req, res) => {
    const { name, sport } = req.body
    const updatedTournament = await prisma.tournament.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        sport
      }
    })
    res.json(updatedTournament)
  })

  router.delete('/:id', async (req, res) => {
    const { id } = req.params
  
    const teams = await prisma.team.findMany({
      where: {
        tournamentId: Number(id)
      }
    })
  
    for (let team of teams) {
      await prisma.match.deleteMany({
        where: {
          OR: [
            { team1Id: team.id },
            { team2Id: team.id }
          ]
        }
      })
    }
  
    await prisma.team.deleteMany({
      where: {
        tournamentId: Number(id)
      }
    })
  
    const deletedTournament = await prisma.tournament.delete({
      where: {
        id: Number(id)
      }
    })
  
    res.json(deletedTournament)
  }) // Cette accolade fermante correspond à l'accolade ouvrante de router.delete

module.exports = router