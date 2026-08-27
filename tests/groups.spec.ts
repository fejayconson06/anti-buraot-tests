import { test, expect } from '@playwright/test';
import { GroupsPage } from '../pages/groups-pages';
import { validGroupsData, invalidGroupsData } from '../test_data/groups-data';


for (const group of validGroupsData){
    test.only (group.name, async ({ page }) => {
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