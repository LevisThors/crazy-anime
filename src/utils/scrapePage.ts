import puppeteer from "puppeteer";

export async function scrapePage(url: string) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try {
		await page.goto(url, { waitUntil: "domcontentloaded" });

		const cards = await page.evaluate(() => {
			const cardNodes = Array.from(
				document.querySelectorAll(".film_list-wrap .flw-item.item-qtip")
			);

			const cardsData = cardNodes.map((node) => {
				const title =
					node.querySelector(".dynamic-name")?.textContent?.trim() ||
					"";
				const url =
					node
						.querySelector(".dynamic-name")
						?.getAttribute("href")
						?.trim() || "";
				const image =
					node
						.querySelector(".film-poster-img")
						?.getAttribute("data-src") || "";
				const episode =
					node
						.querySelector(".tick-item.tick-eps")
						?.textContent?.trim()
						.replace("Ep", "") || "";

				return { title, url, image, episode };
			});
			const lastPage: string | null | undefined = document.querySelector(
				".anime-pagination div.btn-blank:last-child"
			)?.textContent;
			if (lastPage)
				return {
					animes: cardsData,
					lastPage: parseInt(lastPage.replace("of", "")),
				};
			return { animes: cardsData };
		});

		await browser.close();
		return cards;
	} catch (error) {
		console.error("Error during scraping:", error);
		await browser.close();
		return null;
	}
}
