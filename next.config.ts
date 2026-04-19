import type { NextConfig } from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repository = process.env.GITHUB_REPOSITORY ?? '';
const repoParts = repository.split('/');
const repoName = repoParts.length > 1 ? repoParts[1] : '';
const isUserOrOrgPagesSite = repoName.endsWith('.github.io');
const basePath = isGithubActions && repoName && !isUserOrOrgPagesSite ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath,
  ...(basePath ? { assetPrefix: basePath } : {}),
};

export default nextConfig;
