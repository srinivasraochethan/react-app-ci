import { expect, test } from '@playwright/test';

test('patch a user post', async ({ request }) => {
    const response = await request.patch('/posts/1', {
        data: {
            title: 'New Post',
        }
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(expect.objectContaining({
        "id": 1,
        "userId": 1
    }));
})