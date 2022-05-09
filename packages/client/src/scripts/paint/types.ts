export const shapes = [ 'line', 'rect', 'circle', 'rectFill', 'circleFill' ] as const;

export type ShapeType = typeof shapes[number];

export type ToolType = 'hand'| 'pen' | 'eraser' | 'pixel' | 'spoit' | ShapeType;

export type InitialColor = 'white' | 'black' | 'transparent';
