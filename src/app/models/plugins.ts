export interface Plugin
{
	slug: string;
	name: string;
	description: string;
	downloadURL: string;
	version: string;
}

export interface PluginRepository
{
	name: string;
	description: string;
	plugins: Plugin[];
}
