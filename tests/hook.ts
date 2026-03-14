import { test as base, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

export const test = base;

test.afterEach(async ({ page }, testInfo) => {
  // attach video only when available
  const video = page.video();

  if (video) {
    const videoPath = await video.path();

    await allure.attachmentPath('Execution video', videoPath, {
      contentType: 'video/webm',
      fileExtension: 'webm'
    });
  }
});

export { expect };