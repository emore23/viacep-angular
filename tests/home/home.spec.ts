import { test, expect, Page } from '@playwright/test';

test.describe('Home Page', async () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:4200/');
  });

  const result = {
    cep: '90450-045',
    logradouro: 'Avenida Coronel Lucas de Oliveira',
    bairro: 'Mont Serrat',
    localidade: 'Porto Alegre',
    uf: 'RS',
    ibge: '4314902',
  };

  const newAddress = {
    cep: '90450-045',
    logradouro: 'Avenida Coronel Lucas de Oliveira',
    complemento: 'Lado ímpar',
    bairro: 'Mont Serrat',
    localidade: 'Porto Alegre',
    uf: 'RS',
  };

  test('should search for a CEP, open and close the modal', async () => {
    await page.fill('input[formControlName=cep]', result.cep);
    await page.click('button[type=submit]');

    await page.waitForSelector('.modal', { state: 'visible' });

    await page.click('.btn-secondary');

    await page.waitForSelector('.modal', { state: 'hidden' });
  });

  test('should search for a CEP and verify the data in the modal', async () => {
    await page.fill('input[formControlName=cep]', result.cep);
    await page.click('button[type=submit]');

    await page.waitForSelector('.modal', { state: 'visible' });

    const appCepCardExists = await page.waitForSelector('app-cep-card');
    expect(appCepCardExists).toBeTruthy();

    for (const [field, value] of Object.entries(result)) {
      const fieldValue = await page.$eval(
        `app-cep-card input[formControlName=${field}]`,
        (el) => (el as HTMLInputElement).value
      );
      expect(fieldValue).toContain(value);
    }

    await page.click('.btn-secondary');

    await page.waitForSelector('.modal', { state: 'hidden' });
  });

  test('should favorite cep and verify in localstorage the propertie @chosen-places', async () => {
    await page.fill('input[formControlName=cep]', result.cep);
    await page.click('button[type=submit]');

    await page.waitForSelector('.modal', { state: 'visible' });

    await page.click('.btn-success');

    await page.waitForTimeout(1000);

    const successModalVisible = await page.isVisible('.swal2-success');
    expect(successModalVisible).toBeTruthy();

    const localStorageContent = await page.evaluate(() => {
      return localStorage.getItem('@chosen-places');
    });

    expect(localStorageContent).toContain(result.cep);

    await page.click('.swal2-confirm');

    await page.click('.btn-secondary');
    await page.waitForSelector('.modal', { state: 'hidden' });
  });

  test('should create new address for the favorites', async () => {
    await page.click('.btn-danger');
    await page.waitForSelector('.modal', { state: 'visible' });

    await page.fill('input[id=cep]', newAddress.cep);
    await page.fill('input[formControlName=logradouro]', newAddress.logradouro);
    await page.fill(
      'input[formControlName=complemento]',
      newAddress.complemento
    );
    await page.fill('input[formControlName=bairro]', newAddress.bairro);
    await page.fill('input[formControlName=localidade]', newAddress.localidade);
    await page.fill('input[formControlName=uf]', newAddress.uf);

    await page.waitForSelector('button[type=submit]', { state: 'visible' });
    await page.click('button:has-text("Salvar")');

    const localStorageContent = await page.evaluate(() => {
      return localStorage.getItem('@chosen-places');
    });

    expect(localStorageContent).toContain(newAddress.cep);
  });

  test('should navigate to history page', async () => {
    await page.click('.btn-danger');
    await page.waitForSelector('.modal', { state: 'visible' });

    await page.fill('input[id=cep]', newAddress.cep);
    await page.fill('input[formControlName=logradouro]', newAddress.logradouro);
    await page.fill(
      'input[formControlName=complemento]',
      newAddress.complemento
    );
    await page.fill('input[formControlName=bairro]', newAddress.bairro);
    await page.fill('input[formControlName=localidade]', newAddress.localidade);
    await page.fill('input[formControlName=uf]', newAddress.uf);

    await page.waitForSelector('button[type=submit]', { state: 'visible' });
    await page.click('button:has-text("Salvar")');

    await page.click('.btn-primary');
  });
});
