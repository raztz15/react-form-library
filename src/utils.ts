import { IInpuitsGroups, IInput } from "./interfaces";

export function getAllNestedInputs(inputsGroups: IInpuitsGroups[]) {
    const newArr: IInput[] = []

    inputsGroups.forEach(group => {
        const { inputs } = group
        if (Array.isArray(inputs)) {
            newArr.push(...inputs)
        }
    })

    return newArr
}