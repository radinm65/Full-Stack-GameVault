import "./StatCard.css";

import IDashboardStat from "../../../core/interfaces/models/dashboard/IDashboardStat";

export default function StatCard({ value, label, icon: Icon }: IDashboardStat) {
  return (
    <div className="stat-card">
      <div className="stat-card-text">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
      <span className="stat-card-icon">
        <Icon size={28} />
      </span>
    </div>
  );
}
