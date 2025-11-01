
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const performers = {
  agents: [
    { name: 'MMT', phone: '7708322045', trend: 60, isUp: true },
    { name: 'Goibibo', phone: '9876543210', trend: 45, isUp: true },
    { name: 'Trivago', phone: '1234567890', trend: 10, isUp: false },
  ],
  experts: [],
  guides: [],
  vendors: []
}

export function StarPerformersCard() {
  const avatar = PlaceHolderImages.find(p => p.id === 'agentAvatar');

  return (
    <Card className="shadow-sm rounded-2xl h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold font-headline">Star Performers</CardTitle>
        <CardDescription>Top-Rated Agents, Travel Expert, Guides and Vendors</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="agents">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="experts">Travel Expert</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
          </TabsList>
          <TabsContent value="agents" className="mt-4 space-y-4">
            {performers.agents.map((agent) => (
              <div key={agent.name} className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={avatar?.imageUrl} alt={agent.name} data-ai-hint={avatar?.imageHint} />
                  <AvatarFallback>{agent.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{agent.name}</p>
                  <p className="text-sm text-muted-foreground">{agent.phone}</p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge variant="outline" className={cn(
                    agent.isUp ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50',
                    'flex items-center gap-1'
                  )}>
                    {agent.isUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    {agent.trend}%
                  </Badge>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="experts"><p className="text-muted-foreground p-4 text-center">No travel experts to show.</p></TabsContent>
          <TabsContent value="guides"><p className="text-muted-foreground p-4 text-center">No guides to show.</p></TabsContent>
          <TabsContent value="vendors"><p className="text-muted-foreground p-4 text-center">No vendors to show.</p></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
