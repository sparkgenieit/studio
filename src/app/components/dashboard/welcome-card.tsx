
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown } from "lucide-react"

const statPills = [
    { label: 'Total Agents', value: '263', className: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20' },
    { label: 'Total Driver', value: '122', className: 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20' },
    { label: 'Total Guide', value: '1', className: 'bg-chart-5/10 text-chart-5 border-chart-5/20 hover:bg-chart-5/20' }
]

export function WelcomeCard() {
    return (
        <Card className="shadow-lg rounded-3xl">
            <div className="grid md:grid-cols-2">
                <div className="p-6">
                    <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-bold font-headline">Welcome back, Admin 👋</CardTitle>
                        <CardDescription className="pt-2">
                            Your progress this week is Awesome. Let’s keep it up and get a lot of points reward!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 mt-6 flex gap-4">
                        {statPills.map(pill => (
                            <Badge key={pill.label} variant="outline" className={`py-2 px-4 rounded-lg ${pill.className}`}>
                                <div className="flex flex-col">
                                    <span className="text-xs">{pill.label}</span>
                                    <span className="font-bold text-lg">{pill.value}</span>
                                </div>
                            </Badge>
                        ))}
                    </CardContent>
                </div>
                <div className="p-6 border-l flex flex-col justify-center">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Last Month Profit</p>
                            <p className="text-2xl font-bold">₹497,538.00</p>
                        </div>
                        <p className="text-sm text-muted-foreground self-start">October 2025</p>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Current Month Profit</p>
                            <p className="text-2xl font-bold">₹151,543.00</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-sm text-muted-foreground">November 2025</p>
                            <Badge variant="destructive" className="flex items-center gap-1 mt-1">
                                <ArrowDown className="h-3 w-3" /> 69.54%
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
