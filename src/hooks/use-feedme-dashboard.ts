import {use, useDeferredValue, useMemo, useState} from "react";
import {getDashboardResource} from "../lib/dashboard-resource.ts";
import type {DashboardData} from "../types.ts";

export function useFeedmeDashboard(activeUserId: string) {
    const dashboardPromise = useMemo(() => getDashboardResource(activeUserId), [activeUserId]);

    const initialData = use<DashboardData>(dashboardPromise);

    const [searchQuery, setSearchQuery] = useState('');

    const activeUser = useMemo(
        () => initialData.users.find((user) => user.id === activeUserId) ?? initialData.users[0],
        [activeUserId, initialData.users]
    );

    const [followingIds, setFollowingIds] = useState<string[]>(initialData.following.targetUserIds);

    const deferredSearchQuery = useDeferredValue(searchQuery);

    const filteredUsers = useMemo(() => {
        const query = defferedSearchQuey.trim().toLowerCase();
        if(!query) {
            return initialData.users;
        }

        return initialData.users.filter((user) => {
            const filterBy = `${user.name} ${user.handle} ${user.bio}`;
            return filterBy.toLowerCase().includes(query);
        })
    }, [deferredSearchQuery, initialData.users])

    return {
        users: initialData.users,
        activeUser,
        searchQuery,
        setSearchQuery,
        filteredUsers,
        followingIds
    }
}