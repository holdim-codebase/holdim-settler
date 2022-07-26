import { PubSub } from '@google-cloud/pubsub'
import { config } from '../config'

interface AIMessage {
  seniorText: string
  configName: string
  metadata: {
    id: string
  }
}

export const queueMessage = async (message: AIMessage) => {
  const pubsub = new PubSub()
  const topic = pubsub.topic(config.pubsub.topicNameOrId)
  await topic.publishMessage({ json: message })
}
