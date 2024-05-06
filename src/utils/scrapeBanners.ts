import puppeteer from 'puppeteer';

export async function scrapeBanners(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const banners = await page.evaluate(() => {
      const bannerNodes = Array.from(document.querySelectorAll('#slider .swiper-wrapper .swiper-slide'));
      const cleanedNodes = bannerNodes.filter(node => !node.classList.contains('swiper-slide-duplicate'));

      const bannersData = cleanedNodes.map(node => {
        const title = node.querySelector('.desi-head-title a')?.textContent?.trim() || '';
        const url = node.querySelector('.desi-buttons a')?.getAttribute('href')?.trim() || '';
        const image = node.querySelector('.film-poster-img')?.getAttribute('src') || '';
        const description = node.querySelector('.desi-description')?.textContent?.trim() || '';

        return { title, url, image, description };
      });

      return bannersData;
    });

    await browser.close();
    return banners;
  } catch (error) {
    console.error('Error during scraping:', error);
    await browser.close();
    return null;
  }
}
