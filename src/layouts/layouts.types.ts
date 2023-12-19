export enum AppLayoutsEnum {
  default = 'default',
  withoutNavbar = 'withoutNavbar'
}

export const AppLayoutToFileMap: Record<AppLayoutsEnum, string> = {
  default: 'LayoutWithNavbar.vue',
  withoutNavbar: 'LayoutWithoutNavbar.vue'
}
