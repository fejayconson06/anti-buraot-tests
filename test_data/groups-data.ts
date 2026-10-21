import { Group } from "../data_structures/Group";

export const validGroupsData: Group[] = [
    {
        name: "Automation Test",
        defaultCurrency: "PHP",
        isPublic: false,
        members: ["Piwi", "Miko", "Katirin"],
        errorMessage: ''
    }
]

export const invalidGroupsData: Group[] = [
    {
        name: "",
        defaultCurrency: "PHP",
        isPublic: false,
        members: ["Piwi", "Miko"],
        errorMessage: "Give your group a name first."
    },
    {
        name: "No members",
        defaultCurrency: "PHP",
        isPublic: false,
        members: [],
        errorMessage: "Add a name for every member."
    }
]



