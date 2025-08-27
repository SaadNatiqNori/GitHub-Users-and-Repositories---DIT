import axios from 'axios';
// Types
import { GitHubUser, GitHubRepository, Contributor, SearchUsersResponse, GitHubSearchResponse } from '@/types/github';

// BASE URL
const GITHUB_API_BASE = 'https://api.github.com';

// Create axios instance
const api = axios.create({
    baseURL: GITHUB_API_BASE,
    headers: {
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
    },
});

// Add token if available
const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const githubApi = {
    // Get current authenticated user
    getCurrentUser: async (): Promise<GitHubUser> => {
        const response = await api.get<GitHubUser>('/user');
        return response.data;
    },

    // Search users
    searchUsers: async (query: string, page = 1, perPage = 30): Promise<SearchUsersResponse> => {
        const response = await api.get<SearchUsersResponse>('/search/users', {
            params: {
                q: query,
                page,
                per_page: perPage,
            },
        });
        return response.data;
    },

    // Get user by username
    getUser: async (username: string): Promise<GitHubUser> => {
        const response = await api.get<GitHubUser>(`/users/${username}`);
        return response.data;
    },

    // Get user repositories
    getUserRepos: async (username: string, page = 1, perPage = 30): Promise<GitHubRepository[]> => {
        const response = await api.get<GitHubRepository[]>(`/users/${username}/repos`, {
            params: {
                page,
                per_page: perPage,
                sort: 'updated',
                direction: 'desc',
            },
        });
        return response.data;
    },

    // Get repository contributors
    getRepoContributors: async (owner: string, repo: string): Promise<Contributor[]> => {
        try {
            const response = await api.get<Contributor[]>(`/repos/${owner}/${repo}/contributors`);
            return response.data;
        } catch (error) {
            console.error('Error fetching contributors:', error);
            return [];
        }
    },

    // Search repositories
    searchRepos: async (
        query: string,
        page = 1,
        perPage = 30
    ): Promise<GitHubSearchResponse> => {
        const response = await api.get<GitHubSearchResponse>('/search/repositories', {
            params: {
                q: query,
                page,
                per_page: perPage,
                sort: 'stars',
                order: 'desc',
            },
        });
        return response.data;
    },
};