/**
 * Team members. Names, photos and bios are placeholders: replace them with the
 * real ones (photos go in /public/images/team/).
 */
export interface Member {
  name?: string;
  role: string;
  bio?: string;
  photo?: string;
}

export const team: Member[] = [
  { role: "CEO" },
  { role: "Creative Director" },
  { role: "Level Designer" },
  { role: "Environment Artist" },
  { role: "Developer" },
  { role: "Game Designer" },
  { role: "Model Artist" },
];
