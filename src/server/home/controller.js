import Joi from 'joi'
import { askQuestion } from './helpers/fetch/index.js'

const homeControllerGet = {
  handler(_request, h) {
    return h.view('home/index', {
      pageTitle: 'Home',
      heading: 'Home'
    })
  }
}

const homeControllerPost = {
  options: {
    validate: {
      payload: Joi.object({
        search: Joi.string().min(3).max(30)
      }),
      failAction: (request, h, error) => {
        return h
          .view('home/index', {
            name: request.payload.name,
            errorMessage: {
              text: error.details[0].message
            }
          })
          .takeover()
      }
    }
  },
  async handler(request, h) {
    const search = request.payload.search
    const answerResults = await askQuestion(search)

    return h.view('home/index', {
      pageTitle: 'Home',
      heading: 'Home',
      answerResults,
      search
    })
  }
}

export { homeControllerGet, homeControllerPost }
