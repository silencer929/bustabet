import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const GET: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get('code');

  if (!code) {
    return json({ success: false, message: 'Missing slip code parameters' }, { status: 400 });
  }

  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      'SELECT selections FROM betslip_codes WHERE code = ? LIMIT 1',
      [code.toUpperCase().trim()]
    );

    if (rows.length === 0) {
      return json({ success: false, message: 'This slip code has expired or does not exist' }, { status: 404 });
    }

    // Safely parse JSON selections data
    const selections = typeof rows[0].selections === 'string' 
      ? JSON.parse(rows[0].selections) 
      : rows[0].selections;

    return json({ success: true, selections });
  } catch (error: any) {
    return json({ success: false, message: error.message || 'Failed to load slip' }, { status: 500 });
  }
};