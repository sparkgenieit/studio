
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PlaceHolderImages } from '@/lib/placeholder-images';

const stats = [
  { title: "Total Itineraries", value: "28,521", imageId: "traveller" },
  { title: "Total Revenue", value: "₹23,783,241.00", imageId: "moneyBag" },
  { title: "Total Confirm Bookings", value: "714", imageId: "calculator" },
  { title: "Cancelled Booking", value: "20", imageId: "cancelled" },
];

export function StatsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {stats.map(stat => {
        const image = PlaceHolderImages.find(p => p.id === stat.imageId);
        return (
          <Card key={stat.title} className="shadow-sm rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
               {image && (
                <Image
                  src={image.imageUrl}
                  width={48}
                  height={48}
                  alt={image.description}
                  data-ai-hint={image.imageHint}
                />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
