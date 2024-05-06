import AnimeGrid from "@/components/AnimeGrid";
import Filters from "@/components/Filters";
import { scrapePage } from "@/utils/scrapePage";

export default async function GenrePage({
	params,
	searchParams,
}: {
	params: {
		genre: string;
	};
	searchParams: {
		page: string;
	};
}) {
	return (
		<div className="flex flex-col gap-3">
			<Filters />
			<AnimeGrid
				url={`https://9animetv.to/genre/${params.genre}`}
				paginate={{
					currentPage: isNaN(parseInt(searchParams.page))
						? 1
						: parseInt(searchParams.page),
				}}
			/>
		</div>
	);
}
