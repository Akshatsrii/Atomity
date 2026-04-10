// hooks/useClusterData.ts
import { useQuery } from '@tanstack/react-query'
import type { CostNode, ApiUser } from '../types'
import { buildClusterData } from '../lib/dataService'

async function fetchUsers(): Promise<ApiUser[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export function useClusterData() {
  return useQuery<CostNode[]>({
    queryKey: ['cluster-data'],
    queryFn: async () => {
      const users = await fetchUsers()
      return buildClusterData(users)
    },
    staleTime: 5 * 60 * 1000,   // 5 min — no refetch while fresh
    gcTime: 30 * 60 * 1000,     // 30 min — keep in cache
    retry: 2,
  })
}
