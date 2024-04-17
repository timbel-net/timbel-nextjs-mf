import { NextConfig } from 'next'

interface Remote {
  name: string
  host: string
}

export function federation(name: string, remotes?: Remote[], nextConfig?: NextConfig): NextConfig;
