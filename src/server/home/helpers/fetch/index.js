import { proxyFetch } from '~/src/server/common/helpers/proxy.js'
import { config } from '~/src/config/config.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { log } from 'console'

const logger = createLogger()

const askQuestion = async (question) => {
  logger.info('Fetching chat results from find API')

  const chatEndpoint = `${config.get('chatApiEndpoint')}/chat`
  logger.info(`chatEndpoint': ${chatEndpoint}`)

  const requestBody = {
    query: question
  }

  const result = await proxyFetch(chatEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })

  const data = await result?.json()

  log(data)

  if (!data) {
    logger.error('Failed to fetch chat results or invalid response structure')
    return {}
  }

  return data
}

export { askQuestion }
