"use client";
import { useState, useEffect } from "react";
import Filter from "@/types/Filter";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface Value {
	id: string;
	name: string;
}

export default function FilterBody({ data }: { data: Filter[] }) {
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleCheckboxChange = (id: string) => {
		setSelectedFilters((prevFilters) =>
			prevFilters.includes(id)
				? prevFilters.filter((filterId) => filterId !== id)
				: [...prevFilters, id]
		);
	};

	useEffect(() => {
		const selectedIds: string[] = [];
		searchParams.forEach((value, key) => {
			const ids = value.split(",");
			ids.forEach((id) => {
				selectedIds.push(`${key}-${id}`);
			});
		});
		setSelectedFilters(selectedIds);
	}, []);

	const buildFilterQuery = () => {
		const filterQueryParams: Record<string, string[]> = {};
		selectedFilters.forEach((selectedId) => {
			const [filterName, id] = selectedId.split("-");
			if (!filterQueryParams[filterName]) {
				filterQueryParams[filterName] = [id];
			} else {
				filterQueryParams[filterName].push(id);
			}
		});

		const queryString = Object.entries(filterQueryParams)
			.map(([filterName, ids]) => `${filterName}=${ids.join(",")}`)
			.join("&");

		return router.push(`/filter?${queryString}`);
	};

	return (
		<ScrollArea className="h-[90vh]">
			<Accordion
				type="multiple"
				className="flex flex-col gap-2 w-full px-2 py-4"
			>
				{data.map((filter) => (
					<AccordionItem value={filter.name} key={filter.name}>
						<AccordionTrigger>{filter.name}</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-1">
							{filter.values.map((value: Value) => (
								<div
									className="flex items-center space-x-2"
									key={value.name}
								>
									<Checkbox
										id={value.id}
										value={`${filter.name.toLowerCase()}-${
											value.id
										}`}
										checked={selectedFilters.includes(
											`${filter.name.toLowerCase()}-${
												value.id
											}`
										)}
										onCheckedChange={() =>
											handleCheckboxChange(
												`${filter.name.toLowerCase()}-${
													value.id
												}`
											)
										}
									/>
									<label
										htmlFor={value.id}
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{value.name}
									</label>
								</div>
							))}
						</AccordionContent>
					</AccordionItem>
				))}
				<Button onClick={buildFilterQuery} className="w-full">
					Apply Filters
				</Button>
			</Accordion>
		</ScrollArea>
	);
}
