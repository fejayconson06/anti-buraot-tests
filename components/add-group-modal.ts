import { expect, type Locator, type Page } from '@playwright/test';
import { Group } from '../data_models/Group';

export class GroupModal{
    readonly page: Page;
    readonly groupNameField: Locator;
    readonly defaulCurrencyDpdown: Locator;
    readonly publicRadio: Locator;
    readonly privateRadio: Locator;
    readonly saveBtn: Locator;
    readonly addMemberLink: Locator;
    readonly errorLabel: Locator;
    readonly createNewBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.groupNameField = page.locator('#group-name')
        this.defaulCurrencyDpdown = page.locator('#group-currency')
        this.publicRadio = page.locator('input[value="public"]')
        this.privateRadio = page.locator('input[value="private"]')
        this.saveBtn = page.getByText('Save group ')
        this.addMemberLink = page.locator('.add-member-button')
        this.errorLabel = page.locator('#group-error')
        this.createNewBtn = page.locator('#create-new-group')
    }

    async createGroup(group:Group){
        await this.createNewBtn.click()
        await this.groupNameField.fill(group.name)
        await this.defaulCurrencyDpdown.selectOption(group.defaultCurrency)
        
        if (group.isPublic){
            await this.publicRadio.click()
        }

        for (let i=0; i<group.members.length; i++){
            const memberNumber = i + 1

            if (memberNumber > 2){
                await this.addMemberLink.click()
            }

            await this.page
            .locator(`input[aria-label="Member ${memberNumber} name"]`)
            .fill(group.members[i])
        }

        await this.saveBtn.click()
    }
}