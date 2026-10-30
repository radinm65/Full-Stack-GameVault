import "./StatsRow.css";

import StatCard from "./StatCard";
import IStatsRow from "../../../core/interfaces/props/dashboard/IStatsRow.props";

export default function StatsRow({ stats }: IStatsRow) {
  return (
    <div className="stats-row">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
}
