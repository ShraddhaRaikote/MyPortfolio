import { defineCliConfig } from 'sanity/cli';
import type { UserConfig } from 'vite';

const projectId = 'cq64slan';
const dataset = 'production';

function withLocalToken(config: UserConfig): UserConfig {
  if (process.env.SANITY_STUDIO_LOCAL_AUTH !== 'true') return config;

  const token = process.env.SANITY_API_TOKEN?.trim();
  if (!token?.startsWith('sk')) return config;

  return {
    ...config,
    define: {
      ...(typeof config.define === 'object' && config.define !== null ? config.define : {}),
      'import.meta.env.SANITY_STUDIO_API_TOKEN': JSON.stringify(token),
    },
  };
}

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: 'https://cq64slan.sanity.studio',
  vite: (config) => withLocalToken(config),
});
