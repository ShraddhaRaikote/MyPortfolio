import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { localDevAuth } from './plugins';

const projectId = 'cq64slan';
const dataset = 'production';

/** Expose API token to Studio for local sign-in (never enable for deploy). */
const useLocalTokenAuth = import.meta.env.SANITY_STUDIO_LOCAL_AUTH === 'true';

const plugins = [
  ...(useLocalTokenAuth ? [localDevAuth()] : []),
  structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')),
            S.listItem()
              .title('Profile')
              .child(S.document().schemaType('profile').documentId('profile').title('Profile')),
            S.divider(),
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('skill').title('Skills'),
            S.documentTypeListItem('experience').title('Experience'),
            S.documentTypeListItem('interest').title('Interests'),
          ]),
    }),
  visionTool(),
];

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio CMS',
  projectId,
  dataset,
  plugins,
  schema: {
    types: schemaTypes,
  },
  tasks: { enabled: false },
  ...(useLocalTokenAuth
    ? {
        auth: { loginMethod: 'token' },
      }
    : {}),
});
