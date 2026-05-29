import { useEffect } from 'react';
import type { LayoutProps } from 'sanity';

const projectId = 'cq64slan';
const storageKey = `__studio_auth_token_${projectId}`;

/**
 * Local dev only: sign Studio in with SANITY_STUDIO_API_TOKEN from .env
 * so you can edit without OAuth when the network check fails.
 * Never enable for production deploy (see sanity.config.ts).
 */
export function LocalDevAuthLayout(props: LayoutProps) {
  useEffect(() => {
    const token = import.meta.env.SANITY_STUDIO_API_TOKEN as string | undefined;
    if (token?.startsWith('sk')) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ token, time: new Date().toISOString() }),
      );
    }
  }, []);

  return props.renderDefault(props);
}
