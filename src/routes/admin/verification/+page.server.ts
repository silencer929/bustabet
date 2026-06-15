import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';
import fs from 'fs';

export const load: PageServerLoad = async ({ locals }) => {
  // Guard the route; redirect unauthenticated users to login
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }

  // Retrieve player historical submitted KYC files using standard SQL
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT id, profile_id as profileId, document_type as documentType, file_url as fileUrl, status, reviewed_by as reviewedBy, submitted_at as submittedAt 
     FROM verification_documents 
     WHERE profile_id = ? 
     ORDER BY submitted_at DESC`,
    [locals.user.id]
  );

  const serializedDocs = rows.map((doc) => ({
    id: doc.id,
    profileId: doc.profileId,
    documentType: doc.documentType,
    fileUrl: doc.fileUrl,
    status: doc.status,
    reviewedBy: doc.reviewedBy,
    submittedAt: new Date(doc.submittedAt)
  }));

  return { documents: serializedDocs };
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

      // Ensure SvelteKit static uploads directory exists before writing binary files
      if (!fs.existsSync('static/uploads')) {
        fs.mkdirSync('static/uploads', { recursive: true });
      }

      await fs.promises.writeFile(uploadPath, buffer);
      const fileUrl = `/uploads/${fileName}`;
      const docId = crypto.randomUUID();

      // Log the document record into MySQL
      await db.execute(
        `INSERT INTO verification_documents (id, profile_id, document_type, file_url, status) 
         VALUES (?, ?, ?, ?, 'PENDING')`,
        [docId, locals.user.id, documentType, fileUrl]
      );

      return { 
        success: true, 
        message: 'Your document was submitted successfully! Our compliance team will audit it shortly.' 
      };
    } catch (error: any) {
      console.error('[KYC Upload System Error]:', error);
      return fail(500, { error: 'Failed to process document file upload' });
    }
  }
};