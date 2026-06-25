import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { selections } = await request.json();

    if (!selections || !Array.isArray(selections)) {
      return json({ success: false, message: 'Invalid selections data payload' }, { status: 400 });
    }

    const code = 'SLIP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const id = crypto.randomUUID();

    // Store the JSON-serialized selections array under the generated share code
    await db.execute(
      'INSERT INTO betslip_codes (id, code, selections) VALUES (?, ?, ?)',
      [id, code, JSON.stringify(selections)]
    );

    return json({ success: true, code });
  } catch (error: any) {
    return json({ success: false, message: error.message || 'Failed to share slip' }, { status: 500 });
  }
};