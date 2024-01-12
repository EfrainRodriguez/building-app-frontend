export interface ProjectItem {
  name: string;
  unitValue: number;
  proposedValue?: number;
}

export interface Project {
  _id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  images: string[];
  items: ProjectItem[];
  createdAt?: Date;
  updatedAt?: Date;
}