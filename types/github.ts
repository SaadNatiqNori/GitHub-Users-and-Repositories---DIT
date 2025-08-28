export interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    bio: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    site_admin: string;
    type: string;
    score: number | string | null;
}
export interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    forks_count: number;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    clone_url: string;
    contributors_url: string;
    topics: string[];
    open_issues_count: number;
    visibility: string;
    owner: {
        login: string;
        avatar_url: string;
        html_url: string;
    };
    searchHasMore: boolean;
    private: boolean;
}
export interface RepoState {
    repositories: GitHubRepository[];
    searchResults: GitHubRepository[];
    searchPage: number;
    searchPerPage: number;
    searchHasMore: boolean;
    searchQuery: string;
    totalCount: number;
    contributors: { [repoId: number]: Contributor[] };
    loading: boolean;
    error: string | null;
    sortBy: 'stars' | 'updated' | 'name';
    filterBy: string;
    page: number;
    perPage: number;
    hasMore: boolean;
}
export interface UserState {
    currentUser: GitHubUser | null;
    searchedUsers: GitHubUser[];
    selectedUser: GitHubUser | null;
    loading: boolean;
    error: string | null;
    searchHistory: string[];
    searchPage: number;
    searchPerPage: number;
    searchHasMore: boolean;
}
export interface Contributor {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    contributions: number;
}


// Responses & Props
export interface GitHubSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubRepository[];
}
export interface SearchUsersResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubUser[];
}
export interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}
export interface RepositoryCardProps {
    repository: GitHubRepository;
}
export interface SearchInputProps {
    placeholder: string;
    onSearch: (query: string) => void;
    loading?: boolean;
    debounceMs?: number;
}
export interface UserCardProps {
    user: GitHubUser;
    onClick?: () => void;
}