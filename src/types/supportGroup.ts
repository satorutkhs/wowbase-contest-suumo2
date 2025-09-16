export interface SupportGroup {
  id: string;
  orgName: string;           // 団体名
  representative: string;    // 代表者
  contact: string;           // 連絡先 (メール/電話)
  activityDescription: string; // 支援活動内容
  peopleCount: number;       // 想定人数
  desiredPeriod: string;     // 希望期間 (テキスト)
  desiredArea: string;       // 希望エリア
  monthlyBudget?: number;    // 月額予算
  specialNotes?: string;     // 特記事項
  createdAt: string;         // ISO 日付
}
