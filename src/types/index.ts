export type PlatformName = 'Instagram' | 'YouTube' | 'TikTok';

export type MetricEvidence = 'verified' | 'visible-sample' | 'estimated';
export type MediaApproval = 'approved' | 'placeholder' | 'pending';

export type CreatorCategory =
  | 'Sailing & liveaboard'
  | 'Captains & delivery'
  | 'Marine education'
  | 'Diving & underwater'
  | 'Surf & watersports'
  | 'Boat buying & media';

export interface ViewEstimate {
  low: number;
  high: number;
  evidence: MetricEvidence;
  period: '30 days';
  note: string;
}

export interface PlatformMetric {
  platform: PlatformName;
  handle: string;
  url: string;
  followers: number;
}

export type CreatorMapZone = 'europe' | 'caribbean' | 'pacific' | 'international';
export type CreatorLocationPrecision = 'place' | 'region' | 'route' | 'global';
export type CreatorLocationEvidence = 'profile-explicit' | 'content-visible' | 'roster-region';

export interface CreatorMapLocation {
  label: string;
  latitude: number;
  longitude: number;
  zone: CreatorMapZone;
  precision: CreatorLocationPrecision;
  evidence: CreatorLocationEvidence;
  note: string;
}

export interface Creator {
  id: string;
  slug: string;
  displayName: string;
  handle: string;
  profileLabel: string;
  schemaType: 'Person' | 'Organization';
  headline: string;
  shortBio: string;
  fullBio: string;
  followers: number;
  posts: number;
  verifiedProfile: boolean;
  featured: boolean;
  mediaApproval: MediaApproval;
  categories: CreatorCategory[];
  contentFormats: string[];
  brandFit: string[];
  languages: string[];
  operatingRegions: string[];
  mapLocation: CreatorMapLocation;
  platforms: PlatformMetric[];
  viewEstimate: ViewEstimate;
  visibleViewSamples?: number[];
  image: string;
  sourceProof: string;
  sourceCapturedAt: string;
}

export interface CampaignBrief {
  objective: string;
  market: string;
  audience: string;
  category: string;
  platforms: string[];
  formats: string[];
  budget: string;
  timing: string;
  usageRights: string;
  exclusivity: string;
  notes: string;
  contactName: string;
  company: string;
  email: string;
  selectedCreatorSlugs: string[];
}
