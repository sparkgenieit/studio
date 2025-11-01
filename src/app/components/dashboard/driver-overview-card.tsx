
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PlaceHolderImages } from '@/lib/placeholder-images';

const driverStats = [
  { label: "Active Drivers", value: 122 },
  { label: "On Route Drivers", value: 15 },
  { label: "In-active Drivers", value: 14 },
  { label: "Available Drivers", value: 108 },
];

export function DriverOverviewCard() {
  const driverImage = PlaceHolderImages.find(p => p.id === 'driver');
  return (
    <Card className="shadow-sm rounded-2xl h-full bg-gradient-to-br from-accent to-primary text-primary-foreground relative overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-bold font-headline">Driver Overview</CardTitle>
        <CardDescription className="text-primary-foreground/80">Driver Performance Overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {driverStats.map(stat => (
            <div key={stat.label} className="bg-card/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-primary-foreground/90">{stat.label}</p>
            </div>
          ))}
        </div>
        {driverImage && (
            <div className="absolute bottom-0 right-0">
                <Image
                    src={driverImage.imageUrl}
                    alt={driverImage.description}
                    width={120}
                    height={100}
                    className="opacity-80"
                    data-ai-hint={driverImage.imageHint}
                />
            </div>
        )}
      </CardContent>
    </Card>
  );
}
