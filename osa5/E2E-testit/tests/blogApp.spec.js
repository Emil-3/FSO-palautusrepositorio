const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'log in to application'})).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect (page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login'} ).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('Matty')
      await page.getByLabel('password').fill('secret')
      await page.getByRole('button', { name: 'login'} ).click()
      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login'} ).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click();
      await page.getByRole('textbox', { name: 'title:' }).fill('Dogs');
      await page.getByRole('textbox', { name: 'author:' }).fill('Jack Jackson');
      await page.getByRole('textbox', { name: 'url:' }).fill('dogs.com');
      await page.getByRole('button', { name: 'create' }).click();
      await expect(page.getByText('Dogs Jack Jackson')).toBeVisible()
      await expect(page.getByText('a new blog Dogs by Jack Jackson added')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click();
      const blogLocator = page.getByText('Dogs Jack Jackson hidedogs.')
      await expect(blogLocator).toContainText('dogs.com')
      await expect(blogLocator).toContainText('likes 0')
      await expect(blogLocator).toContainText('Matti Luukkainen')
    })

    describe('and a blog has been created', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByRole('textbox', { name: 'title:' }).fill('Dogs')
        await page.getByRole('textbox', { name: 'author:' }).fill('Jack Jackson')
        await page.getByRole('textbox', { name: 'url:' }).fill('dogs.com')
        await page.getByRole('button', { name: 'create' }).click()
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('a blog can be removed by the user who added it', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        page.once('dialog', dialog => {
          dialog.accept().catch(() => {})
        })
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('blog deleted')).toBeVisible()
        await expect(page.getByText('Dogs Jack Jackson')).not.toBeVisible()
      })
    })
  })
})
