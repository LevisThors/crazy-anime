import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { Suspense } from "react";
import { Separator } from "../ui/separator";

interface AnimePlayerProps {
	videoUrl: string | null | undefined;
	episodes: {
		episodeNumber?: string | null;
		episodeUrl: string | null | undefined;
		episodeId: string | null | undefined;
	}[];
	currentEpisode: string;
}
export default function AnimePlayer({
	videoUrl,
	episodes,
	currentEpisode,
}: AnimePlayerProps) {
	return (
		<section className="flex flex-col gap-2 w-full">
			<div className="w-full rounded-md overflow-hidden">
				{videoUrl && (
					<Suspense fallback="Loading...">
						<AspectRatio ratio={16 / 9}>
							<iframe
								src={videoUrl}
								width={"100%"}
								height={"100%"}
							></iframe>
						</AspectRatio>
					</Suspense>
				)}
			</div>
			<div>
				<span className="text-lg font-bold">Episodes</span>
				<Separator />
			</div>
			<div className="flex flex-wrap gap-1.5">
				{episodes.map((episode) => (
					<Link
						key={episode.episodeId}
						href={episode.episodeUrl ? episode.episodeUrl : ""}
						className={`px-5 py-2 ${
							currentEpisode == episode.episodeId ||
							currentEpisode == ""
								? "bg-neutral-800 text-white"
								: "bg-transparent text-neutral-800"
						} hover:bg-neutral-800 text-white transition-all font-bold flex justify-center items-center rounded-md border border-neutral-800`}
					>
						<span>{episode.episodeNumber}</span>
					</Link>
				))}
			</div>
		</section>
	);
}
