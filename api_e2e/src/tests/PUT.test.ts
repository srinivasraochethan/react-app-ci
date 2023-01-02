import { expect, test } from '@playwright/test';

test('update a user post', async ({ request }) => {
    const response = await request.put('/posts/1', {
        data: {
            id: 1,
            title: 'Existing Post',
            body: 'This is a post',
            userId: 1
        },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(expect.objectContaining({
        "id": 1,
    }));
})

test('update a user post that does not exist', async ({ request }) => {
    const response = await request.put('/posts/1001', {
        data: {
            id: 1,
            title: 'Existing Post',
            body: 'This is a post',
            userId: 1
        },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(500);
    expect(response.statusText()).toEqual('Internal Server Error');
    // expect(response.text()).toContain("Cannot read properties of undefined (reading 'id')");
})