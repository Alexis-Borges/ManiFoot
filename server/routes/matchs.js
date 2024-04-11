const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const matches = await prisma.match.findMany({
    include: {
      tournament: true,
      team1: true,
      team2: true,
      winner: true
    }
  })
  res.json(matches)
})

router.post('/', async (req, res) => {
  const { tournamentId, team1Id, team2Id } = req.body

  const winnerId = Math.floor(Math.random() * 2) + 1 === 1 ? team1Id : team2Id;

  const newMatch = await prisma.match.create({
    data: {
      tournament: { connect: { id: Number(tournamentId) } },
      team1: { connect: { id: Number(team1Id) } },
      team2: { connect: { id: Number(team2Id) } },
      winner: { connect: { id: Number(winnerId) } } 
    },
    include: {
      tournament: true,
      team1: true,
      team2: true,
      winner: true
    }
  })

  res.json(newMatch)
})

module.exports = router