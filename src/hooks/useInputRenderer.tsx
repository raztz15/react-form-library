import { useEffect, useRef } from "react";
import { InputType, IUseInputRendererProps } from "../interfaces";


export function useInputRenderer({ inputs, firstInput, errors, handleChange }: IUseInputRendererProps) {

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const renderInputs = inputs.map(({ inputType, options, required, id, validation, label }) => {
        switch (inputType) {
            case InputType.Radio:
                return <div key={id} className="radio-input">
                    <label htmlFor={id}>{label}:</label>
                    <div>{options?.map(option => <div key={option} className="radio-option">
                        <input
                            type={inputType}
                            id={`${id}--${option}`}
                            name={id}
                            value={option}
                            required={required}
                            onChange={handleChange}

                        />
                        <label htmlFor={`${id}--${option}`}>{option}</label>
                    </div>)}</div>
                </div>

            case InputType.Select:
                return <div key={id}>
                    <label htmlFor={id}>{label}:</label>
                    <select id={id} name={id} onChange={handleChange}>
                        {options?.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                </div>

            default:
                return <div key={id}>
                    <label htmlFor={id}>{label}:</label>
                    <input
                        type={inputType}
                        id={id}
                        name={id}
                        required={required}
                        onChange={handleChange}
                        pattern={validation?.regex?.source}
                        ref={firstInput.id === id ? inputRef : undefined}
                        style={{ borderColor: errors[id] ? 'red' : '' }}
                    />
                    {errors[id] && <div className='input-error-message'>{validation?.errorMessage}</div>}
                </div>
        }
    })
    return renderInputs
}