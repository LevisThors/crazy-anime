import AnimeGrid from "@/components/AnimeGrid";
import Filters from "@/components/Filters";
import MainBanner from "@/components/MainBanner";
import SectionHeader from "@/components/partials/SectionHeader";
import TopList from "@/components/TopList";
import { Suspense } from "react";

export default async function Home() {
	return (
		<div>
			<section>
				<MainBanner />
			</section>
			<div className="flex flex-col gap-3">
				<SectionHeader>Latest Releases</SectionHeader>
				<Suspense>
					<AnimeGrid url="https://9animetv.to/home" />
				</Suspense>
				<Suspense>
					<Filters />
				</Suspense>
				<Suspense>
					<TopList />
				</Suspense>
			</div>
		</div>
	);
}
