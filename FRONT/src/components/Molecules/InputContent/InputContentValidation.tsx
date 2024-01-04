import { TValidationProps, Validation } from '../../Atoms/Validation'

export type TValidationType = 'normal' | 'error' | 'success'

type TInputFieldValidationMessage = TValidationProps & {
  message?: string
  validationType?: TValidationType,
}

export function InputContentValidation({message, validationType, ...props}: TInputFieldValidationMessage) {
  return(
    <Validation {...props}  color={validationType} size="xs">
      {message}
    </Validation>
  )
}