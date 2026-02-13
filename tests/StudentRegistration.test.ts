import { expect, test } from '@playwright/test';
import { StudentRegistrationPage } from '../pageFactory/pageRepository/StudentRegistrationPage';

test('Student Registration Form - Happy Flow', { tag: '@Smoke' }, async ({ page }) => {

  const form = new StudentRegistrationPage(page);

  await form.open();

  await form.firstName.fill('Aaqeeb');
  await form.lastName.fill('Mohammed');
  await form.email.fill('aaqeeb@test.com');

  await form.genderMale.click();

  await form.mobile.fill('9876543210');

  await form.dob.click();
  await page.keyboard.press('Control+A');
  await page.keyboard.type('12 Jan 2000');
  await page.keyboard.press('Enter');

  await form.subjects.fill('Maths');
  await page.keyboard.press('Enter');

  await form.sportsHobby.click();


await form.uploadPicture.setInputFiles('C:/Users/DELL/Documents/testing-project/tests/tests/profile.png');

  await form.address.fill('Bangalore, India');

  await form.state.fill('NCR');
  await page.keyboard.press('Enter');

  await form.city.fill('Delhi');
  await page.keyboard.press('Enter');

  await form.submit.click();

  await expect(page.locator('#example-modal-sizes-title-lg'))
    .toHaveText('Thanks for submitting the form');
});




