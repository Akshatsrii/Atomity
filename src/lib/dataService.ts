// lib/dataService.ts
// Generates deterministic cost data seeded from API user IDs

import type { CostNode, ApiUser } from '../types'

function seededRand(seed: number, min: number, max: number): number {
  const x = Math.sin(seed) * 10000
  const r = x - Math.floor(x)
  return Math.floor(r * (max - min + 1)) + min
}

function buildCosts(seed: number, totalBudget: number) {
  const cpu = Math.floor(totalBudget * (0.30 + seededRand(seed, 0, 10) / 100))
  const ram = Math.floor(cpu * (0.5 + seededRand(seed + 1, 0, 10) / 100))
  const storage = Math.floor(cpu * (0.08 + seededRand(seed + 2, 0, 5) / 100))
  const network = Math.floor(cpu * (0.12 + seededRand(seed + 3, 0, 5) / 100))
  const gpu = totalBudget > 3000 ? Math.floor(cpu * (0.3 + seededRand(seed + 4, 0, 10) / 100)) : 0
  const efficiency = seededRand(seed + 5, 6, 45)
  const total = cpu + ram + storage + network + gpu
  return { cpu, ram, storage, network, gpu, efficiency, total }
}

export function buildClusterData(users: ApiUser[]): CostNode[] {
  const clusterBudgets = [6800, 5200, 3600, 1500]
  const clusterLetters = ['A', 'B', 'C', 'D']

  return clusterLetters.map((letter, ci) => {
    const user = users[ci] || users[0]
    const budget = clusterBudgets[ci]
    const { cpu, ram, storage, network, gpu, efficiency, total } = buildCosts(user.id * 10 + ci, budget)

    // Build namespaces (3–4 per cluster)
    const nsCount = ci === 0 ? 4 : ci === 1 ? 4 : ci === 2 ? 3 : 3
    const nsBudgets = Array.from({ length: nsCount }, (_, ni) =>
      Math.floor(total * (0.4 - ni * 0.08) * (0.9 + seededRand(user.id + ni, 0, 10) / 100))
    )

    const namespaces: CostNode[] = nsBudgets.map((nsBudget, ni) => {
      const nsUser = users[(ci * 4 + ni) % users.length]
      const nsCosts = buildCosts(nsUser.id * 100 + ni, nsBudget)

      // Build pods (3–4 per namespace)
      const podCount = ni === 0 ? 4 : 3
      const podBudgets = Array.from({ length: podCount }, (_, pi) =>
        Math.floor(nsCosts.total * (0.45 - pi * 0.1) * (0.9 + seededRand(nsUser.id + pi, 0, 8) / 100))
      )

      const pods: CostNode[] = podBudgets.map((podBudget, pi) => {
        const podUser = users[(ci * 16 + ni * 4 + pi) % users.length]
        const podCosts = buildCosts(podUser.id * 1000 + pi, podBudget)
        return {
          id: `cluster-${letter}-ns-${ni + 1}-pod-${pi + 1}`,
          name: `Pod ${String.fromCharCode(65 + pi)}`,
          costs: podCosts,
          total: podCosts.total,
        }
      })

      return {
        id: `cluster-${letter}-ns-${ni + 1}`,
        name: `Namespace ${String.fromCharCode(65 + ni)}`,
        costs: nsCosts,
        total: nsCosts.total,
        children: pods,
      }
    })

    return {
      id: `cluster-${letter}`,
      name: `Cluster ${letter}`,
      costs: { cpu, ram, storage, network, gpu, efficiency },
      total,
      children: namespaces,
    }
  })
}
