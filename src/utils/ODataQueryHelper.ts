import buildQuery from 'odata-query'

/**
 * Create single or multiple in query filter based on propertyValues Array Length
 */
class ODataQueryHelper {
  createMultipleInQueryFilter(
    propertyName: string,
    propertyValues: Array<string | number>
  ): string {
    const conditions: Array<any> = []
    propertyValues.map((propertyValue) => {
      conditions.push({ [propertyName]: propertyValue })
    })

    return buildQuery({ filter: { or: conditions } })
  }
}

module.exports = ODataQueryHelper
