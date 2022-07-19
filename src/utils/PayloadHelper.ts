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
const { schoolGroupFields } = require('src/domain/SchoolGroupFields')
const { areaGroupFields } = require('src/domain/AreaGroupFields')

// Property Details Groups

class PayloadHelper {
  /**
   * Will add DatesGroup, ClosingGroup, CompensationGroup, MediaGroup, ShowingGroup, RemarkGroup for Listing Data Groups
   * Will add SchoolGroup, AreaGroup for Location Data Groups
   * Will add BusinessGroup, CharacteristicGroup, EquipmentGroup, FarmingGroup, FinancialGroup, HOAGroup,
   * OccupantOwnerGroup, StructureGroup, TaxGroup, UtilitiesGroup for Property Details Group
   */
  async generateSoldsJsonDataTypePayload(dataSet: object[]): Promise<object | null>  {
    return dataSet.map((data: any) => {
      return Object.assign(data, {
        DatesGroup: this.pick(data, ...datesGroupFields),
        ClosingGroup: this.pick(data, ...closingGroupFields),
        CompensationGroup: this.pick(data, ...compensationGroupFields),
        MediaGroup: this.pick(data, ...mediaGroupFields),
        ShowingGroup: this.pick(data, ...showingGroupFields),
        RemarkGroup: this.pick(data, ...remarksGroupFields),
        SchoolGroup: this.pick(data, ...schoolGroupFields),
        AreaGroup: this.pick(data, ...areaGroupFields),
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
