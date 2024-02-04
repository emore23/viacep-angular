import { test, expect, Page } from '@playwright/test';

test.describe('History Page', async () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:4200/history');
  });

  const newAddress = {
    cep: '90450045',
    logradouro: 'Avenida Coronel Lucas de Oliveira',
    complemento: 'Lado ímpar',
    bairro: 'Mont Serrat',
    localidade: 'Porto Alegre',
    uf: 'RS',
  };

  const favorites = [
    {
      cep: '90450-045',
      logradouro: 'Avenida Coronel Lucas de Oliveira',
      complemento: 'Lado ímpar',
      bairro: 'Mont Serrat',
      localidade: 'Porto Alegre',
      uf: 'RS',
    },
    {
      cep: '90450-045',
      logradouro: 'Avenida Coronel Lucas de Oliveira',
      complemento: 'Lado ímpar',
      bairro: 'Mont Serrat',
      localidade: 'Porto Alegre',
      uf: 'RS',
    },
    {
      cep: '90450-045',
      logradouro: 'Avenida Coronel Lucas de Oliveira',
      complemento: 'Lado ímpar',
      bairro: 'Mont Serrat',
      localidade: 'Porto Alegre',
      uf: 'RS',
    },
    {
      cep: '90450-045',
      logradouro: 'Avenida Coronel Lucas de Oliveira',
      complemento: 'Lado ímpar',
      bairro: 'Mont Serrat',
      localidade: 'Porto Alegre',
      uf: 'RS',
    },
    {
      cep: '90450-045',
      logradouro: 'Avenida Coronel Lucas de Oliveira',
      complemento: 'Lado ímpar',
      bairro: 'Mont Serrat',
      localidade: 'Porto Alegre',
      uf: 'RS',
    },
  ];

  test('should create new address for the favorites', async () => {
    await page.click('.btn-outline-info');
    await page.waitForSelector('.modal', { state: 'visible' });

    await page.fill('input[formControlName=cep]', newAddress.cep);
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

  test('should list favorites on the history page', async () => {
    await page.evaluate((favorites) => {
      localStorage.setItem('@chosen-places', JSON.stringify(favorites));
    }, favorites);

    await page.goto('http://localhost:4200/history');

    await page.waitForSelector('.cards');

    const favoriteCards = await page.$$('.cards app-city-card');

    expect(favoriteCards.length).toBe(favorites.length);
  });

  test('should remove first three favorites from the history page', async () => {
    const favoritesWithMoreItems = [...favorites];

    await page.evaluate((favorites) => {
      localStorage.setItem('@chosen-places', JSON.stringify(favorites));
    }, favoritesWithMoreItems);

    await page.goto('http://localhost:4200/history');

    await page.waitForSelector('.cards');

    const initialFavoriteCards = await page.$$('.cards app-city-card');
    expect(initialFavoriteCards.length).toBe(favoritesWithMoreItems.length);

    for (let i = 0; i < 3; i++) {
      await page.click(`app-city-card:nth-child(${i + 1}) .btn-primary`);
      await page.waitForTimeout(500);
    }

    await page.waitForSelector('.cards');

    const updatedFavoriteCards = await page.$$('.cards app-city-card');
    expect(updatedFavoriteCards.length).toBe(favoritesWithMoreItems.length - 3);
  });
});
