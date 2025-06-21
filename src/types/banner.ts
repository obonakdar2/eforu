export interface SiteBanner {
  siteBannerId: string;
  imageUrl: string;
  link: string;
  positionKey: string;
  description: string;
  order: number;
}

export interface BannerApiResponse {
  result: string;
  data: SiteBanner[];
  message: {
    name: string;
    value: string;
    resourceNotFound: boolean;
    searchedLocation: string;
  };
}
