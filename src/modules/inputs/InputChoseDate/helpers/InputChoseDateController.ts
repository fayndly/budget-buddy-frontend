import type { Ref } from 'vue'
import type { IDate } from '@/utils/types/interfaces'

export class InputChoseDateController {
  private dateChosedWrapper: Ref<IDate | undefined>
  private datesWrapper: Ref<IDate[]>

  constructor(dateChosedWrapper: Ref<IDate | undefined>, datesWrapper: Ref<IDate[]>) {
    this.dateChosedWrapper = dateChosedWrapper
    this.datesWrapper = datesWrapper
  }

  setValue(value: IDate): void {
    this.dateChosedWrapper.value = value
  }

  setDefaultValue(): void {
    if (this.datesWrapper.value?.length) {
      this.setValue(this.datesWrapper.value[0])
    }
  }

  addValue(value: IDate): void {
    this.datesWrapper.value.push(value)
  }

  generateDates(): void {
    const today: Date = new Date(Date.now())
    console.log(today)

    const yesterday: Date = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const twoDaysAgo: Date = new Date()
    twoDaysAgo.setDate(yesterday.getDate() - 2)

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
