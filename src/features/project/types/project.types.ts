export type ProjectStatut = 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'SUSPENDED';
export type ProjectStageStatut = 'OPEN' | 'FUNDED' | 'CLOSED';

export interface ProjectStage {
  id: string;
  projectId: string;
  title: string;
  description: string;
  targetAmount: number;
  collectedAmount: number;
  stageOrder: number;
  statut: ProjectStageStatut;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  statut: ProjectStatut;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  stages?: ProjectStage[];
}

export interface CreateProjectStagePayload {
  title: string;
  description: string;
  targetAmount: number;
  stageOrder: number;
}

export interface CreateProjectPayload {
  title: string;
  description: string;
  image?: string;
  category?: string;
  statut: ProjectStatut;
  stages: CreateProjectStagePayload[];
}

export interface UpdateProjectPayload {
  title?: string;
  description?: string;
  image?: string;
  category?: string;
  statut?: ProjectStatut;
}

export interface UpdateProjectStagePayload {
  title?: string;
  description?: string;
  targetAmount?: number;
  stageOrder?: number;
  statut?: ProjectStageStatut;
}
