import type { Ref } from 'vue'

import type { IColor } from '@/utils/types/data/data.types'

export class GeneratorColors {
  private wrapperColors: Ref<IColor[]>
  private colorChosed: Ref<IColor | undefined>
  private numberColors: number

  constructor(
    wrapperColors: Ref<IColor[]>,
    colorChosed: Ref<IColor | undefined>,
    numberColors: number
  ) {
    this.wrapperColors = wrapperColors
    this.colorChosed = colorChosed
    this.numberColors = numberColors
  }

  generateRandomColor(): string {
    return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
  }

  generateColors(): void {
    for (let i = 0; i < this.numberColors; i++) {
      this.addColor(this.generateRandomColor())
    }
  }

  regenerateColors(): void {
    this.clearWrapperColors()
    this.generateColors()
    this.setDefaultColor()
  }

  setDefaultColor(): void {
    this.colorChosed.value = this.wrapperColors.value[0]
  }

  clearWrapperColors() {
    this.wrapperColors.value.length = 0
  }

  addColor(colorHex: string) {
    const color: IColor = {
      value: colorHex,
      id: 'color_' + (this.wrapperColors.value.length + 1)
    }
    this.wrapperColors.value.push(color)
  }
}
