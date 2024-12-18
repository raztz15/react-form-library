import { useEffect, useRef, useState } from "react";
import { IInput, InputType, IUseInputRendererProps } from "../interfaces";

/**
 * Custom hook to render input fields based on provided input groups and handle focus management.
 *
 * @param {IUseInputRendererProps} props - The props containing input groups, first input for focusing, error states, and change handler.
 * @returns {JSX.Element[]} An array of JSX elements representing the rendered input fields.
 */
export function useInputRenderer({ inputsGroups, errors, handleChange, form }: IUseInputRendererProps): JSX.Element[] {
    const [selectedRadio, setSelectedRadio] = useState('');

    useEffect(() => {
        inputsGroups.forEach(group => {
            if (group.inputs) {
                const radioInputValue = group.inputs.find(input => input.inputType === InputType.Radio)?.defaultValue
                if (radioInputValue) setSelectedRadio(radioInputValue.toString())
            }
            return group
        })
    }, [])

    // Reference to the first input element for auto-focusing
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

    const firstInputToRender: IInput = inputsGroups[0].inputs[0]

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
                            value={form[id] ? form[id].toString() : undefined}
                            required={required}
                            onChange={handleChange}
                            maxLength={validation?.maxLength}
                            style={{ borderColor: errors[id] ? 'red' : '' }}
                            ref={firstInputToRender.id === id ? inputRef as React.RefObject<HTMLTextAreaElement> : undefined}
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
                                onChange={(e) => {
                                    handleChange(e);
                                    setSelectedRadio(e.target.value);
                                }}
                                checked={selectedRadio === option}
                            />
                            <label htmlFor={`${id}--${option}`}>{option}</label>
                        </div>)}</div>
                    </div>

                case InputType.Select:
                    // Render a select input
                    return <div key={id}>
                        <label htmlFor={id}>{label}:</label>
                        <select id={id} name={id} onChange={handleChange} value={defaultValue || form[id] ? form[id].toString() : undefined}>
                            {options?.map(option => <option key={option}>{option}</option>)}
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
                            value={defaultValue || form[id] ? form[id]?.toString() : ''}
                            type={inputType}
                            id={id}
                            name={id}
                            required={required}
                            onChange={handleChange}
                            pattern={validation?.regex?.source}
                            ref={firstInputToRender.id === id ? inputRef as React.RefObject<HTMLInputElement> : undefined}
                            checked={defaultValue || form[id] ? Boolean(form[id]) : false}
                            style={{ borderColor: errors[id] ? 'red' : '' }}
                        />
                        {errors[id] && <div className='input-error-message'>{validation?.errorMessage}</div>}
                    </div>
            }
        })}
    </div>)

    return renderInputsGroups
}