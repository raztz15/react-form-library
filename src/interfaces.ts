export enum InputType {
    Text = 'text',
    Checkbox = 'checkbox',
    Date = 'date',
    Email = 'email',
    Number = 'number',
    Password = 'password',
    Radio = 'radio',
    Tel = 'tel',
    Select = 'select',
    File = 'file'
}

interface IInputValidation {
    errorMessage: string
    regex?: RegExp
    min?: number
    max?: number
    options?: string[]
}

export interface IInput {
    id: string
    inputType: InputType
    label: string
    validation?: IInputValidation
    required?: boolean
    options?: string[]
    defaultValue?: string
    accept?: string | string[]
}

export interface IButton {
    text: string
    buttonType: 'button' | 'reset' | 'submit'
    onClick: () => void
}

export interface IInpuitsGroups {
    groupLabel?: string
    inputs: IInput[]
}

export interface IForm {
    inputsGroups: IInpuitsGroups[]
    title?: string
    buttons: IButton[]
}

export interface IUseInputRendererProps {
    inputsGroups: IInpuitsGroups[]
    firstInput: IInput
    errors: Record<string, string | boolean | null>
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}