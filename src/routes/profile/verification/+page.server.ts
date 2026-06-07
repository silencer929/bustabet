import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import fs from 'fs';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/auth/login');

  const documents = await db.verificationDoc.findMany({
    where: { profileId: locals.user.id },
    orderBy: { submittedAt: 'desc' }
  });

  return { documents };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/auth/login');

    const formData = await request.formData();
    const documentType = formData.get('documentType') as string;
    const file = formData.get('file') as File;

    if (!file || file.size === 0) {
      return fail(400, { error: 'Please select a valid document file to upload' });
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const uploadPath = `static/uploads/${fileName}`;

      // Ensure that SvelteKit static uploads directory exists before writing
      if (!fs.existsSync('static/uploads')) {
        fs.mkdirSync('static/uploads', { recursive: true });
      }

      await fs.promises.writeFile(uploadPath, buffer);
      const fileUrl = `/uploads/${fileName}`;

      await db.verificationDoc.create({
        data: {
          profileId: locals.user.id,
          documentType,
          fileUrl,
          status: 'PENDING'
        }
      });

      return { success: true, message: 'Document submitted successfully! Our compliance team will review it.' };
    } catch (error: any) {
      console.error('[KYC Upload Error]:', error);
      return fail(500, { error: 'Failed to process document file upload' });
    }
  }
};