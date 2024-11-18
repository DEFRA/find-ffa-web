import {
  homeControllerGet,
  homeControllerPost
} from '~/src/server/home/controller.js'

export const home = {
  plugin: {
    name: 'home',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/',
          ...homeControllerGet
        },
        {
          method: 'POST',
          path: '/',
          ...homeControllerPost
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
