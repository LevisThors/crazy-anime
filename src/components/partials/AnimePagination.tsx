"use client";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export default function AnimePagination({
	lastPage,
	currentPage,
}: {
	lastPage: number;
	currentPage: number;
}) {
	let currentUrl = window.location.href;
	if (!window.location.href.includes("page=")) {
		window.location.href.includes("?")
			? (currentUrl = `${currentUrl}&page=${currentPage}`)
			: (currentUrl = `${currentUrl}?page=${currentPage}`);
	}
	return (
		<>
			<Pagination>
				<PaginationContent>
					{currentPage > 1 && (
						<>
							<PaginationItem>
								<PaginationPrevious
									href={currentUrl.replace(
										`page=${currentPage}`,
										`page=${currentPage - 1}`
									)}
								/>
							</PaginationItem>
							{currentPage > 2 && (
								<>
									<PaginationItem>
										<PaginationLink
											href={currentUrl.replace(
												`page=${currentPage}`,
												`page=1`
											)}
										>
											1
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								</>
							)}
							<PaginationItem>
								<PaginationLink href="#">
									{currentPage - 1}
								</PaginationLink>
							</PaginationItem>
						</>
					)}
					<PaginationItem>
						<PaginationLink href="#" isActive>
							{currentPage}
						</PaginationLink>
					</PaginationItem>
					{currentPage < lastPage && (
						<>
							{[1, 2, 3, 4, 5].map((forwardPage) => {
								if (!lastPage) return;
								if (currentPage + forwardPage < lastPage) {
									return (
										<PaginationItem>
											<PaginationLink
												href={currentUrl.replace(
													`page=${currentPage}`,
													`page=${
														currentPage +
														forwardPage
													}`
												)}
											>
												{currentPage + forwardPage}
											</PaginationLink>
										</PaginationItem>
									);
								}
							})}
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							{currentPage + 5 < lastPage && (
								<PaginationItem>
									<PaginationLink
										href={currentUrl.replace(
											`page=${currentPage}`,
											`page=${lastPage}`
										)}
									>
										{lastPage}
									</PaginationLink>
								</PaginationItem>
							)}

							<PaginationItem>
								<PaginationNext
									href={currentUrl.replace(
										`page=${currentPage}`,
										`page=${currentPage + 1}`
									)}
								/>
							</PaginationItem>
						</>
					)}
				</PaginationContent>
			</Pagination>
		</>
	);
}
