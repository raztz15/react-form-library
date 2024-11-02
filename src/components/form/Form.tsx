import { ChangeEvent, useEffect, useState } from 'react'
import { IForm, IInput, InputType } from '../../interfaces'
import './Form.css'
import { useInputRenderer } from '../../hooks/useInputRenderer';
import { getAllNestedInputs } from '../../utils';

// Form component for rendering input fields and handling form state
export const Form = ({ inputsGroups, buttons }: IForm): JSX.Element => {

    const [form, setForm] = useState<Record<string, string | boolean>>({}); // State to hold form values
    const [errors, setErrors] = useState<Record<string, string | null>>({}); // State to hold error messages
    const [allInputs] = useState<IInput[]>(getAllNestedInputs(inputsGroups)); // Retrieve all nested inputs from groups

    // Render inputs using the custom hook
    const inputRender = useInputRenderer({ inputsGroups, errors, handleChange, firstInput: inputsGroups[0].inputs[0] })

    // Initialize form state with default values from inputs
    useEffect(() => {
        inputsGroups.forEach(group => {
            group.inputs.forEach(input => {
                const { defaultValue } = input
                if (defaultValue) {
                    setForm(prevForm => ({ ...prevForm, [input.id]: defaultValue }))
                }
            })
        })
    }, [])

    // Handle input changes and validation
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value, checked, type, files, accept } = e.target as HTMLInputElement
        const file = files?.[0] // Get the selected file if it exists

        const inputValidation = allInputs.find(input => input.id === name)?.validation

        setErrors(prevErrors => ({ ...prevErrors, [name]: null })) // Clear previous error messages

        // Validate file type and size if a file is uploaded
        if (file && accept && inputValidation?.maxFileSize) {
            const isValidType = (new RegExp(accept.replace(/,/g, '|')).test(file.type) || accept.split(',').some(type => file.name.endsWith(type.trim()))) &&
                file.size / 1000000 < inputValidation.maxFileSize;

            // If invalid, set error and clear input value
            if (!isValidType) {
                setErrors(prevErrors => ({ ...prevErrors, [name]: inputValidation.errorMessage }))
                e.target.value = ''
            }
        }
        // Validate input value against regex if provided
        else if (inputValidation && !inputValidation.regex?.test(value)) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: inputValidation.errorMessage }))
            // Update form state based on input type
        } else if (type !== InputType.Checkbox) {
            setForm(prevForm => ({ ...prevForm, [name]: value }))
        } else {
            setForm(prevForm => ({ ...prevForm, [name]: checked }))
        }
    }

    // Handle form submission
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        // Check for errors or empty form
        if (Object.values(errors).some(error => error !== null) || Object.values(form).length === 0) {
            e.preventDefault() // Prevent submission if errors exist
            allInputs.forEach(({ id, validation, required }) => {
                const inputElement = document.getElementById(id) as HTMLInputElement
                const { value } = inputElement
                // Validate required fields
                if (required && !value) {
                    setErrors(prevErrors => ({ ...prevErrors, [id]: 'This field is required.' }))
                    // Validate against regex if provided
                } else if (validation?.regex?.test(value)) {
                    setErrors(prevErrors => ({ ...prevErrors, [id]: validation.errorMessage }))
                }
            })
        } else {
            console.log(form) // Submit the form data
        }
    }

    // Reset form state
    const handleReset = () => {
        setForm({})
        setErrors({})
    }

    // Logic to handle button clicks
    const getOnClickLogic = (buttonType: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (buttonType === 'reset') return handleReset()
        if (buttonType === 'submit') return handleSubmit(e)
    }

    return <form className="form--container">
        <div className='inputs-groups--container'>{inputRender}</div>
        <div className="form-buttons--container" >
            {buttons.map(({ buttonType: type, text }) => <button key={text} type={type} onClick={(e) => getOnClickLogic(type, e)}>{text}</button>)}
        </div>
    </form>
}
