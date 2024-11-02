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