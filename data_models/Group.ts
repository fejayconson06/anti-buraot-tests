export class Group{
    name: string;
    defaultCurrency: string;
    isPublic: boolean;
    members: string[];
    errorMessage: string;

    constructor(){
        this.name = "";
        this.defaultCurrency = "PHP";
        this.isPublic = true;
        this.members = ["Default One", "Default Two"];
    }
}