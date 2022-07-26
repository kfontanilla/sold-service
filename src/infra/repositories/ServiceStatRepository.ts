import { ServiceDetail } from '../../domain/ServiceDetail'
import { BaseRDSRepository } from './base/BaseRDSRepository'
import { ImportConfig } from '../../domain/ImportConfig'

class ServiceStatRepository extends BaseRDSRepository {
  [property: string]: any
  constructor({ ServiceStatModel, logger }: any) {
    super(ServiceStatModel)
    this.logger = logger
  }

  async setServiceStat(ServiceDetail: ServiceDetail) {
    try {
      return await this.save(ServiceDetail)
    } catch (error) {
      throw error
    }
  }

  /**
   * Update service stats on every run
   *
   * @param  {ImportConfig} importData
   *
   * @returns {ServiceDetail} serviceDetail
   */

  async getLatestServiceStats(importData: ImportConfig) {
    try {
      const options = {
        where: { ImportConfigId: importData.Id },
        order: [['LastSuccessfulRun', 'DESC'], ['LastScheduledRun', 'DESC']],
      }
      const serviceStatsRecord = await this.getOne(options)
      return serviceStatsRecord
    } catch (error: any) {
      const errMessage = error.name
      this.logger.error({
        message: 'getLatestServiceStats_ERROR',
        errMessage,
      })
    }
  }
}

module.exports = ServiceStatRepository
