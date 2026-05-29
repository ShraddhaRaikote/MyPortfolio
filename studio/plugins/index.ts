import { definePlugin } from 'sanity';
import { LocalDevAuthLayout } from './localDevAuth';

export const localDevAuth = definePlugin({
  name: 'local-dev-auth',
  studio: {
    components: {
      layout: LocalDevAuthLayout,
    },
  },
});
