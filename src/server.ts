
import fastifyFacotry from 'fastify'
import { logger } from './logging'
import { repositories } from './repositories'
import { Proposal } from './services/snapshot'
import { Proposal as DBProposal } from '@prisma/client'
import crypto from 'crypto'
import { Message } from '@google-cloud/pubsub'

export const fastify = fastifyFacotry({ logger })

const transformProposalToDbFormat = (proposal: Proposal): Omit<DBProposal, 'id'|'createdAt'|'userId'|'daoId'> => ({
  snapshotId: proposal.id,
  title: proposal.title,
  juniorDescription: '',
  middleDescription: '',
  seniorDescription: proposal.body,
  startAt: new Date(proposal.start * 1e3),
  endAt: new Date(proposal.end * 1e3),
  author: proposal.author,
  snapshotLink: proposal.snapshot,
  discussionLink: proposal. discussion,
})

const processProposal = async (proposal: Proposal) => {
  const dao = await repositories.dao.findUnique({ where: { snapshotId: proposal.space.id } })
  if (!dao) {
    return
  }

  await repositories.proposal.upsert({
    where: { snapshotId: proposal.id },
    create: {
      ...transformProposalToDbFormat(proposal),
      daoId: dao.id,
    },
    update: {
      ...transformProposalToDbFormat(proposal),
    },
  })
}

fastify.post('/', async (request, reply) => {
  const requestId = crypto.randomUUID()
  try {
    logger.info({ message: 'Received request', requestBody: request.body, requestId })
    const proposals: Proposal[] = JSON.parse(
      Buffer.from((request.body as any).message.data, 'base64').toString('utf-8')
    )
    logger.info({ message: 'Parsed proposals', proposals, requestId })

    await Promise.all(proposals.map(proposal => processProposal(proposal)))

    return await reply.status(200).send({})
  } catch (error: any) {
    logger.error({ message: 'Request failed', err: { message: error.message, stack: error.stack }, requestId })
    return reply.status(400).send({ message: (typeof error === 'object' && (error as { message?: string } || null)?.message) ?? 'unknown' })
  }
})

export const server = fastify
