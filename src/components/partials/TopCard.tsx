import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TopCardProps {
	title: string;
	url: string;
	image: string;
	position: string;
	views: string;
}

export default function TopCard({
	title,
	url,
	image,
	position,
	views,
}: TopCardProps) {
	return (
		<div>
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
					className={`absolute top-2 bg-opacity-90 left-1  p-3 px-5 rounded-md text-lg text-white
				${
					position === "1"
						? "bg-yellow-400"
						: position == "2"
						? "bg-slate-400"
						: position === "3"
						? "bg-amber-800"
						: "bg-neutral-800"
				}`}
				>
					{position}
				</span>
				<span className="flex items-center w-fit gap-1.5 bg-opacity-80 bg-neutral-800 px-3 py-1 rounded-md text-sm text-white">
					<EyeIcon size={16} /> {views}
				</span>
				<h2>{title}</h2>
			</Link>
		</div>
	);
}
