import Image from "next/image";

interface RewardCardProps {
  points: number;
  rewardName: string;
  urlImage: string;
  persianDeadlineDate: string;
}

export const RewardCard = ({
  points,
  rewardName,
  urlImage,
  persianDeadlineDate,
}: RewardCardProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <Image src={urlImage} alt={rewardName} width={200} height={200} />
        <p>{rewardName}</p>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-row">
          <Image
            src="https://reward-panel.entekhab.club/static/svg/coin.4daa4167.svg"
            alt="coin-icon"
            width={20}
            height={20}
          />
          {points}
        </div>
        <div className="flex flex-row">
          <p>انقضا:</p>
          {persianDeadlineDate}
        </div>
      </div>
    </div>
  );
};
