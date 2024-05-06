import { scrapeTopList } from "@/utils/scrapeTopList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "./partials/SectionHeader";
import TopCard from "./partials/TopCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import TopListItem from "@/types/TopListItem";

async function getData() {
	const data = await scrapeTopList("https://9animetv.to/home");
	return data;
}

export default async function TopList() {
	const data = await getData();
	return (
		<div>
			<SectionHeader>Best Anime</SectionHeader>
			<Tabs defaultValue="daily" className="w-full">
				<TabsList className="w-full rounded-none text-lg">
					<TabsTrigger value="daily">Daily</TabsTrigger>
					<TabsTrigger value="weekly">Weekly</TabsTrigger>
					<TabsTrigger value="monthly">Monthly</TabsTrigger>
				</TabsList>
				<TabsContent value="daily">
					{data && <RenderCarousel data={data?.daily} />}
				</TabsContent>
				<TabsContent value="weekly">
					{data && <RenderCarousel data={data?.weekly} />}
				</TabsContent>
				<TabsContent value="monthly">
					{data && <RenderCarousel data={data?.monthly} />}
				</TabsContent>
			</Tabs>
		</div>
	);
}

function RenderCarousel({ data }: { data: TopListItem[] }) {
	return (
		<Carousel className="w-full">
			<CarouselContent className="-ml-1">
				{data.map((topItem, index) => (
					<CarouselItem
						key={topItem.title}
						className="pl-1 md:basis-1/2 lg:basis-1/5"
					>
						<TopCard
							title={topItem.title}
							views={topItem.views}
							url={topItem.url}
							image={topItem.image}
							position={topItem.position}
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
