export type MobileViewer = {
  id: string;
  email: string | null;
  displayName: string | null;
  residenceCountry: string | null;
  phone?: string | null;
  birthDate?: string | null;
  photoUrl?: string | null;
  hasCustomAvatar?: boolean;
  notificationsEnabled?: boolean;
  savedArticleSlugs?: string[];
};
