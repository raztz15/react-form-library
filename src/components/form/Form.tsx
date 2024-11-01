import { useEffect, useRef, useState } from 'react'
import { IForm, InputType } from '../../interfaces'
import './Form.css'

export const Form = ({ inputs, buttons }: IForm) => {

    const [form, setForm] = useState<Record<string, string | boolean>>({});
    const [errors, setErrors] = useState<Record<string, string | null>>({});

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target

        const inputValidation = inputs.find(input => input.id === name)?.validation

        setErrors(prevErrors => ({ ...prevErrors, [name]: null }))

        if (inputValidation && !inputValidation.regex.test(value)) {
            const { errorMessage } = inputValidation
            setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }))
        } else if (type !== InputType.Checkbox) {
            setForm(prevForm => ({ ...prevForm, [name]: value }))
        } else {
            setForm(prevForm => ({ ...prevForm, [name]: checked }))
        }
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (Object.values(errors).some(error => error !== null)) {
            e.preventDefault()
            inputs.forEach(({ id, validation, required }) => {
                const inputElement = document.getElementById(id) as HTMLInputElement
                const { value } = inputElement
                if (required && !value) {
                    setErrors(prevErrors => ({ ...prevErrors, [id]: 'This field is required.' }))
                } else if (validation?.regex.test(value)) {
                    setErrors(prevErrors => ({ ...prevErrors, [id]: validation.errorMessage }))
                }
            })
        } else if (Object.values(errors).every(error => error !== null)) {
            console.log(form)
        }
    }

    const handleReset = () => {
        setForm({})
        setErrors({})
    }

    const getOnClickLogic = (buttonType: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (buttonType === 'reset') return handleReset()
        if (buttonType === 'submit') return handleSubmit(e)
    }

    return <form className="form--container">
        <div className='inputs--container'>
            {inputs.map(({ label, inputType: type, id, validation, required, options }, index) => <div key={id}>
                <label htmlFor={id}>{label}: </label>
                {type !== InputType.Select ? <input
                    type={type}
                    id={id}
                    name={id}
                    required={required}
                    onChange={handleChange}
                    pattern={validation?.regex.source}
                    ref={index === 0 ? inputRef : undefined}
                    style={{ borderColor: errors[id] ? 'red' : '' }}
                /> : <select id={id} name={id}>
                    {options?.map(option => <option key={option}>{option}</option>)}
                </select>}
                {errors[id] && <div className='input-error-message'>{validation?.errorMessage}</div>}
            </div>)}
        </div>
        <div className="form-buttons--container" >
            {buttons.map(({ buttonType: type, text }) => <button key={text} type={type} onClick={(e) => getOnClickLogic(type, e)}>{text}</button>)}
        </div>
    </form>
}
