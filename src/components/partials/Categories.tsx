import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/components/ui/menubar";
import type Category from "@/types/Category";
import { scrapeCategories } from "@/utils/scrapeCategories";
import Link from "next/link";

async function getData() {
	const data = await scrapeCategories("https://9animetv.to/home");
	return data;
}

export default async function Categories() {
	const data: Category[] | null = await getData();
	return (
		<Menubar className="bg-transparent">
			<MenubarMenu>
				<MenubarTrigger className="bg-transparent text-white cursor-pointer">
					Categories
				</MenubarTrigger>
				<MenubarContent>
					{data &&
						data.map((category) => {
							if (category.subCategories) {
								if (category.subCategories?.length === 0) {
									return (
										<MenubarItem key={category.name}>
											<Link
												href={
													category.url
														? category.url
														: ""
												}
											>
												{category.name}
											</Link>
										</MenubarItem>
									);
								} else {
									return (
										<MenubarSub>
											<MenubarSubTrigger>
												{category.name}
											</MenubarSubTrigger>
											<MenubarSubContent>
												{category.subCategories.map(
													(subCat) => (
														<MenubarItem
															key={subCat.name}
														>
															<Link
																href={
																	subCat.url
																}
															>
																{subCat.name}
															</Link>
														</MenubarItem>
													)
												)}
											</MenubarSubContent>
										</MenubarSub>
									);
								}
							}
						})}
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}
