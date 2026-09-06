import { Clock3 } from "lucide-react";

export function AccountUnavailableNotice({
  detail = "Kreyasyon kont ak opsyon pèsonèl yo ap vini byento. Tout gid piblik yo rete disponib san kont."
}: {
  detail?: string;
}) {
  return (
    <div className="account-unavailable-notice" role="status">
      <Clock3 aria-hidden="true" size={22} />
      <div>
        <strong>Sèvis kont lan pa disponib pou kounye a</strong>
        <p>{detail}</p>
      </div>
    </div>
  );
}
