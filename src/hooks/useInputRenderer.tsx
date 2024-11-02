import { useEffect, useRef } from "react";
import { InputType, IUseInputRendererProps } from "../interfaces";

/**
 * Custom hook to render input fields based on provided input groups and handle focus management.
 *
 * @param {IUseInputRendererProps} props - The props containing input groups, first input for focusing, error states, and change handler.
 * @returns {JSX.Element[]} An array of JSX elements representing the rendered input fields.
 */
export function useInputRenderer({ inputsGroups, firstInput, errors, handleChange }: IUseInputRendererProps): JSX.Element[] {

    // Reference to the first input element for auto-focusing
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

    useEffect(() => {
        // Focus the first input element if it exists
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    // Render input groups
    const renderInputsGroups = inputsGroups.map(({ groupLabel, inputs }) => <div key={groupLabel} className="inputs--container">
        {/* TODO ---> Check what to do when there is no label */}
        {/* Render group label if it exists */}
        {groupLabel && <h2>{groupLabel}</h2>}
        {inputs.map(({ inputType, options, required, id, validation, label, defaultValue, accept }) => {
            switch (inputType) {
                case InputType.TextArea:
                    // Render a textarea input
                    return <div className="textarea-input" key={id}>
                        <label htmlFor={id}>{label}:</label>
                        <textarea
                            name={id}
                            id={id}
                            required={required}
                            onChange={handleChange}
                            maxLength={validation?.maxLength}
                            style={{ borderColor: errors[id] ? 'red' : '' }}
                            ref={firstInput.id === id ? inputRef as React.RefObject<HTMLTextAreaElement> : undefined}
                        />
                    </div>
                case InputType.Radio:
                    // Render radio input options
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
                    // Render a select input
                    return <div key={id}>
                        <label htmlFor={id}>{label}:</label>
                        <select id={id} name={id} onChange={handleChange}>
                            {options?.map(option => <option key={option} value={defaultValue}>{option}</option>)}
                        </select>
                    </div>

                case InputType.File:
                    // Render file input
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
                    // Render default input types (text, number, etc.)
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
                            ref={firstInput.id === id ? inputRef as React.RefObject<HTMLInputElement> : undefined}
                            style={{ borderColor: errors[id] ? 'red' : '' }}
                        />
                        {errors[id] && <div className='input-error-message'>{validation?.errorMessage}</div>}
                    </div>
            }
        })}
    </div>)

    return renderInputsGroups
}