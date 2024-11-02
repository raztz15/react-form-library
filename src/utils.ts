import { IInpuitsGroups, IInput } from "./interfaces";

// Utility function to retrieve all nested input fields from input groups
export function getAllNestedInputs(inputsGroups: IInpuitsGroups[]) {
    const newArr: IInput[] = []; // Array to hold all nested inputs

    // Iterate over each input group
    inputsGroups.forEach(group => {
        const { inputs } = group; // Destructure inputs from the group
        // Check if inputs is an array and concatenate it to newArr
        if (Array.isArray(inputs)) {
            newArr.push(...inputs);
        }
    });

    return newArr; // Return the accumulated array of inputs
}

// Logic to handle button clicks
export function getOnClickLogic(
    buttonType: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    handleReset: () => void,
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
) {
    if (buttonType === 'reset') return handleReset()
    if (buttonType === 'submit') return handleSubmit(e)
}

export async function submitForm<T>(url: string, request: RequestInit): Promise<T | void> {
    try {
        const response = await fetch(url, request)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error
    }
}