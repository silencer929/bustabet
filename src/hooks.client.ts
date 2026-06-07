import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = async ({ error, event }) => {
  // Log uncaught browser errors to system console for client diagnosis
  console.error('[Client-Side Runtime Exception]:', error);

  return {
    message: 'An unexpected application error occurred. Please refresh the page.'
  };
};