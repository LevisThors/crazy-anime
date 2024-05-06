export default interface Category {
	name: string;
	url?: string;
	subCategories?: {
		name: string;
		url: string;
	}[];
}
