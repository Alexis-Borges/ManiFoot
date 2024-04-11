const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.post('/', async (req, res) => {
  const { tournamentId, name } = req.body
  const newTeam = await prisma.team.create({
    data: {
      name,
      tournament: {
        connect: {
          id: Number(tournamentId) 
        }
      }
    }
  })
  res.json(newTeam)
})

router.get('/', async (req, res) => {
  const teams = await prisma.team.findMany()
  res.json(teams)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedTeam = await prisma.team.update({
        where: { id },
        data: { name },
    });
    res.json(updatedTeam);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  await prisma.match.deleteMany({
    where: {
      OR: [
        { team1Id: Number(id) },
        { team2Id: Number(id) }
      ]
    }
  })

  await prisma.team.delete({
    where: {
      id: Number(id)
    }
  })

  res.sendStatus(204)
})

module.exports = router