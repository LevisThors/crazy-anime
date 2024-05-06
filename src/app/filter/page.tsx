import AnimeGrid from "@/components/AnimeGrid";
import Filters from "@/components/Filters";

interface SearchParamsProps {
	keyword: string;
	type: string;
	status: string;
	season: string;
	language: string;
	sort: string;
	year: string;
	genre: string;
	page: string;
}
export default async function FilterPage({
	searchParams,
}: {
	searchParams: SearchParamsProps;
}) {
	return (
		<div className="flex flex-col gap-3">
			<Filters searchParams={searchParams} />
			<AnimeGrid
				url={`https://9animetv.to/filter?keyword=${
					searchParams.keyword ? searchParams.keyword : ""
				}&type=${searchParams.type ? searchParams.type : ""}&status=${
					searchParams.status ? searchParams.status : "all"
				}&season=${
					searchParams.season ? searchParams.season : ""
				}&language=${
					searchParams.language ? searchParams.language : ""
				}&sort=${
					searchParams.sort ? searchParams.sort : "default"
				}&year=${searchParams.year ? searchParams.year : ""}&genre=${
					searchParams.genre ? searchParams.genre : ""
				}&page=${searchParams.page ? searchParams.page : "1"}`}
				paginate={{
					currentPage: isNaN(parseInt(searchParams.page))
						? 1
						: parseInt(searchParams.page),
				}}
			/>
		</div>
	);
}
