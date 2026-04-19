import type { NextConfig } from 'next';

function getRepositoryName(repository: string): string {
  if (!repository) {
    return '';
  }

  const parts = repository.split('/').filter(Boolean);
  return parts.length >= 2 ? parts[parts.length - 1] : '';
}

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repository = process.env.GITHUB_REPOSITORY ?? '';
const repoName = getRepositoryName(repository);
const isUserOrOrgPagesSite = repoName ? repoName.endsWith('.github.io') : false;
const basePath = isGithubActions && repoName && !isUserOrOrgPagesSite ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath,
  ...(basePath ? { assetPrefix: basePath } : {}),
};

export default nextConfig;
