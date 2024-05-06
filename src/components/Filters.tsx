import { scrapeFilters } from "@/utils/scrapeFilters";
import { Button } from "./ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import FilterBody from "./partials/FilterBody";
import { Suspense } from "react";
import ActiveFilters from "./partials/ActiveFilters";

async function getFilters() {
	const data = await scrapeFilters("https://9animetv.to/home");
	return data;
}

export default async function Filters({
	searchParams,
}: {
	searchParams?: {
		keyword?: string;
		type?: string;
		status?: string;
		season?: string;
		language?: string;
		sort?: string;
		year?: string;
		genre?: string;
	};
}) {
	const data = await getFilters();
	let activeFilters;
	if (searchParams) {
		activeFilters = data
			?.map((filter) => {
				const activeValues = Object.entries(searchParams).flatMap(
					([key, value]) => {
						if (key == filter.name.toLowerCase()) {
							const searchValues = value.split(",");
							return searchValues.flatMap((v) => {
								return {
									filterValue: filter.values.find(
										(filterValue) => filterValue.id == v
									),
									paramName: key,
								};
							});
						} else {
							return [];
						}
					}
				);

				return activeValues;
			})
			.filter((filterValues) => filterValues.length > 0)
			.flat();
	}
	return (
		<div className="flex flex-col gap-2 pt-5">
			<section className="flex gap-3 bg-white items-center p-4 rounded-md justify-between">
				<h3 className="text-xl font-bold">
					Filter your preferences and find a perfect anime for
					yourself
				</h3>
				<Sheet>
					<SheetTrigger asChild>
						<Button className="text-xl">Open Filters</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Filter Anime</SheetTitle>
							<SheetDescription>
								Filter your preferences and find a perfect anime
								for yourself
							</SheetDescription>
						</SheetHeader>
						<div>
							<Suspense>
								{data ? (
									<FilterBody data={data} />
								) : (
									<div>Filters are not available</div>
								)}
							</Suspense>
						</div>
						<SheetFooter>
							<SheetClose asChild>
								<Button type="submit">Filter</Button>
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</section>
			{activeFilters && <ActiveFilters filters={activeFilters} />}
		</div>
	);
}
