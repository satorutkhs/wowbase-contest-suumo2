export interface OwnerInfo {
  name: string;
  contact: string;
}

export interface Property {
  id: string;
  address: string;
  rent: number;          // 通常家賃
  supportPrice: number;  // 支援価格
  floorPlan: string;     // 間取り
  photos: string[];
  lat: number;
  lng: number;
  owner: OwnerInfo;
  equipment?: string[];
  ownerMessage?: string;
}
