import type { IDataTransactions } from '@/utils/types/interfaces'

export class DiagramDataCalculator {
  private transactionsData: IDataTransactions[]
  sumTransactions: number = 0

  constructor(transactionsData: IDataTransactions[]) {
    this.transactionsData = transactionsData
  }

  generateDashoffset(): void {
    for (let i = 0; i < this.transactionsData.length; i++) {
      const element = this.transactionsData[i]
      if (i === 0) {
        element.strokeDashoffset = 0
      } else {
        element.strokeDashoffset =
          this.transactionsData[i - 1].strokeDashoffset +
          this.transactionsData[i - 1].strokeDasharray
      }
    }
  }

  generateDasharray(): void {
    this.sumTransactions = this.transactionsData.reduce((calc, value) => {
      return (calc += value.count)
    }, 0)
    this.transactionsData.forEach((el) => {
      el.strokeDasharray = (100 * el.count) / this.sumTransactions
    })
  }
}
