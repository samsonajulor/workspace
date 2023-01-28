// PAYLOAD INTERFACES
export interface PayloadType {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface Source {
  id: string | null;
  name: string;
}

// ACTIONS INTERFACES
export interface ActionType {
  type: 'FETCH_REQUEST' | 'FETCH_RESPONSE' | 'FETCH_ERROR';
  payload?: PayloadType[] | unknown;
}

// STATE INTERFACES
export interface StateType {
  isLoading: boolean;
  data: PayloadType[] | unknown;
  error?: unknown | null;
}

// SIDEBAR INTERFACES
export interface SidebarItem {
    title: string;
    path: string;
    icon?: any;
    notification?: number;
    iconOpened?: any;
    iconClosed?: any;
    subnav?: SidebarItem[];
}
