import puppeteer from "puppeteer";

export async function scrapeFilters(url: string) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try {
		await page.goto(url, { waitUntil: "domcontentloaded" });

		const filters = await page.evaluate(() => {
			const categoryNodes = Array.from(
				document.querySelectorAll(".sidebar-filter .item")
			);

			const filtersData = categoryNodes.map((node) => {
				const name =
					node
						.querySelector(".btn-filter")
						?.textContent?.trim()
						.split(" ")[0] || "";
				const values = Array.from(node.querySelectorAll("ul li")).map(
					(value) => {
						return {
							name:
								value
									.querySelector("label")
									?.textContent?.trim() || "",
							id:
								value
									.querySelector("input")
									?.getAttribute("value")
									?.trim() || "",
						};
					}
				);

				return { name, values };
			});

			return filtersData;
		});

		await browser.close();
		return filters;
	} catch (error) {
		console.error("Error during scraping:", error);
		await browser.close();
		return null;
	}
}
