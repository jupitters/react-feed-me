const API_ROOT = "/api"

async function request<T>(path: string, init?:RequestInit): Promise<T> {
    const response = await fetch(`${API_ROOT}${path}`, {
        ...init,
        headers: {'Content-Type': 'application/json',
        ...(init?.headers ?? {})
        }
    });

    if(!response.ok) {
        const message = await response.text();
        throw new Error(message || `Request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
}

export const feedApi = {
    getUsers: () => request<UserProfile[]>("/users"),
    getFollowing: (followerId: string) => request<FollowingResponse>(`/follows?followerId=${encodeURIComponent(followerId)}`),
    getHomeFeed: (userId: string, cursor?: string | null) => {
        const params = new URLSearchParams({userId, limit: '5'});

        if(cursor){
            params.set('cursor', cursor);
        }

        return request<TimelinePageResponse>(`/feed/home?${params.toString()}`)
    },
    getUserFeed: (userId: string, cursor?: string | null) => {
        const params = new URLSearchParams({userId, limit: '5'});

        if(cursor){
            params.set('cursor', cursor);
        }

        return request<TimelinePageResponse>(`/feed/user/${encodeURIComponent(userId)}?${params.toString()}`)
    },
    createPost: (authorId: string, content: string) => request<PostResponse>(
        '/posts',
        {
            method: 'POST',
            body: JSON.stringify({
                idempotencyKey: createIdempotencyKey(),
                authorId,
                content
            })
        }),

}

