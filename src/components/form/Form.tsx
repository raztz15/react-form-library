import { ChangeEvent, useEffect, useState } from 'react'
import { IForm, IInput, InputType } from '../../interfaces'
import './Form.css'
import { useInputRenderer } from '../../hooks/useInputRenderer';
import { getAllNestedInputs, getOnClickLogic, submitForm } from '../../utils';
import { useNavigate } from 'react-router-dom'

// Form component for rendering input fields and handling form state
export const Form = ({ inputsGroups, buttons, submitUrl, successSubmitionUrl }: IForm): JSX.Element => {

    const [form, setForm] = useState<Record<string, string | boolean>>({}); // State to hold form values
    const [errors, setErrors] = useState<Record<string, string | null>>({}); // State to hold error messages
    const [allInputs] = useState<IInput[]>(getAllNestedInputs(inputsGroups)); // Retrieve all nested inputs from groups
    const [submitError, setSubmitError] = useState<string>('');

    const navigate = useNavigate()

    // Render inputs using the custom hook
    const inputRender = useInputRenderer({ inputsGroups, errors, handleChange })

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
    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        e.preventDefault()

        // Reset previous errors
        setSubmitError('');

        const currErrors: Record<string, string> = {}
        allInputs.forEach(input => {
            if (input.required) {
                const inputElement = document.getElementById(input.id) as HTMLInputElement
                if (inputElement && !inputElement.value) {
                    currErrors[inputElement.id] = input.validation?.errorMessage || 'This field is required.'
                }
                if (inputElement?.type === InputType.File && !inputElement.files?.[0]) {
                    currErrors[inputElement.id] = input.validation?.errorMessage || 'A file is required.'
                }
                else if (!inputElement.value.match(input.validation?.regex || /.+/)) {
                    currErrors[inputElement?.id] = input.validation?.errorMessage || 'Invalid input.'
                }
            }
        })

        setErrors(currErrors)
        // Check for errors or empty form
        if (Object.keys(currErrors).length > 0) {
            setErrors(currErrors)
            return
        } else {
            try {
                const response = await submitForm(submitUrl, {
                    body: JSON.stringify(form),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response) {
                    // Navigate to the success URL if provided
                    navigate(successSubmitionUrl)
                } else {
                    console.warn('Success URL is not defined.')
                    setSubmitError('Submission failed. Please try again.')
                }
            } catch (error) {
                console.error('Form submission error: ', error)
                setSubmitError('An error occurred during submission.')
            }
        }
    }

    // Reset form state
    const handleReset = () => {
        setForm({})
        setErrors({})
    }

    return <form className="form--container">
        <div className='inputs-groups--container'>{inputRender}</div>
        {submitError && <div className='submission-error-message'>{submitError}</div>}
        <div className="form-buttons--container" >
            {buttons.map(({ buttonType: type, text }) => <button key={text} type={type} onClick={(e) => getOnClickLogic(type, e, handleReset, handleSubmit)}>{text}</button>)}
        </div>
    </form>
}
