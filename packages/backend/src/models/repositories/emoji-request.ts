import { db } from '@/db/postgre.js';
import { Packed } from '@/misc/schema.js';
import { EmojiRequest } from '@/models/entities/emoji-request.js';
import { Users, DriveFiles } from '..';

export const EmojiRequestRepository = db.getRepository(EmojiRequest).extend({
	async pack(
		src: EmojiRequest['id'] | EmojiRequest,
		me?: any,
	): Promise<Packed<'EmojiRequest'>> {
		const {
			id, createdAt,
			fileId, file,
			name,
			aliases,
			description,
			proposerId, proposer,
			state,
			moderatorComment,
		} = typeof src === 'object' ? src : await this.findOneByOrFail({ id: src });

		return {
			id, createdAt: createdAt.toISOString(),
			name, aliases, description,
			fileId, proposerId,
			state, moderatorComment,
			file: await DriveFiles.pack(file || fileId, me),
			proposer: await Users.pack(proposer || proposerId, me),
		};
	},

	packMany(
		requests: any,
		me?: any,
	) {
		return Promise.all(requests.map(x => this.pack(x, me)));
	},
});
