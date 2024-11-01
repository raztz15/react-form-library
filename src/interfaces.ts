export enum InputType {
    Text = 'text',
    Checkbox = 'checkbox',
    Date = 'date',
    Email = 'email',
    Number = 'number',
    Password = 'password',
    Radio = 'radio',
    Tel = 'tel',
    Select = 'select'
}

export interface IInput {
    id: string
    inputType: InputType
    label: string
    validation?: { regex: RegExp, errorMessage: string }
    required?: boolean
    options?: string[]
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

export interface IUseInputRendererProps {
    inputs: IInput[]
    firstInput: IInput
    errors: Record<string, string | boolean | null>
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}