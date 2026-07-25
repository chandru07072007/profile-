export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string; // lucide icon name
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  number: string;
  liveUrl?: string;
}

export interface ShowcaseProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  isCutCorner?: boolean;
}

