import {useNavigate, useSearchParams} from "react-router-dom";
import {useFeedmeDashboard} from "../hooks/use-feedme-dashboard.ts";
import {useState} from "react";

type AppShellProps = {
    activeUserId: string;
}

export function AppShell({activeUserId}: AppShellProps) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const {
        activeUser,
        searchQuery,
        setSearchQuery,
        filteredUsers,
        followingIds,
        selectedTimelineUserId,
        selectTimelineUser,
        handleFollowToggle
    } = useFeedmeDashboard(activeUserId)

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [followBusyId, setFollowBusyId] = useState<string | null>(null);

    return <div className="page-shell">
        <header className="topbar">
            <div className="brand">
                <h1>FeedMe</h1>
                <p>Social Feed</p>
            </div>
        </header>
    </div>
}