import { useEffect, useRef, useState } from 'react'
import { IForm, IInput, InputType } from '../../interfaces'
import './Form.css'
import { useInputRenderer } from '../../hooks/useInputRenderer';
import { getAllNestedInputs } from '../../utils';

export const Form = ({ inputsGroups, buttons }: IForm) => {

    const [form, setForm] = useState<Record<string, string | boolean>>({});
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [allInputs] = useState<IInput[]>(getAllNestedInputs(inputsGroups));

    const inputRef = useRef<HTMLInputElement>(null)

    const inputRender = useInputRenderer({ inputsGroups, errors, handleChange, firstInput: inputsGroups[0].inputs[0] })

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

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

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value, checked, type, files, accept } = e.target as HTMLInputElement
        const file = files?.[0]


        const inputValidation = allInputs.find(input => input.id === name)?.validation

        setErrors(prevErrors => ({ ...prevErrors, [name]: null }))
        if (inputValidation) {
            const { maxFileSize } = inputValidation
            if (file && accept && maxFileSize) {
                const isValidType = (new RegExp(accept.replace(/,/g, '|')).test(file.type) || accept.split(',').some(type => file.name.endsWith(type.trim()))) &&
                    file.size / 1000000 < maxFileSize;
                if (!isValidType) {
                    const { errorMessage } = inputValidation
                    setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }))
                    e.target.value = ''
                }
            }
            else if (!inputValidation.regex?.test(value)) {
                const { errorMessage } = inputValidation
                setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }))
            } else if (type !== InputType.Checkbox) {
                setForm(prevForm => ({ ...prevForm, [name]: value }))
            } else {
                setForm(prevForm => ({ ...prevForm, [name]: checked }))
            }
        }
    }


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (Object.values(errors).some(error => error !== null) || Object.values(form).length === 0) {
            e.preventDefault()
            allInputs.forEach(({ id, validation, required }) => {
                const inputElement = document.getElementById(id) as HTMLInputElement
                const { value } = inputElement
                if (required && !value) {
                    setErrors(prevErrors => ({ ...prevErrors, [id]: 'This field is required.' }))
                } else if (validation?.regex?.test(value)) {
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
        <div className='inputs-groups--container'>{inputRender}</div>
        <div className="form-buttons--container" >
            {buttons.map(({ buttonType: type, text }) => <button key={text} type={type} onClick={(e) => getOnClickLogic(type, e)}>{text}</button>)}
        </div>
    </form>
}
