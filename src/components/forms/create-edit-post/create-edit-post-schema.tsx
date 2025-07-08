import { zStringFieldOptional, zStringFieldRequired } from '@/src/utils/form';
import { z } from 'zod';

export const createEditPostForm = z.object({
	title: zStringFieldRequired('Assigned To', { maxLength: 100 }),
	content: zStringFieldRequired('Content'),
	tag: zStringFieldOptional('Tag'),
	photos: z.array(z.string()),
	disableComments: z.boolean(),
});

export type CreateEditPostFormValues = z.infer<typeof createEditPostForm>;
