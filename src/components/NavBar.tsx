import Link from "next/link";
import Search from "./partials/Search";
import { Suspense } from "react";
import Categories from "./partials/Categories";

export default function NavBar() {
	return (
		<nav className="flex justify-between items-center px-10 h-10 bg-neutral-800 text-white">
			<div className="flex gap-3 items-center">
				<h1>CrazyAnime</h1>
				<Suspense>
					<Categories />
				</Suspense>
			</div>
			<Suspense>
				<Search />
			</Suspense>
			<ul className="flex gap-2 m-0">
				<li>
					<Link href={"#"}>Home</Link>
				</li>
				<li>
					<Link href={"#"}>All Anime</Link>
				</li>
			</ul>
		</nav>
	);
}
