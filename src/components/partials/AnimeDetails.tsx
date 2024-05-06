import { StarIcon } from "lucide-react";
import Image from "next/image";

interface AnimeDetailsProps {
	title: string | null | undefined;
	description: string | null | undefined;
	rating: string | null | undefined;
	attributes: {
		key: string | null | undefined;
		value: string | null | undefined;
		url?: string | null | undefined;
	}[];
	image: string | null | undefined;
	altTitle: string | null | undefined;
}
export default function AnimeDetails({
	title,
	description,
	rating,
	attributes,
	image,
	altTitle,
}: AnimeDetailsProps) {
	return (
		<section className="w-full flex gap-3 border border-neutral-600 p-3 shadow-sm rounded-md">
			<div className="w-1/5 h-[270px] sm:flex hidden relative rounded-md overflow-hidden">
				<Image src={image ? image : ""} alt={title ? title : ""} fill />
			</div>
			<div className="flex flex-col gap-2 max-w-[80%]">
				<div>
					<h1 className="text-xl font-semibold">{title}</h1>
					<h3 className="text-neutral-500 text-base font-bold">
						{altTitle}
					</h3>
					<span className="flex items-center text-sm font-bold">
						<StarIcon size={12} fill="100%" />
						{rating}/5
					</span>
				</div>
				<div className="flex flex-col gap-0.5 text-sm">
					<span className="font-bold">Description:</span>
					<p>{description}</p>
				</div>
				<div className="max-h-40 flex flex-col flex-wrap text-sm w-fit gap-x-5 gap-y-1">
					{attributes.map((attr) => (
						<div className="flex w-fit gap-0.5" key={attr.key}>
							<span className="font-bold">{attr.key}</span>
							<span>{attr.value}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
