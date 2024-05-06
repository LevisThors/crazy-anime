import type Anime from "@/types/Anime";
import Card from "./partials/Card";
import { scrapePage } from "@/utils/scrapePage";
import { Suspense } from "react";
import dynamic from "next/dynamic";
const AnimePagination = dynamic(() => import("./partials/AnimePagination"), {
	ssr: false,
});

interface AnimeGridProps {
	include?: {
		item: React.ReactNode;
		offset: number;
		type: "row" | "single";
	}[];
	url: string;
	paginate?: {
		currentPage: number;
	};
}

async function getData(url: string) {
	const data = await scrapePage(url);
	return data;
}

export default async function AnimeGrid({
	include,
	url,
	paginate,
}: AnimeGridProps) {
	const data: { animes: Anime[]; lastPage?: number } | null = await getData(
		url
	);

	return (
		<div className="flex flex-col gap-3 py-3">
			{data && (
				<>
					<section className="flex flex-wrap gap-2">
						{data.animes.map((anime: Anime, index: number) => {
							let renderedItem = (
								<Card
									key={anime.title}
									title={anime.title}
									image={anime.image}
									url={anime.url}
									episode={parseInt(anime.episode)}
									lastEpisode={
										anime.episode.split("/").length > 1
											? parseInt(
													anime.episode.split("/")[1]
											  )
											: null
									}
									isMovie={
										anime.episode.toLowerCase().trim() ==
										"full"
									}
								/>
							);

							if (include != null) {
								include.forEach(({ item, offset, type }) => {
									if (type === "row") {
										if ((index + 1) % offset === 0) {
											renderedItem = (
												<>
													{renderedItem}
													{item}
												</>
											);
										}
									} else if (type === "single") {
										if (index === offset) {
											renderedItem = (
												<>
													{item}
													{renderedItem}
												</>
											);
										}
									}
								});
							}

							return renderedItem;
						})}
					</section>
					{paginate && data.lastPage && (
						<Suspense>
							<AnimePagination
								currentPage={paginate.currentPage}
								lastPage={data.lastPage}
							/>
						</Suspense>
					)}
				</>
			)}
		</div>
	);
}
