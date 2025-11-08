import type { Ref } from 'vue'
import type { Validation } from '@vuelidate/core'

export class ValidationErrors {
  private validation: Ref<Validation>

  constructor(validation: Ref<Validation>) {
    this.validation = validation
  }

  isInputHasErrors(inputName: string): boolean {
    return this.validation.value[inputName].$error
  }
  getInputErrors(inputName: string): string[] {
    return this.validation.value[inputName].$errors.map((val: any) => {
      return val.$message
    })
  }
}
