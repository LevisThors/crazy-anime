"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActiveFilters({
	filters,
}: {
	filters: {
		filterValue:
			| {
					name: string;
					id: string;
			  }
			| undefined;
		paramName: string;
	}[];
}) {
	const router = useRouter();

	const deleteFilter = (paramName: string, id: string | undefined) => {
		const params = new URLSearchParams(window.location.href.split("?")[1]);
		const paramValue = params.get(paramName);

		if (!paramValue) {
			return;
		}

		const paramValues = paramValue.split(",");
		const updatedValues = paramValues.filter((value) => value !== id);

		if (updatedValues.length === 0) {
			params.delete(paramName);
		} else {
			params.set(paramName, updatedValues.join(","));
		}

		const newUrl = `${window.location.pathname}?${params.toString()}`;
		router.push(newUrl, undefined);
	};
	return (
		<div className="flex gap-2">
			{filters.map((filter) => (
				<div
					key={filter.filterValue?.name}
					className="flex flex-wrap justify-between gap-1 bg-neutral-800 text-white rounded-md px-2 py-1 text-sm items-center"
				>
					<span>{filter.filterValue?.name}</span>{" "}
					<span
						onClick={() =>
							deleteFilter(
								filter.paramName,
								filter.filterValue?.id
							)
						}
					>
						<X size={14} />
					</span>
				</div>
			))}
		</div>
	);
}
