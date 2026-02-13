import { Page, Locator } from '@playwright/test';

export class StudentRegistrationPage {
  readonly page: Page;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly genderMale: Locator;
  readonly mobile: Locator;
  readonly dob: Locator;
  readonly subjects: Locator;
  readonly sportsHobby: Locator;
  readonly uploadPicture: Locator;
  readonly address: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#userEmail');
    this.genderMale = page.locator("label[for='gender-radio-1']");
    this.mobile = page.locator('#userNumber');
    this.dob = page.locator('#dateOfBirthInput');
    this.subjects = page.locator('#subjectsInput');
    this.sportsHobby = page.locator("label[for='hobbies-checkbox-1']");
    this.uploadPicture = page.locator('#uploadPicture');
    this.address = page.locator('#currentAddress');
    this.state = page.locator('#react-select-3-input');
    this.city = page.locator('#react-select-4-input');
    this.submit = page.locator('#submit');
  }

  async open() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
  }
}
