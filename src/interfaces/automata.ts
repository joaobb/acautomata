export interface AntVG6Payload {
  nodes: {
    id: string;
    isInitial?: boolean;
    isAcceptance?: boolean;
    label: string;
  }[];
  edges: {
    id: string;
    source: string;
    target: string;
    label: string;
    type?: string;
  }[];
}
