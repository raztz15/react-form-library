// Enum to define various input types supported in the form
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
    File = 'file',
    TextArea = 'textArea'
}

// Interface for input validation rules
interface IInputValidation {
    errorMessage: string; // Message to display when validation fails
    regex?: RegExp; // Regular expression for pattern matching
    min?: number; // Minimum value (for number inputs)
    max?: number; // Maximum value (for number inputs)
    options?: string[]; // Options for select or radio inputs
    maxFileSize?: number; // Maximum file size in MB for file inputs
    maxLength?: number; // Maximum character length for textarea inputs
}

// Interface representing a single input field in the form
export interface IInput {
    id: string; // Unique identifier for the input
    inputType: InputType; // Type of the input (e.g., text, checkbox, etc.)
    label: string; // Label to display for the input
    validation?: IInputValidation; // Validation rules for the input
    required?: boolean; // Indicates if the input is required
    options?: string[]; // Options for select or radio inputs
    defaultValue?: string; // Default value for the input
    accept?: string | string[]; // Acceptable file types for file inputs

}

// Interface for button properties
export interface IButton {
    text: string; // Text to display on the button
    buttonType: 'button' | 'reset' | 'submit'; // Type of the button
    onClick: () => void; // Function to call on button click
}

// Interface for input groups in the form
export interface IInpuitsGroups {
    groupLabel?: string; // Optional label for the group of inputs
    inputs: IInput[]; // Array of inputs within this group
}

// Interface representing the entire form structure
export interface IForm {
    inputsGroups: IInpuitsGroups[]; // Array of input groups
    title?: string; // Optional title for the form
    buttons: IButton[]; // Array of buttons for form actions
    submitUrl: string // URL to call the appropriate API
    successSubmitionUrl: string // New property for navigation
}

// Props interface for the useInputRenderer hook
export interface IUseInputRendererProps {
    inputsGroups: IInpuitsGroups[]; // Input groups to render
    errors: Record<string, string | boolean | null>; // Error messages for inputs
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void; // Change handler for inputs
}

export interface ISubmitResponse<T> {
    success: boolean
    message?: string
    data?: T
}