export type UserProfile = {
    id: string;
    handle: string;
    name: string;
    bio: string;
    hotUser: boolean;
}

export type FeedItem = {
    postId: string;
    authorId: string;
    authorHandle: string;
    authorName: string
    content: string;
    createdAd: string;
    rankingScore: string;
    deliveryStrategy: string;
    rankingReason: string;
}

export type TimelinePageResponse = {
    timelinieOwnerId: string,
    mode: 'HOME' | "USER" | string;
    totalItems: number;
    items: FeedItem[];
    nextCursor: string | null;
}