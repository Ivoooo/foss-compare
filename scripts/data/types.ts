export type FeatureStatusInput = string | {
    status: string;
    note?: string;
    link?: string;
    version?: string;
};

export interface AppInput {
    id: string;
    name: string;
    description: string;
    website: string;
    repository?: string;
    license: string;
    openSource: boolean;
    language: string[];
    version: string;
    link: string;
    dockerSupport: FeatureStatusInput;
    armSupport: FeatureStatusInput;
    platforms: Record<string, FeatureStatusInput>;
    features: Record<string, FeatureStatusInput>;
    codecs?: Record<string, FeatureStatusInput>;
    automation?: any;
    performance?: any;
    notes?: string;
}

export interface CategoryInput {
    id: string;
    apps: AppInput[];
}
