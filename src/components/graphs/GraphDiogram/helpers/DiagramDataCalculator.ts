import type { IFormatData } from '../types/props'
import type { Ref } from 'vue'

export class DiagramDataCalculator {
  dataWrapper: Ref<IFormatData[]>
  sumTransactions: number = 0

  constructor(dataWrapper: Ref<IFormatData[]>) {
    this.dataWrapper = dataWrapper
  }

  generateDashoffset(): void {
    for (let i = 0; i < this.dataWrapper.value.length; i++) {
      const element = this.dataWrapper.value[i]
      if (i === 0) {
        element.strokeDashoffset = 0
      } else {
        element.strokeDashoffset =
          this.dataWrapper.value[i - 1].strokeDashoffset +
          this.dataWrapper.value[i - 1].strokeDasharray
      }
    }
  }

  generateDasharray(): void {
    this.sumTransactions = this.dataWrapper.value.reduce((calc, value) => {
      return (calc += value.amount)
    }, 0)
    this.dataWrapper.value.forEach((el) => {
      el.strokeDasharray = (100 * el.amount) / this.sumTransactions
    })
  }
}
