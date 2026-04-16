export type PortfolioProject = {
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  outcome: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'Private Knowledge Assistant for Regional Hospital Group',
    industry: 'Healthcare',
    challenge:
      'Clinical and operations teams needed fast access to internal protocols without exposing PHI to external AI vendors.',
    solution:
      'Deployed an on-prem LLM gateway with role-based retrieval across policy, SOP, and care pathway documents.',
    outcome:
      'Reduced policy lookup time by 61% and passed security review with zero critical findings.',
  },
  {
    title: 'Contract Intelligence Copilot for Enterprise Legal Team',
    industry: 'Legal Services',
    challenge:
      'Legal operations wanted AI-assisted clause analysis while keeping M&A documents inside company infrastructure.',
    solution:
      'Implemented a VPC-hosted LLM stack with document chunking, audit trails, and red-team tested prompt guards.',
    outcome:
      'Cut first-pass contract review cycles from 3 days to under 1 day for standard agreements.',
  },
  {
    title: 'Secure Manufacturing Troubleshooting Assistant',
    industry: 'Advanced Manufacturing',
    challenge:
      'Plant engineers needed faster root-cause analysis from proprietary machine logs and manuals.',
    solution:
      'Built an edge-deployed RAG workflow with local vector indexing and strict network egress controls.',
    outcome:
      'Improved mean-time-to-resolution by 38% and avoided sending sensitive telemetry offsite.',
  },
];

export const services = [
  {
    title: 'Private LLM Strategy & Architecture',
    description:
      'Roadmap your secure AI rollout across infrastructure, governance, and ROI milestones.',
  },
  {
    title: 'On-Prem or VPC Deployment',
    description:
      'Deploy private server LLMs in your environment with hardened networking and access controls.',
  },
  {
    title: 'RAG + Workflow Automation',
    description:
      'Connect internal data and automate high-value workflows to reduce manual operations.',
  },
];
