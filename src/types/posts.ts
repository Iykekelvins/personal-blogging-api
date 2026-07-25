export interface CreatePostDto {
	title: string;
	slug: string;
	content: string;
}

export interface UpdatePostDto {
	title?: string;
	slug?: string;
	content?: string;
}
