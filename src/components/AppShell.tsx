import {useNavigate, useSearchParams} from "react-router-dom";
import {useFeedmeDashboard} from "../hooks/use-feedme-dashboard.ts";
import {useState} from "react";
import {FiSearch} from "react-icons/fi";

type AppShellProps = {
    activeUserId: string;
}

export function AppShell({activeUserId}: AppShellProps) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const {
        users,
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
            <div className="topbar-actions">
                <label className="toolbar-select-label">
                    Viewer
                    <select className="toolbar-select" value={activeUserId}
                            onChange={(event) => {
                                const params = new URLSearchParams(searchParams);
                                params.set('user', event.target.value);
                                navigate({search: params.toString()});
                            }}>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </header>
        <main className="workspace three-column">
            <section className="column-stack">
                <section className="panel roster-panel">
                    <div className="panel-header panel-header-search">
                        <div className="panel-title-with-search">
                            <p className="eyebrow">Following</p>
                            <div className="panel-title-row">
                                <h2>{activeUser.name}</h2>
                                <button
                                    aria-expanded={isSearchOpen}
                                    aria-label={isSearchOpen ? 'Hide Search': 'Show Search'}
                                    className="icon-button"
                                    type="button"
                                    onClick={() => setIsSearchOpen((prev) => !prev)}>
                                    <FiSearch />
                                </button>
                            </div>
                            {isSearchOpen ? (
                                <input
                                    aria-label="Search Peaople"
                                    className="search-input"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)} />
                            ) : null}
                        </div>
                    </div>
                </section>
            </section>
        </main>
    </div>
}