import NotesWidget from "./NotesWidget";
import CalendarWidget from "./CalendarWidget";
import ImageWidget from "./ImageWidget";

export type WidgetItem = {
  id: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export const widgetMap: Record<string, React.FC> = {
  notes: NotesWidget,
  calendar: CalendarWidget,
  image: ImageWidget,
};