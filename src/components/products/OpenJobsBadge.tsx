import { Badge } from "@/components/ui";

interface OpenJobsBadgeProps {
  count: number;
}

export function OpenJobsBadge({ count }: OpenJobsBadgeProps) {
  if (count <= 0) return null;
  return <Badge variant="blue">มี {count} งานซื้อ</Badge>;
}