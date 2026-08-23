type StructuredDataProps = {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
};

export function StructuredData({ data }: StructuredDataProps) {
  const serialized = JSON.stringify(data).replaceAll("<", "\\u003c");
  return <script type="application/ld+json">{serialized}</script>;
}
