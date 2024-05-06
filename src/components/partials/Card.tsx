import Image from "next/image";
import Link from "next/link";

interface CardProps {
	title: string;
	episode: number;
	url: string;
	image: string;
	lastEpisode?: number | null;
	isMovie?: boolean;
}

export default function Card({
	title,
	episode,
	url,
	image,
	lastEpisode,
	isMovie,
}: CardProps) {
	return (
		<div className="w-[calc(20%-7px)]">
			<Link
				href={url}
				className="flex flex-col gap-1 max-w-full relative"
			>
				<div className="relative h-[270px]">
					<Image
						alt={title}
						src={image}
						fill
						loading="lazy"
						className="rounded-md"
					/>
				</div>
				<span
					className={`absolute top-2 bg-opacity-80 left-1 ${
						episode == lastEpisode || isMovie
							? "bg-green-700"
							: "bg-neutral-800"
					} px-3 py-1 rounded-md text-sm text-white`}
				>
					{!isMovie
						? `Episode ${episode} ${
								lastEpisode ? `/${lastEpisode}` : ""
						  }`
						: "Movie"}
				</span>
				<h2>{title}</h2>
			</Link>
		</div>
	);
}
