
"use client"

import * as React from "react"
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from "@/lib/utils";

const vehicleStats = [
  { label: "Total Vehicles", value: 196 },
  { label: "On Route Vehicles", value: 0 },
  { label: "Available Vehicles", value: 196 },
  { label: "Upcoming Vehicles", value: 0 },
];

const driverStats = [
    { label: "Active Drivers", value: 122 },
    { label: "On Route Drivers", value: 15 },
    { label: "In-active Drivers", value: 14 },
    { label: "Available Drivers", value: 108 },
];

const overviewItems = [
    {
        type: 'Vehicle',
        title: 'Vehicle Overview',
        description: 'Insights into Fleet Performance',
        stats: vehicleStats,
        imageId: 'vehicle'
    },
    {
        type: 'Driver',
        title: 'Driver Overview',
        description: 'Driver Performance Overview',
        stats: driverStats,
        imageId: 'driver'
    },
    {
        type: 'Vendor',
        title: 'Vendor Overview',
        description: 'Vendor Performance Overview',
        stats: [],
        imageId: null
    },
    {
        type: 'Hotel',
        title: 'Hotel Overview',
        description: 'Hotel Performance Overview',
        stats: [],
        imageId: null
    }
]

export function OverviewCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const vehicleImage = PlaceHolderImages.find(p => p.id === 'vehicle');
  const driverImage = PlaceHolderImages.find(p => p.id === 'driver');

  const getImage = (imageId: string | null) => {
    if (imageId === 'vehicle') return vehicleImage;
    if (imageId === 'driver') return driverImage;
    return null;
  }

  return (
    <Card className="shadow-sm rounded-2xl h-full bg-gradient-to-br from-accent to-primary text-primary-foreground relative overflow-hidden">
        <Carousel setApi={setApi} className="h-full">
            <CarouselContent className="h-full">
                {overviewItems.map((item, index) => {
                    const image = getImage(item.imageId);
                    return (
                        <CarouselItem key={index} className="h-full">
                            <div className="flex flex-col h-full">
                                <CardHeader className="flex-shrink-0">
                                    <CardTitle className="text-lg font-bold font-headline">{item.title}</CardTitle>
                                    <CardDescription className="text-primary-foreground/80">{item.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col justify-center">
                                    {item.stats.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-3">
                                        {item.stats.map(stat => (
                                            <div key={stat.label} className="bg-card/20 backdrop-blur-sm rounded-lg p-3 text-center">
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                            <p className="text-xs text-primary-foreground/90">{stat.label}</p>
                                            </div>
                                        ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-primary-foreground/80">No data available.</p>
                                    )}
                                    {image && (
                                        <div className="absolute bottom-0 right-0">
                                            <Image
                                                src={image.imageUrl}
                                                alt={image.description}
                                                width={120}
                                                height={100}
                                                className="opacity-80"
                                                data-ai-hint={image.imageHint}
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </div>
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
            <div className="absolute top-4 right-4 flex items-center space-x-1">
                {overviewItems.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => api?.scrollTo(i)}
                        className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            current === i ? "bg-white" : "bg-white/50"
                        )}
                    />
                ))}
            </div>
        </Carousel>
    </Card>
  );
}
