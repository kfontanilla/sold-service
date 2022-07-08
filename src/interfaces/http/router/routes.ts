const { Router } = require('express')
import container from '../../../container'

const routes = () => {
  // Initialize router
  const router = new Router()

  router.get('/', (req: any, res: any) => {
    res.send('Endpoint Reached!')
  })

  router.get('/solds/:LegacyImportId', (...args: any) =>
    container.resolve('GetSoldData').execute(...args)
  )

  router.get('/importconfig/:LegacyImportId', (...args: any) =>
    container.resolve('GetImportConfig').execute(...args)
  )
  // Show available endpoints in the terminal
  return router
}

module.exports = routes
