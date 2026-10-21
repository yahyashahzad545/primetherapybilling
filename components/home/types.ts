export interface ServiceTag {
  text: string;
  row: number;
}

export interface ServiceCard {
  id: number;
  title: string;
  theme: "purple" | "peach" | "pink";
  offset: boolean;
  tags: ServiceTag[];
  description: string;
  buttonText: string;
  href?: string;
  // Icon image shown above the tags until the card is hovered; empty keeps a dashed placeholder
  icon?: string;
}
