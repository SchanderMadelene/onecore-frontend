export type ControlType = 'select' | 'boolean' | 'text' | 'number' | 'radio';

export type ViewMode = 'canvas' | 'code' | 'props';

export interface PropDefinition {
  name: string;
  type: string;
  controlType: ControlType;
  options?: string[];
  defaultValue?: any;
  description?: string;
  required?: boolean;
}

export interface ComponentDefinition {
  name: string;
  description: string;
  component: React.ComponentType<any>;
  props: PropDefinition[];
  defaultCode: string;
}
