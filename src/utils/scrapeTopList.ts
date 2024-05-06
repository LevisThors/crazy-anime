import puppeteer from "puppeteer";
import TopListItem from "../types/TopListItem";

export async function scrapeTopList(url: string) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try {
		await page.goto(url, { waitUntil: "domcontentloaded" });

		const dailyTops = await scrapeTopViewed(page, "#top-viewed-day ul li");
		const weeklyTops = await scrapeTopViewed(
			page,
			"#top-viewed-week ul li"
		);
		const monthlyTops = await scrapeTopViewed(
			page,
			"#top-viewed-month ul li"
		);

		await browser.close();
		return { daily: dailyTops, monthly: monthlyTops, weekly: weeklyTops };
	} catch (error) {
		console.error("Error during scraping:", error);
		await browser.close();
		return null;
	}
}

async function scrapeTopViewed(
	page: any,
	selector: string
): Promise<TopListItem[]> {
	return page.evaluate((selector: string) => {
		const nodes = Array.from(document.querySelectorAll(selector));

		return nodes.map((node) => {
			const title =
				node.querySelector(".dynamic-name")?.textContent?.trim() || "";
			const url =
				node
					.querySelector(".dynamic-name")
					?.getAttribute("href")
					?.trim() || "";
			const image =
				node
					.querySelector(".film-poster-img")
					?.getAttribute("data-src") || "";
			const position =
				node.querySelector(".film-number span")?.textContent?.trim() ||
				"";
			const views =
				node.querySelector(".fd-infor")?.textContent?.trim() || "";

			return { title, url, image, position, views };
		});
	}, selector);
}
