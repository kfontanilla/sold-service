const { Router } = require('express')
import container from '../../../container'

const routes = () => {
  // Initialize router
  const router = new Router()

  router.get('/solds/full/:ImportId', (...args: any) =>
    /* 
        #swagger.description = 'Full Data Extraction of Solds'
        #swagger.responses[200] = {
            description: 'Web Api feed results',
    } */
    container.resolve('GetSoldData').execute(...args)
  )

  router.get('/solds/incremental/:ImportId', (...args: any) =>
  /* 
      #swagger.description = 'Incremental Data Extraction of Solds'
      #swagger.responses[200] = {
          description: 'Web Api feed results',
  } */
  container.resolve('GetSoldData').execute(...args)
)

  router.get('/solds/getimportconfig/:ImportId', (...args: any) =>
    /*  
        #swagger.description = 'Fetch Import Config'
        #swagger.responses[200] = {
            description: 'Database record found',
        } */
    container.resolve('GetImportConfig').execute(...args)
  )
  // Show available endpoints in the terminal
  return router
}

module.exports = routes
