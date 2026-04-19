import type { NextConfig } from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repository = process.env.GITHUB_REPOSITORY ?? '';
const repoName = repository.split('/')[1] ?? '';
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
