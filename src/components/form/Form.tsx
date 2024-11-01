import { useEffect, useRef, useState } from 'react'
import { IForm, InputType } from '../../interfaces'
import './Form.css'
import { useInputRenderer } from '../../hooks/useInputRenderer';

export const Form = ({ title, inputs, buttons }: IForm) => {

    const [form, setForm] = useState<Record<string, string | boolean>>({});
    const [errors, setErrors] = useState<Record<string, string | null>>({});

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, checked, type } = e.target as HTMLInputElement

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

    const inputRender = useInputRenderer({ inputs, errors, handleChange, firstInput: inputs[0] })


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (Object.values(errors).some(error => error !== null) || Object.values(form).length === 0) {
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
        } else {
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
        {title && <h2>{title}</h2>}
        <div className='inputs--container'>
            {inputRender}
        </div>
        <div className="form-buttons--container" >
            {buttons.map(({ buttonType: type, text }) => <button key={text} type={type} onClick={(e) => getOnClickLogic(type, e)}>{text}</button>)}
        </div>
    </form>
}
