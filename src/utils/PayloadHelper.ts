const { datesGroupFields } = require('src/domain/DatesGroupFields')
const { closingGroupFields } = require('src/domain/ClosingGroupFields')
const { compensationGroupFields } = require('src/domain/CompensationGroupFields')
const { mediaGroupFields } = require('src/domain/MediaGroupFields')
const { showingGroupFields } = require('src/domain/ShowingGroupFields')
const { remarksGroupFields } = require('src/domain/RemarksGroupFields')

class PayloadHelper {
  generateSoldsJsonDataTypePayload(dataSet: object[]): object[] {
    return dataSet.map((data: any) => {
      return Object.assign(data, {
        DatesGroup: this.pick(data, ...datesGroupFields),
        ClosingGroup: this.pick(data, ...closingGroupFields),
        CompensationGroup: this.pick(data, ...compensationGroupFields),
        MediaGroup: this.pick(data, ...mediaGroupFields),
        ShowingGroup: this.pick(data, ...showingGroupFields),
        RemarkGroupFields: this.pick(data, ...remarksGroupFields),
      })
    })
  }

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
