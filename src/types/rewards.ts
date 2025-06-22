export type RewardItem = {
  rewardPointId: string;
  points: number;
  rewardName: string;
  description: string;
  urlImage: string;
  deadlineDate: string;
  persianDeadlineDate: string;
  isActive: boolean;
  discountCode: string | null;
  usedDiscountCode: string[];
  isUsedPrize: boolean;
  urlSite: string | null;
  isFree: boolean;
  isFestival: boolean;
};

export type RewardApiResponse = {
  result: string;
  data: RewardItem[];
  message: {
    name: string;
    value: string;
    resourceNotFound: boolean;
    searchedLocation: string;
  };
};
