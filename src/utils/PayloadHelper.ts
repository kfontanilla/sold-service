// Listing Data Groups
const { datesGroupFields } = require('src/domain/DatesGroupFields')
const { closingGroupFields } = require('src/domain/ClosingGroupFields')
const {
  compensationGroupFields,
} = require('src/domain/CompensationGroupFields')
const { mediaGroupFields } = require('src/domain/MediaGroupFields')
const { showingGroupFields } = require('src/domain/ShowingGroupFields')
const { remarksGroupFields } = require('src/domain/RemarksGroupFields')

// Location Data Groups
const { schoolGroupFields } =  require('src/domain/SchoolGroupFields')
const { areaGroupFields } =  require('src/domain/AreaGroupFields')

class PayloadHelper {
  /**
   * Will add DatesGroup, ClosingGroup, CompensationGroup, MediaGroup, ShowingGroup, RemarkGroup to the submitted dataset
   */
  generateSoldsListingDataJsonDataTypePayload(dataSet: object[]): object[] {
    return dataSet.map((data: any) => {
      return Object.assign(data, {
        DatesGroup: this.pick(data, ...datesGroupFields),
        ClosingGroup: this.pick(data, ...closingGroupFields),
        CompensationGroup: this.pick(data, ...compensationGroupFields),
        MediaGroup: this.pick(data, ...mediaGroupFields),
        ShowingGroup: this.pick(data, ...showingGroupFields),
        RemarkGroup: this.pick(data, ...remarksGroupFields),
      })
    })
  }

  /**
   * Will add SchoolGroup, AreaGroup, to the submitted dataset
   */
  generateSoldsLocationDataJsonDataTypePayload(dataSet: object[]): object[] {
    return dataSet.map((data: any) => {
      return Object.assign(data, {
        SchoolGroup: this.pick(data, ...datesGroupFields),
        AreaGroup: this.pick(data, ...closingGroupFields),
      })
    })
  }

    /**
   * Will add BusinessGroup, CharacteristicGroup, EquipmentGroup, FarmingGroup, FinancialGroup, HOAGroup, OccupantOwnerGroup, StructureGroup, TaxGroup, UtilitiesGroup to the submitted dataset
   */
     generateSoldsPropertyDetailsDataJsonDataTypePayload(dataSet: object[]): object[] {
      return dataSet.map((data: any) => {
        return Object.assign(data, {
          SchoolGroup: this.pick(data, ...datesGroupFields),
          AreaGroup: this.pick(data, ...closingGroupFields),
        })
      })
    }

  /**
   * Gets the same parameters on object based on keys provided.
   */
  pick<T, K extends keyof T>(object: T, ...keys: K[]): Pick<T, K> {
    return keys.reduce(
      (previousValue, currentValue) => (
        (previousValue[currentValue] = object[currentValue]), previousValue
      ),
      {} as Pick<T, K>
    )
  }
}

module.exports = PayloadHelper
