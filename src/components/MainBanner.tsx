import * as React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { scrapeBanners } from "@/utils/scrapeBanners";
import type Banner from "@/types/Banner";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

async function getData() {
	const data = await scrapeBanners("https://9animetv.to/home");
	return data;
}

export default async function MainBanner() {
	const data: Banner[] | null = await getData();
	return (
		<Carousel className="w-full">
			<CarouselContent>
				{data &&
					data.map((banner: Banner) => (
						<CarouselItem
							key={banner.title}
							className="relative rounded-md overflow-hidden"
						>
							<div>
								<AspectRatio
									ratio={16 / 8}
									className="bg-muted"
								>
									<Image
										src={banner.image}
										alt={banner.title}
										fill
										className="rounded-md object-cover"
									/>
								</AspectRatio>
								<div className="absolute flex flex-col gap-1.5 bottom-0 px-4 pt-10 pb-4 bg-gradient-to-t from-neutral-800 text-white rounded-md">
									<h2 className="font-bold text-3xl">
										{banner.title}
									</h2>
									<p className="text-sm line-clamp-2">
										{banner.description}
									</p>
									<Button className="w-fit">
										<Link
											className="text-xl"
											href={banner.url}
										>
											Watch Now
										</Link>
									</Button>
								</div>
							</div>
						</CarouselItem>
					))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
