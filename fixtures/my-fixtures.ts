import { test as base } from '@playwright/test';
import { GroupsPage } from '../pages/groups-pages';
import { Group } from '../data_structures/Group';

type MyFixtures = {
    publicCreator: {
        groupsPage: GroupsPage;
        publicGroup: Group
    };
    privateCreator: {
        groupsPage: GroupsPage;
        privateGroup: Group
    };
    visitor: GroupsPage;
    publicGroup: Group;
}

export const test = base.extend<MyFixtures>({
    publicCreator: async ({page}, use) => {
        const groupsPage = new GroupsPage(page);
        await groupsPage.goTo()

        const publicGroup = new Group()
        await groupsPage.createNewGroup(publicGroup)

        await use({
            groupsPage,
            publicGroup
        });

        await groupsPage.deleteGroup(publicGroup);
    },

    privateCreator: async({page}, use) => {
        const groupsPage = new GroupsPage(page);
        await groupsPage.goTo()

        const privateGroup = new Group()
        privateGroup.isPublic = false

        await groupsPage.createNewGroup(privateGroup)

        await use({
            groupsPage,
            privateGroup
        });

        await groupsPage.deleteGroup(privateGroup); 
    },

    visitor: async ({browser}, use) => {        
        const visitorContext = await browser.newContext();
        const visitorPage = await visitorContext.newPage();
        const visitor = new GroupsPage(visitorPage)

        await use(visitor)

        await visitorContext.close()
    },
})



export { expect } from '@playwright/test';