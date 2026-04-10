// types/index.ts

export type ResourceType = 'CPU' | 'GPU' | 'RAM' | 'Storage' | 'Network'
export type DrillLevel = 'cluster' | 'namespace' | 'pod'

export interface ResourceCosts {
  cpu: number
  ram: number
  storage: number
  network: number
  gpu: number
  efficiency: number
}

export interface CostNode {
  id: string
  name: string
  costs: ResourceCosts
  total: number
  children?: CostNode[]
}

export interface BreadcrumbItem {
  label: string
  level: DrillLevel
  nodeId?: string
}

export interface ApiUser {
  id: number
  name: string
  username: string
  email: string
}
