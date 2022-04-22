export const packedEmojiRequestSchema = {
	type: 'object' as const,
	optional: false as const, nullable: false as const,
	properties: {
		id: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
			format: 'id',
			description: 'The unique identifier for this emoji.',
			example: 'xxxxxxxxxx',
		},
		createdAt: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
			format: 'date-time',
			description: 'The date that the request was created on Groundpolis.',
		},
		fileId: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
		},
		file: {
			type: 'object' as const,
			optional: false as const, nullable: false as const,
		},
		name: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
		},
		aliases: {
			type: 'array' as const,
			optional: false as const, nullable: false as const,
		},
		description: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
		},
		proposerId: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
		},
		proposer: {
			type: 'object' as const,
			optional: false as const, nullable: false as const,
		},
		state: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
		},
		moderatorComment: {
			type: 'string' as const,
			optional: false as const, nullable: true as const,
		},

	},
};
