import { IButton, IInpuitsGroups, InputType } from "../../interfaces"

export const title = 'Form Factory'



export const inputsGroups: IInpuitsGroups[] = [
    {
        groupLabel: 'Form1',
        inputs: [
            {
                id: 'message',
                inputType: InputType.TextArea,
                label: 'Message'
            },
            {
                id: 'address',
                inputType: InputType.Text,
                label: "Address",
                validation: {
                    regex: /^[A-Z][a-zA-Z]*([-'\s][A-Za-z]+)*$/,
                    errorMessage: 'Name must start with a capital letter, be at least 2 letters, and contain only alphabetical characters.'
                },
                required: true

            },
            {
                id: 'cvFile',
                inputType: InputType.File,
                label: 'Uplaod Resume',
                required: true,
                accept: [".pdf", '.doc', 'docx'],
                validation: {
                    errorMessage: 'Not a valid file!',
                    maxFileSize: 7
                },
            }
        ]
    },
    {
        groupLabel: 'Form2',
        inputs: [
            {
                id: 'name',
                inputType: InputType.Text,
                label: "Name",
                validation: {
                    regex: /^[A-Z][a-zA-Z]*([-'\s][A-Za-z]+)*$/,
                    errorMessage: 'Name must start with a capital letter, be at least 2 letters, and contain only alphabetical characters.'
                },
                required: true
            },
            {
                id: 'lastName',
                inputType: InputType.Text,
                label: "Last Name",
                validation: {
                    regex: /^[A-Z][a-zA-Z]*([-'\s][A-Za-z]+)*$/,
                    errorMessage: 'Last name must start with a capital letter, be at least 2 letters, and contain only alphabetical characters.'
                },
                required: true
            },
            {
                id: 'email',
                inputType: InputType.Email,
                label: "Email",
                required: true,
                validation: {
                    regex: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                    errorMessage: 'Please enter a valid email address.'
                }
            },
            {
                id: 'username',
                inputType: InputType.Text,
                label: "Username",
                validation: {
                    regex: /^[a-zA-Z0-9]{3,15}$/,
                    errorMessage: 'Username must be 3-15 characters long and contain only letters and numbers.'
                },
                required: true
            },
            {
                id: 'phone',
                inputType: InputType.Tel,
                label: "Phone",
                validation: {
                    regex: /^05[2-9]-?\d{7}$/,
                    errorMessage: 'Phone number must be a valid Israeli mobile number starting with "05" and contain exactly 10 digits.'
                },
                required: true
            },
            {
                id: 'birthday',
                inputType: InputType.Date,
                label: "Birthday",
            },
            {
                id: 'age',
                inputType: InputType.Number,
                label: "Age",
            },
            {
                id: 'gender',
                inputType: InputType.Select,
                label: "Gneder",
                options: ['Male', 'Female', 'Non-binary']
            },
            {
                id: 'getEmails',
                inputType: InputType.Checkbox,
                label: "Get Emails",
                defaultValue: true
            },
            {
                id: "userExperience",
                inputType: InputType.Radio,
                label: "Experience",
                options: ['Excellent', 'Good', 'Poor'],
                defaultValue: 'Good'
            }
        ]
    }
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