import { useEffect, useRef, useState } from 'react'
import { IForm } from '../../interfaces'
import './Form.css'
export const Form = ({ inputs, buttons }: IForm) => {

    const [form, setForm] = useState<Record<string, string | boolean>>({});

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prevForm => ({ ...prevForm, [name]: value }))
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
                />
            </div>)}
        </div>
        <div className="form-buttons--container" >
            {buttons.map(({ buttonType: type, text }) => <button key={text} type={type}>{text}</button>)}
        </div>
    </form>
}
