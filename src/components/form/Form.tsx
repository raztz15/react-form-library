import { useRef } from 'react'
import { IForm } from '../../interfaces'
import './Form.css'
export const Form = ({ inputs, buttons }: IForm) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = () => {

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
