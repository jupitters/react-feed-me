import {use, useDeferredValue, useMemo, useState} from "react";
import {getDashboardResource} from "../lib/dashboard-resource.ts";
import type {DashboardData, FollowResponse, UserProfile} from "../types.ts";
import {feedApi} from "../lib/api.ts";

export function useFeedmeDashboard(activeUserId: string) {
    const dashboardPromise = useMemo(() => getDashboardResource(activeUserId), [activeUserId]);

    const initialData = use<DashboardData>(dashboardPromise);

    const [searchQuery, setSearchQuery] = useState('');

    const activeUser = useMemo(
        () => initialData.users.find((user) => user.id === activeUserId) ?? initialData.users[0],
        [activeUserId, initialData.users]
    );

    const [followingIds, setFollowingIds] = useState<string[]>(initialData.following.targetUserIds);

    const [selectedTimelineUserId, setSelectedTimelineUserId] = useState(activeUserId);

    const deferredSearchQuery = useDeferredValue(searchQuery);

    const filteredUsers = useMemo(() => {
        const query = deferredSearchQuery.trim().toLowerCase();
        if(!query) {
            return initialData.users;
        }

        return initialData.users.filter((user) => {
            const filterBy = `${user.name} ${user.handle} ${user.bio}`;
            return filterBy.toLowerCase().includes(query);
        })
    }, [deferredSearchQuery, initialData.users])

    function selectTimelineUser(user: UserProfile) {
        setSelectedTimelineUserId(user.id);
    }

    async function handleFollowToggle(targetUserId: string): Promise<FollowResponse> {
        const currentlyFollowing = followingIds.includes(targetUserId);
        const response = currentlyFollowing
        ? await feedApi.unfollowUser(activeUserId, targetUserId)
        : await feedApi.followUser(activeUserId, targetUserId);

        setFollowingIds((previous) => currentlyFollowing ? previous.filter((id) => id !== targetUserId) : [...previous, targetUserId])

        return response;
    }

    return {
        users: initialData.users,
        activeUser,
        searchQuery,
        setSearchQuery,
        filteredUsers,
        followingIds,
        selectedTimelineUserId,
        selectTimelineUser,
        handleFollowToggle
    }
}