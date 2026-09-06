const DAILY_MESSAGES = [
  "Èske w pare pou avanse ak pwojè vwayaj ou?",
  "Ann prepare pwochen etap vwayaj ou ansanm.",
  "Pran yon ti moman pou verifye pwochen etap ou.",
  "Chak bon vwayaj kòmanse ak bon enfòmasyon.",
  "Jodi a se yon bon jou pou prepare pwojè ou."
] as const;

export function getDailyMessage(now = new Date()): string {
  const dayNumber = Math.floor(now.getTime() / 86_400_000);
  return DAILY_MESSAGES[dayNumber % DAILY_MESSAGES.length] ?? DAILY_MESSAGES[0];
}
