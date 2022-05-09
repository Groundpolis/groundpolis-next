import { ToolType } from "./types";

export const getToolIconOf = (type: ToolType) => {
	switch (type) {
		case 'hand': return "fas fa-paw";
		case 'pen': return "fas fa-pencil";
		case 'eraser': return "fas fa-eraser";
		case 'line': return "fas fa-slash";
		case 'rect': return "far fa-square";
		case 'circle': return "far fa-circle";
		case 'rectFill': return "fas fa-square";
		case 'circleFill': return "fas fa-circle";
		case 'spoit': return "fas fa-eye-dropper";
		default: return null;
	}
};
