import puppeteer from "puppeteer";

export async function scrapeCategories(url: string) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try {
		await page.goto(url, { waitUntil: "domcontentloaded" });

		const categories = await page.evaluate(() => {
			const categoryNodes = Array.from(
				document.querySelectorAll(".header_menu-list .nav-item")
			);

			const categoriesData = categoryNodes.map((node) => {
				const name = node.querySelector("a")?.textContent?.trim() || "";
				const url =
					node.querySelector("a")?.getAttribute("href")?.trim() || "";
				const subCategories = Array.from(
					node.querySelectorAll(".sub-menu li")
				).map((subCategory) => {
					return {
						name:
							subCategory
								.querySelector("a")
								?.textContent?.trim() || "",
						url:
							subCategory
								.querySelector("a")
								?.getAttribute("href")
								?.trim() || "",
					};
				});

				return { name, url, subCategories };
			});

			return categoriesData;
		});

		await browser.close();
		return categories;
	} catch (error) {
		console.error("Error during scraping:", error);
		await browser.close();
		return null;
	}
}
