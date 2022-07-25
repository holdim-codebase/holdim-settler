import { assert } from 'chai'
import supertest from 'supertest'
import { repositories } from '../src/repositories'
import { server as fastify } from '../src/server'
import { Proposal } from '../src/services/snapshot'

const createPubSubMessageMock = (messageBody: Record<string, any>): { message: { data: string } } => ({
  message: {
    data: Buffer.from(JSON.stringify(messageBody)).toString('base64'),
  },
})

describe('Settler', () => {
  it('Update existing proposal', async () => {
    const proposal: Proposal = {
      id: '0x81a78109941e5e0ac6cb5ebf82597c839c20ad6821a8c3ff063dba39032533d4',
      author: '0xd2362DbB5Aa708Bc454Ce5C3F11050C016764fA6'.toLowerCase(),
      symbol: 'AAVE',
      title: 'Aave V3 Harmony - Freeze Reserves [UPDATED]',
      body: 'title: Aave V3 Harmony - Freeze Reserves\nstatus: Proposal\nauthor: 3SE Holdings\n\nSimple Summary\nThis ARC presents the community with a first step towards addressing the current issues with the Aave V3 Market on Harmony in the aftermath of the exploit on Harmony’s Horizon Bridge.\n\nThis proposal calls for the Aave Guardian to freeze all reserves on the Aave V3 deployment on Harmony. This action would protect users by disabling the ability to deposit or borrow assets in the Aave V3 Market on Harmony, while still allowing repayment of debt, liquidations, withdrawals and changes to the interest rates. Freezing the reserves will not interfere with any direct transfers to any of the aToken contracts.\n\nMotivation\nThe Aave DAO Community, through the governance forum, has come to the rough consensus that actions should be taken to stabilize the Aave V3 Market on Harmony and limit the impact to the users, Protocol, and DAO. (Harmony Horizon bridge exploit. Consequences to Aave V3 Harmony 1\n\nThis proposed action is a first step that will protect users.It will give the Aave DAO full flexibility to further address the issue, by interest rate adjustments or other actions as the situation continues to develop.\n\nSpecification\nIf passed, this AIP will call upon the Aave Guardian to call the setReserveFreeze() function with the appropriate parameters on each asset in the Aave V3 Market on Harmony. In addition, passing this AIP will also authorize the necessary changes to the IPFS Aave UI to support this change (disabling supply and borrow) as well as implementing additional warnings and alerts to educate users attempting to interact with the Aave V3 Market on Harmony.',
      discussion: 'https://governance.aave.com/t/aave-v3-harmony-freeze-reserves/8863',
      snapshot: '1657814991',
      state: 'closed',
      link: 'https://snapshot.org/#/aave.eth/proposal/0x81a78109941e5e0ac6cb5ebf82597c839c20ad6821a8c3ff063dba39032533d4',
      created: 1657814991,
      start: 1657814992,
      end: 1658145600,

      space: {
        id: 'aave.eth',
        name: 'Aave',
        avatar: 'ipfs://QmRKgfxSiCU3EmkN52ZaxgKvDyPFUR5DdPvnKxwyLRncKS',
      },
    }

    const proposalBeforeUpdate = await repositories.proposal.findUnique({ where: { snapshotId: proposal.id } })
    assert.equal(proposalBeforeUpdate?.title, 'Aave V3 Harmony - Freeze Reserves')
    await fastify.inject({
      method: 'POST',
      url: '/',
      payload: createPubSubMessageMock([proposal]),
    })

    const proposalAfterUpdate = await repositories.proposal.findUnique({ where: { snapshotId: proposal.id } })
    assert.equal(proposalAfterUpdate?.title, 'Aave V3 Harmony - Freeze Reserves [UPDATED]')
  })
})
