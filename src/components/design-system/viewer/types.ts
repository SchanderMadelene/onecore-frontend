/**
 * Design System Component Viewer Types
 * Defines the structure for documenting and showcasing components
 */

export type ControlType = 'select' | 'boolean' | 'text' | 'number' | 'radio';

export interface PropOption {
  label: string;
  value: string;
}

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
  control: ControlType;
  options?: PropOption[];
  required?: boolean;
}

export interface ComponentDefinition {
  name: string;
  description: string;
  category: 'ui' | 'form' | 'layout' | 'feedback' | 'navigation';
  importPath: string;
  props: PropDefinition[];
  usage?: string;
  examples?: ComponentExample[];
}

export interface ComponentExample {
  title: string;
  description?: string;
  props: Record<string, unknown>;
}

export type ViewMode = 'simple' | 'developer' | 'interactive';

export interface ComponentState {
  [key: string]: unknown;
}
