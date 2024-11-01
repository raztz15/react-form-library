import { useEffect, useRef } from "react";
import { InputType, IUseInputRendererProps } from "../interfaces";


export function useInputRenderer({ inputsGroups, firstInput, errors, handleChange }: IUseInputRendererProps) {

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const renderInputsGroups = inputsGroups.map(({ groupLabel, inputs }) => <div key={groupLabel} className="inputs--container">
        {/* TODO ---> Check what to do when there is no label */}
        {groupLabel && <h2>{groupLabel}</h2>}
        {inputs.map(({ inputType, options, required, id, validation, label, defaultValue, accept }) => {
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
                                checked={defaultValue === option}
                            />
                            <label htmlFor={`${id}--${option}`}>{option}</label>
                        </div>)}</div>
                    </div>

                case InputType.Select:
                    return <div key={id}>
                        <label htmlFor={id}>{label}:</label>
                        <select id={id} name={id} onChange={handleChange}>
                            {options?.map(option => <option key={option} value={defaultValue}>{option}</option>)}
                        </select>
                    </div>

                case InputType.File:
                    return <div key={id}>
                        <label htmlFor={id}>{label}:</label>
                        <input
                            type={inputType}
                            id={id}
                            name={id}
                            required={required}
                            onChange={handleChange}
                            accept={Array.isArray(accept) ? accept.join(',') : accept}
                        />
                        {errors[id] && <div className='input-error-message'>{validation?.errorMessage}</div>}
                    </div>

                default:
                    return <div key={id}>
                        <label htmlFor={id}>{label}:</label>
                        <input
                            value={defaultValue}
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
        })}
    </div>)

    // const renderInputs = inputs.map(({ inputType, options, required, id, validation, label, defaultValue }) => {
    //     switch (inputType) {
    //         case InputType.Radio:
    //             return <div key={id} className="radio-input">
    //                 <label htmlFor={id}>{label}:</label>
    //                 <div>{options?.map(option => <div key={option} className="radio-option">
    //                     <input
    //                         type={inputType}
    //                         id={`${id}--${option}`}
    //                         name={id}
    //                         value={option}
    //                         required={required}
    //                         onChange={handleChange}
    //                         checked={defaultValue === option}
    //                     />
    //                     <label htmlFor={`${id}--${option}`}>{option}</label>
    //                 </div>)}</div>
    //             </div>

    //         case InputType.Select:
    //             return <div key={id}>
    //                 <label htmlFor={id}>{label}:</label>
    //                 <select id={id} name={id} onChange={handleChange}>
    //                     {options?.map(option => <option key={option} value={defaultValue}>{option}</option>)}
    //                 </select>
    //             </div>

    //         default:
    //             return <div key={id}>
    //                 <label htmlFor={id}>{label}:</label>
    //                 <input
    //                     value={defaultValue}
    //                     type={inputType}
    //                     id={id}
    //                     name={id}
    //                     required={required}
    //                     onChange={handleChange}
    //                     pattern={validation?.regex?.source}
    //                     ref={firstInput.id === id ? inputRef : undefined}
    //                     style={{ borderColor: errors[id] ? 'red' : '' }}
    //                 />
    //                 {errors[id] && <div className='input-error-message'>{validation?.errorMessage}</div>}
    //             </div>
    //     }
    // })
    return renderInputsGroups
}