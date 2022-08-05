
import fastifyFacotry from 'fastify'
import { logger } from './logging'
import { repositories } from './repositories'
import { Proposal } from './services/snapshot'
import { Proposal as DBProposal } from '@prisma/client'
import { omit } from 'lodash'
import crypto from 'crypto'
import { queueMessage } from './services/pubsub'

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
  snapshotLink: proposal.link,
  discussionLink: proposal. discussion,
})

const processProposal = async (proposal: Proposal) => {
  const dao = await repositories.dao.findUnique({ where: { snapshotId: proposal.space.id } })
  if (!dao) {
    return
  }

  return await repositories.proposal.upsert({
    where: { snapshotId: proposal.id },
    create: {
      ...transformProposalToDbFormat(proposal),
      daoId: dao.id,
    },
    update: {
      ...omit(transformProposalToDbFormat(proposal), ['juniorDescription', 'middleDescription']),
    },
  })
}

fastify.post('/', async (request, reply) => {
  const requestId = crypto.randomUUID()
  try {
    logger.info({ message: 'Received request', requestBody: request.body, requestId })
    const proposal: Proposal = JSON.parse(
      Buffer.from((request.body as any).message.data, 'base64').toString('utf-8')
    )
    logger.info({ message: 'Parsed proposal', proposal, requestId })

    const dbProposal = await processProposal(proposal)
    if (!dbProposal) {
      logger.info({ message: 'Request successfully finished. Proposal was skipped', requestId })
      return await reply.status(200).send({})
    }

    logger.info({ message: 'Request successfully saved. Pushing into queue...', requestId })
    await queueMessage({ id: dbProposal.id.toString(), seniorDescription: dbProposal.seniorDescription  })
    logger.info({ message: 'Request successfully finished', requestId })
    return await reply.status(200).send({})
  } catch (error: any) {
    logger.error({ message: 'Request failed', err: { message: error?.message, stack: error?.stack }, requestId })
    return reply.status(400).send({ message: (typeof error === 'object' && (error as { message?: string } || null)?.message) ?? 'unknown' })
  }
})

export const server = fastify
