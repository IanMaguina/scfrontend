export interface MenuNode {
    name: string;
    icono?: string;
    url?: string;
    toolTip?: string;
    children?: MenuNode[];
    svg?: string;
  }