import { expect, type Locator, type Page } from '@playwright/test';
import { Group } from '../data_models/Group';
import { GroupModal } from './components/add-group-modal';

export class GroupsPage {
    readonly page: Page;
    readonly newGroupButton: Locator; 
    readonly loadingIndicator: Locator;
    readonly groupCards: Locator;

    constructor(page:Page){
        this.page = page;
        this.newGroupButton = page.locator('#new-group-button')
        this.loadingIndicator = page.locator('.firebase-empty-state')
        this.groupCards = page.locator('.group-card')
    }

    async goTo(){
        await this.page.goto('/');

        await this.newGroupButton.waitFor({
            state: 'visible',
            timeout: 10000
        })
    }

    async createNewGroup(group:Group){
        await this.newGroupButton.click();
        const groupModal = new GroupModal(this.page);
        await groupModal.createGroup(group);

        return groupModal
    }

    async deleteGroup(group: Group){
        const gName = this.getGroupByName(group.name)
        await gName.locator('..').locator('.delete-group-button').click();
        await this.page.locator('#confirm-delete').click();
      
        await gName.waitFor({
            state: 'detached',
        })
    }

    getGroupByName(name: string): Locator {
        return this.page
        .locator('.group-card')
        .filter(
            {
                has: this.page.locator('h2', { hasText: name })
            })
    }

    getGroupPrivateLink(group: Group): Locator {
        const gName = this.getGroupByName(group.name)
        return gName.locator('..').locator('.invite-group-button')
    }

    
}