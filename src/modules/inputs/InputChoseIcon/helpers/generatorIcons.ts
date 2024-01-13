import type { Ref } from 'vue'

import { materialIcons } from '@/assets/mocks/MaterialIcons'

import type { IIcon } from '@/utils/types/data/data.types'

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export class GeneratorIcons {
  private wrapperIcons: Ref<IIcon[]>
  private iconChosed: Ref<IIcon | null>
  private numberIcons: number

  constructor(wrapperIcons: Ref<IIcon[]>, iconChosed: Ref<IIcon | null>, numberIcons: number) {
    this.wrapperIcons = wrapperIcons
    this.iconChosed = iconChosed
    this.numberIcons = numberIcons
  }

  getRandomIcon(): {
    value: string
    iconName: string
  } {
    const randomIcon = materialIcons[getRandomInt(0, materialIcons.length)]
    return {
      value: randomIcon,
      iconName: randomIcon
    }
  }

  generateIcons(): void {
    this.addIcon(null, 'Нет')
    for (let i = 0; i < this.numberIcons; i++) {
      const icon = this.getRandomIcon()
      this.addIcon(icon.value, icon.iconName)
    }
  }

  regenerateColors(): void {
    this.clearWrapperIcons()
    this.generateIcons()
    this.setDefaultIcon()
  }

  setDefaultIcon(): void {
    this.iconChosed.value = this.wrapperIcons.value[0]
  }

  clearWrapperIcons() {
    this.wrapperIcons.value.length = 0
  }

  addIcon(value: string | null, iconName: string) {
    const icon: IIcon = {
      value,
      iconName,
      id: 'icon_' + (this.wrapperIcons.value.length + 1)
    }
    this.wrapperIcons.value.push(icon)
  }
}
