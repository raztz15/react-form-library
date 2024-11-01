import { useEffect, useRef, useState } from 'react'
import { IForm } from '../../interfaces'
import './Form.css'
import { BorderColor } from '@mui/icons-material';
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
        const { name, value } = e.target
        const inputValidation = inputs.find(input => input.id === name)?.validation

        setErrors(prevErrors => ({ ...prevErrors, [name]: null }))

        if (inputValidation && !inputValidation.regex.test(value)) {
            const { errorMessage } = inputValidation
            setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }))
        } else {
            setForm(prevForm => ({ ...prevForm, [name]: value }))
        }
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log(form)
    }

    const handleReset = () => {
        setForm({})
    }

    const getOnClickLogic = (buttonType: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (buttonType === 'reset') return handleReset()
        if (buttonType === 'submit') return handleSubmit(e)
    }

    return <form className="form--container">
        <div className='inputs--container'>
            {inputs.map(({ label, inputType: type, id, validation, required }, index) => <div key={id}>
                <label htmlFor={id}>{label}: </label>
                <input
                    type={type}
                    id={id}
                    name={id}
                    required={required}
                    onChange={handleChange}
                    pattern={validation?.regex.source}
                    ref={index === 0 ? inputRef : undefined}
                    style={{ borderColor: errors[id] ? 'red' : '' }}
                />
            </div>)}
        </div>
        <div className="form-buttons--container" >
            {buttons.map(({ buttonType: type, text }) => <button key={text} type={type} onClick={(e) => getOnClickLogic(type, e)}>{text}</button>)}
        </div>
    </form>
}
