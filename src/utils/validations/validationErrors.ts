import type { Ref } from 'vue'
import type { Validation } from '@vuelidate/core'

export class ValidationErrors {
  private validation: Ref<Validation>

  constructor(validation: Ref<Validation>) {
    this.validation = validation
  }

  isInputHasErrors(inputName: string) {
    return Boolean(this.validation.value[inputName].$errors.length)
  }
  getInputErrors(inputName: string): string[] {
    return this.validation.value[inputName].$errors.map((val: any) => {
      return val.$message
    })
  }
}
