import { IButton, IInput } from "../../interfaces"

export const inputs: IInput[] = [
    {
        id: 'name',
        inputType: "text",
        label: "Name",
        validation: {
            regex: /^[A-Z][a-zA-Z]*([-'\s][A-Za-z]+)*$/,
            errorMessage: 'Name must start with a capital letter, be at least 2 letters, and contain only alphabetical characters.'
        },
        required: true
    },
    {
        id: 'lastName',
        inputType: "text",
        label: "Last Name",
        validation: {
            regex: /^[A-Z][a-zA-Z]*([-'\s][A-Za-z]+)*$/,
            errorMessage: 'Last name must start with a capital letter, be at least 2 letters, and contain only alphabetical characters.'
        },
        required: true
    },
    {
        id: 'email',
        inputType: "email",
        label: "Email",
        required: true,
        validation: {
            regex: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
            errorMessage: 'Please enter a valid email address.'
        }
    },
    {
        id: 'username',
        inputType: "text",
        label: "Username",
        validation: {
            regex: /^[a-zA-Z0-9]{3,15}$/,
            errorMessage: 'Username must be 3-15 characters long and contain only letters and numbers.'
        },
        required: true
    },
    {
        id: 'phone',
        inputType: "tel",
        label: "Phone",
        validation: {
            regex: /^05[2-9]-?\d{7}$/,
            errorMessage: 'Phone number must be a valid Israeli mobile number starting with "05" and contain exactly 10 digits.'
        },
        required: true
    },
    {
        id: 'birthday',
        inputType: "date",
        label: "Birthday",
    },
    {
        id: 'age',
        inputType: "number",
        label: "Age",
    },
]

export const buttons: IButton[] = [
    {
        buttonType: 'reset',
        text: "Clear",
        onClick: () => { }
    },
    {
        buttonType: 'submit',
        text: "Submit",
        onClick: () => { }
    },
]