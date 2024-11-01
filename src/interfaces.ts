export interface IInput {
    id: string
    inputType: 'text' | 'checkbox' | 'date' | 'email' | 'number' | 'password' | 'radio' | 'tel',
    label: string
    validation?: { regex: RegExp, errorMessage: string }
    required?: boolean
}

export interface IButton {
    text: string
    buttonType: 'button' | 'reset' | 'submit'
    onClick: () => void
}

export interface IForm {
    inputs: IInput[]
    buttons: IButton[]
}