import { Separator } from "../ui/separator";

export default function SectionHeader({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-full">
			<h1 className="text-2xl font-bold">{children}</h1>
			<Separator />
		</div>
	);
}
