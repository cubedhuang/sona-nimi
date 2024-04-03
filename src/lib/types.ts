export type CompoundData = Record<string, Compound>;

export interface Compound {
	compound: string;
	uses: Record<string, number>;
	glyphs?: string[];
}
