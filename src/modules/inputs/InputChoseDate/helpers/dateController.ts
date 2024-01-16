import type { Ref } from 'vue'
import type { IDate } from '@/utils/types/data/data.types'

export class DateController {
  private dateChosedWrapper: Ref<IDate | null>
  private datesWrapper: Ref<IDate[]>

  constructor(dateChosedWrapper: Ref<IDate | null>, datesWrapper: Ref<IDate[]>) {
    this.dateChosedWrapper = dateChosedWrapper
    this.datesWrapper = datesWrapper
  }

  setValue(value: IDate): void {
    this.dateChosedWrapper.value = value
  }

  setDefaultDate(): void {
    if (this.datesWrapper.value?.length) {
      this.setValue(this.datesWrapper.value[0])
    }
  }

  addValue(value: IDate): void {
    this.datesWrapper.value.push(value)
  }

  clearWrapperDates() {
    this.datesWrapper.value.length = 0
  }

  addDate(date: Date, text: string | null) {
    if (!text) {
      text = date.getFullYear().toString()
    }
    const ddate: IDate = {
      date,
      text,
      id: 'date_' + (this.datesWrapper.value.length + 1)
    }
    this.datesWrapper.value.push(ddate)
  }

  generateDates(): void {
    const today: Date = new Date(Date.now())

    const yesterday: Date = new Date(Date.now())
    yesterday.setDate(yesterday.getDate() - 1)

    const twoDaysAgo: Date = new Date(Date.now())
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

    const dates: IDate[] = [
      {
        date: today,
        text: 'Сегодня',
        id: 'today'
      },
      {
        date: yesterday,
        text: 'Вчера',
        id: 'yesterday'
      },
      {
        date: twoDaysAgo,
        text: 'Позавчера',
        id: 'twoDaysAgo '
      }
    ]

    this.datesWrapper.value.push(...dates)
  }
}
