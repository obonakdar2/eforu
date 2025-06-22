import Image from "next/image";
import type { RewardItem } from "~/types/rewards";
import { Card } from "~/components/ui/card";

interface RewardCardProps {
  data: RewardItem;
}

export const RewardCard = ({ data }: RewardCardProps) => {
  return (
    <Card className="h-full">
      <div className="flex h-full flex-col justify-between p-6">
        {/* Card Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <Image
                src={data.urlImage}
                alt={data.rewardName}
                width={46}
                height={46}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {data.rewardName}
              </h3>
              {data.discountCode && (
                <span className="mt-1 inline-block rounded-full bg-red-100 px-2 py-1 text-xs text-red-600">
                  {data.discountCode}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mb-4 line-clamp-3 overflow-hidden text-sm leading-relaxed text-gray-600">
          {data.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="https://reward-panel.entekhab.club/static/svg/coin.4daa4167.svg"
              alt="coin-icon"
              width={24}
              height={24}
            />

            <span className="font-bold text-gray-900">{data.points}</span>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">انقضا:</p>
            <p className="text-xs font-medium text-gray-700">
              {data.persianDeadlineDate}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
