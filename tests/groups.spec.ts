import { test, expect } from '@playwright/test';
import { GroupsPage } from '../pages/groups-pages';
import { validGroupsData, invalidGroupsData } from '../test_data/groups-data';
import { Group } from '../data_models/Group';


for (const group of validGroupsData){
    test (group.name, async ({ page }) => {
    await page.goto('/')

    const groupsPage = new GroupsPage(page);
    await groupsPage.createNewGroup(group);

    // Validations
    await expect(groupsPage.getGroupByName(group.name)).toBeVisible();
    await page.waitForTimeout(5000);
    
    });
}

for (const group of invalidGroupsData){
    test (`missing required group details should fail: ${group.name || 'Empty group name'}`, async ({ page }) => {
    await page.goto('/')

    const groupsPage = new GroupsPage(page);
    const groupModal = await groupsPage.createNewGroup(group);

    await expect(groupModal.errorLabel).toContainText(group.errorMessage)
});
}

test ('private groups should be visible and allow link sharing for accessibility by the creating device', async ({page}) => {
    await page.goto('/')

    const group = new Group();
    const groupsPage = new GroupsPage(page);

    group.name = 'private group'
    group.isPublic = false
    
    await groupsPage.createNewGroup(group)

    await expect(groupsPage.getGroupPrivateLinkByName(group.name)).toBeVisible()
})

test ('private groups should not be visible by a non-creating device', async ({page, browser}) => {
    await page.goto('/')

    const group = new Group();
    const groupsPage = new GroupsPage(page);

    group.name = 'private group visibility'
    group.isPublic = false
    
    await groupsPage.createNewGroup(group)

    const nonCreatingDeviceContext = await browser.newContext();
    const nonCreatingPage = await nonCreatingDeviceContext.newPage();
    const nonCreatingGroupsPage = new GroupsPage(nonCreatingPage)

    await nonCreatingPage.goto('/');
    
    await expect(nonCreatingGroupsPage.loadingIndicator).toBeHidden();
    await expect(nonCreatingGroupsPage.getGroupByName(group.name)).not.toBeVisible();
})

test ('public groups is directly accessible by anyone', async ({page}) => {
    await page.goto('/')

    //
})