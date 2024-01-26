import { test, expect } from '@playwright/test';

test('should search for a CEP and open the modal', async ({ page }) => {
  // Navegar para a página home
  await page.goto('https://viacep-angular.vercel.app/');

  // Preencher o formulário de pesquisa
  await page.fill('input[formControlName=cep]', '90450-045');

  // Clicar no botão de pesquisa
  await page.click('button[type=submit]');
});
