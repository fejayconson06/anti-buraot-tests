import { expect, type Locator, type Page } from '@playwright/test';
import { Group } from '../data_models/Group';
import { GroupModal } from '../components/add-group-modal';

export class GroupsPage {
    readonly page: Page;
    readonly newGroupButton: Locator; 

    constructor(page:Page){
        this.page = page;
        this.newGroupButton = page.locator('#new-group-button')
    }

    async createNewGroup(group:Group){
        await this.newGroupButton.click();
        const groupModal = new GroupModal(this.page);
        await groupModal.createGroup(group);

        return groupModal
    }

    getGroupByName(name: string): Locator {
        return this.page
        .locator('.group-name-row h2')
        .filter({ hasText: name });
    }
}