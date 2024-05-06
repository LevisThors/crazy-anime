import puppeteer from "puppeteer";

export async function scrapeDetails(url: string) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try {
		await page.goto(url, { waitUntil: "domcontentloaded" });
		await page.waitForSelector(".episodes-ul");

		const details = await page.evaluate(() => {
			const videoUrl = document
				.querySelector("#iframe-embed")
				?.getAttribute("src");
			const rawEpisodes = Array.from(
				document.querySelectorAll(".episodes-ul a")
			);
			const episodes = rawEpisodes.map((episode) => {
				const episodeNumber = episode?.getAttribute("data-number");
				const episodeUrl = episode?.getAttribute("href");
				const episodeId = episode?.getAttribute("data-id");

				return {
					episodeNumber,
					episodeUrl,
					episodeId,
				};
			});

			const animeDetails = document.querySelector(".anime-detail");
			const image = animeDetails
				?.querySelector(".film-poster-img")
				?.getAttribute("src");
			const title =
				animeDetails?.querySelector(".film-name")?.textContent;
			const altTitle = animeDetails?.querySelector(".alias")?.textContent;
			const rating = animeDetails
				?.querySelector("#input-vote")
				?.getAttribute("value");
			const description = animeDetails?.querySelector(
				".film-description .shorting"
			)?.textContent;
			const rawAttributes = Array.from(
				document.querySelectorAll(".meta .item")
			);
			const attributes = rawAttributes.map((attr) => {
				const attrKey = attr.querySelector(".item-title")?.textContent;
				let attrValue;
				let attrUrl;
				if (attr.querySelector(".item-content a")) {
					attrValue =
						attr.querySelector(".item-content a")?.textContent;
					attrUrl = attr
						.querySelector(".item-content a")
						?.getAttribute("href");
				} else {
					attrValue =
						attr.querySelector(".item-content")?.textContent;
				}

				return {
					key: attrKey,
					value: attrValue?.trim(),
					url: attrUrl,
				};
			});

			return {
				videoUrl,
				episodes,
				image,
				title,
				altTitle,
				rating,
				description,
				attributes,
			};
		});

		await browser.close();
		return details;
	} catch (error) {
		console.error("Error during scraping:", error);
		await browser.close();
		return null;
	}
}
