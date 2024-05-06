import AnimeGrid from "@/components/AnimeGrid";
import AnimeDetails from "@/components/partials/AnimeDetails";
import AnimePlayer from "@/components/partials/AnimePlayer";
import SectionHeader from "@/components/partials/SectionHeader";
import { scrapeDetails } from "@/utils/scrapeDetails";
async function getData(url: string) {
	const data = await scrapeDetails(url);
	return data;
}

export default async function DetailsPage({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: { ep: string };
}) {
	const data = await getData(
		`https://9animetv.to/watch/${params.slug}?ep=${searchParams.ep}`
	);

	return (
		<div className="py-7 flex flex-col gap-5">
			{data && (
				<>
					<AnimePlayer
						episodes={data.episodes}
						videoUrl={data.videoUrl}
						currentEpisode={searchParams.ep}
					/>
					<AnimeDetails {...data} />
				</>
			)}
			<div>
				<SectionHeader>Suggested Anime</SectionHeader>
				<AnimeGrid
					url={`https://9animetv.to/watch/${params.slug}?ep=${searchParams.ep}`}
				/>
			</div>
		</div>
	);
}
