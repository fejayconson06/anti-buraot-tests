import { test, expect } from '../fixtures/my-fixtures';
import { GroupsPage } from '../pages/groups-pages';
import { validGroupsData, invalidGroupsData } from '../test_data/groups-data';
import { Group } from '../data_models/Group';


for (const group of validGroupsData){
    test(group.name, async ({ page }) => {
    await page.goto('/')

    const groupsPage = new GroupsPage(page);
    await groupsPage.createNewGroup(group);

    // Validations
    await expect(groupsPage.getGroupByName(group.name)).toBeVisible();
    await page.waitForTimeout(5000);
    
    });
}

for (const group of invalidGroupsData){
    test(`missing required group details should fail: ${group.name || 'Empty group name'}`, async ({ page }) => {
    await page.goto('/')

    const groupsPage = new GroupsPage(page);
    const groupModal = await groupsPage.createNewGroup(group);

    await expect(groupModal.errorLabel).toContainText(group.errorMessage)
});
}

// Grouping and tagging. NO FIXTURES
test.describe('private groups NO FIXTURES', () => {
    test('should be visible and allow link sharing for accessibility by the creating device', 
        {tag: '@basic'},
        async ({page}) => {
            await page.goto('/')

            const group = new Group();
            const groupsPage = new GroupsPage(page);

            group.name = 'private group'
            group.isPublic = false
            
            await groupsPage.createNewGroup(group);
            await expect(groupsPage.getGroupPrivateLink(group)).toBeVisible();
})

    test('should not be visible by the non-creating device', 
        async ({page, browser}) => {
            await page.goto('/')

            const group = new Group();
            const groupsPage = new GroupsPage(page);

            group.name = 'private group visibility'
            group.isPublic = false
            
            await groupsPage.createNewGroup(group)

            const nonCreatingDeviceContext = await browser.newContext();
            const nonCreatingPage = await nonCreatingDeviceContext.newPage();
            const nonCreatingGroupsPage = new GroupsPage(nonCreatingPage);

            await nonCreatingPage.goto('/');
            
            await expect(nonCreatingGroupsPage.loadingIndicator).toBeHidden();
            await expect(nonCreatingGroupsPage.getGroupByName(group.name)).not.toBeVisible();
    })

    test('should be joinable by code', async ({page, browser}) => {

    })

    test('should be joinable by link', async ({page, browser}) => {

    })
})

// Learning fixtures. 
test.describe('public groups', () => {
    test ('should be directly accessible by anyone', 
        { tag: '@public'},
        async ({page, publicCreator, visitor}) => {
            const {publicGroup} = publicCreator

            await visitor.goTo()
            await expect(visitor.getGroupByName(publicGroup.name)).toBeVisible();
        }
    )
})

// Grouping and tagging. WITH USING FIXTURES
test.describe('private groups WITH FIXTURES', () => {
    test('f. should be visible and allow link sharing for accessibility by the creating device', 
        {tag: '@basic'},
        async ({page, privateCreator}) => {
            const {groupsPage, privateGroup} = privateCreator

            await expect(groupsPage.getGroupPrivateLink(privateGroup)).toBeVisible();
})

    test('f. should not be visible by the non-creating device', async ({page, privateCreator, visitor}) => {
        const {privateGroup} = privateCreator

        await visitor.goTo()
        await expect(visitor.getGroupByName(privateGroup.name)).not.toBeVisible();
    })
})

