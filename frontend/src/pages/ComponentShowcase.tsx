import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHello } from '@/api/hello';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { Kbd } from '@/components/ui/kbd';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import {
  Bold,
  Italic,
  Underline,
  ChevronDown,
  Bell,
  Info,
  AlertTriangle,
  XCircle,
  Check,
  Terminal,
  Settings,
  User,
  LogOut,
  MoreHorizontal,
  Mail,
  Plus,
  Search,
} from 'lucide-react';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div>{children}</div>
    </div>
  );
}

export const ComponentShowcasePage = () => {
  const [sliderValue, setSliderValue] = useState([50]);
  const [progressValue] = useState(65);
  const [switchOn, setSwitchOn] = useState(true);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['hello'],
    queryFn: fetchHello,
  });

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-8">
      {/* Hero */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Component Showcase</h1>
        <p className="text-muted-foreground">Every shadcn/ui component available in this template.</p>
      </div>

      {/* Backend Status */}
      <Card>
        <CardHeader>
          <CardTitle>Backend Status</CardTitle>
          <CardDescription>
            {isLoading ? 'Checking connection...' : error ? 'Backend is offline' : 'Backend is online'}
          </CardDescription>
        </CardHeader>
        {data && (
          <CardContent>
            <p className="text-sm text-muted-foreground italic">"{data.message}"</p>
          </CardContent>
        )}
      </Card>

      <Separator />

      {/* Buttons */}
      <Section title="Button">
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
          <Button size="icon"><Plus /></Button>
        </div>
      </Section>

      <Separator />

      {/* Badge */}
      <Section title="Badge">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Section>

      <Separator />

      {/* Alert */}
      <Section title="Alert">
        <div className="space-y-3">
          <Alert>
            <Terminal className="size-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <XCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong. Please try again.</AlertDescription>
          </Alert>
        </div>
      </Section>

      <Separator />

      {/* Avatar */}
      <Section title="Avatar">
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>ZK</AvatarFallback>
          </Avatar>
        </div>
      </Section>

      <Separator />

      {/* Breadcrumb */}
      <Section title="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/">Components</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Section>

      <Separator />

      {/* Card */}
      <Section title="Card">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here.</CardDescription>
            </CardHeader>
            <CardContent><p className="text-sm">Some card content.</p></CardContent>
            <CardFooter><Button size="sm">Action</Button></CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Bell className="size-4 text-muted-foreground" />
                <span className="text-sm">Push notifications enabled</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Separator />

      {/* Tabs */}
      <Section title="Tabs">
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="p-4 border rounded-md mt-2">
            <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
          </TabsContent>
          <TabsContent value="password" className="p-4 border rounded-md mt-2">
            <p className="text-sm text-muted-foreground">Change your password here.</p>
          </TabsContent>
          <TabsContent value="settings" className="p-4 border rounded-md mt-2">
            <p className="text-sm text-muted-foreground">Configure your application settings.</p>
          </TabsContent>
        </Tabs>
      </Section>

      <Separator />

      {/* Accordion */}
      <Section title="Accordion">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>Yes. It comes with default styles that match your theme.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>Yes. It's animated by default with smooth transitions.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Separator />

      {/* Form Inputs */}
      <Section title="Form Inputs">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input id="search" type="text" placeholder="Search..." />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Type your message here..." />
          </div>
        </div>
      </Section>

      <Separator />

      {/* Select */}
      <Section title="Select">
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </Section>

      <Separator />

      {/* Checkbox & Radio & Switch */}
      <Section title="Checkbox, Radio & Switch">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm font-medium">Checkbox</p>
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="newsletter" defaultChecked />
              <Label htmlFor="newsletter">Newsletter</Label>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium">Radio Group</p>
            <RadioGroup defaultValue="option-1">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option-1" id="r1" />
                <Label htmlFor="r1">Option 1</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option-2" id="r2" />
                <Label htmlFor="r2">Option 2</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium">Switch</p>
            <div className="flex items-center gap-2">
              <Switch id="airplane" checked={switchOn} onCheckedChange={setSwitchOn} />
              <Label htmlFor="airplane">{switchOn ? 'On' : 'Off'}</Label>
            </div>
          </div>
        </div>
      </Section>

      <Separator />

      {/* Slider */}
      <Section title="Slider">
        <div className="max-w-sm space-y-2">
          <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
          <p className="text-sm text-muted-foreground">Value: {sliderValue[0]}</p>
        </div>
      </Section>

      <Separator />

      {/* Progress */}
      <Section title="Progress">
        <div className="max-w-sm space-y-2">
          <Progress value={progressValue} />
          <p className="text-sm text-muted-foreground">{progressValue}% complete</p>
        </div>
      </Section>

      <Separator />

      {/* Input OTP */}
      <Section title="Input OTP">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Section>

      <Separator />

      {/* Toggle & Toggle Group */}
      <Section title="Toggle & Toggle Group">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Toggle aria-label="Toggle bold"><Bold /></Toggle>
            <Toggle aria-label="Toggle italic"><Italic /></Toggle>
            <Toggle aria-label="Toggle underline"><Underline /></Toggle>
          </div>
          <ToggleGroup type="multiple">
            <ToggleGroupItem value="bold" aria-label="Toggle bold"><Bold /></ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic"><Italic /></ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline"><Underline /></ToggleGroupItem>
          </ToggleGroup>
        </div>
      </Section>

      <Separator />

      {/* Table */}
      <Section title="Table">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell><Badge variant="outline">Paid</Badge></TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV002</TableCell>
                <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                <TableCell>PayPal</TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV003</TableCell>
                <TableCell><Badge variant="destructive">Overdue</Badge></TableCell>
                <TableCell>Bank Transfer</TableCell>
                <TableCell className="text-right">$350.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Section>

      <Separator />

      {/* Pagination */}
      <Section title="Pagination">
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </Section>

      <Separator />

      {/* Dialog */}
      <Section title="Dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>This is a dialog description. It can contain any content.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">Dialog body content goes here.</p>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Separator />

      {/* Sheet */}
      <Section title="Sheet">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet Title</SheetTitle>
              <SheetDescription>This is a side panel that slides in from the edge.</SheetDescription>
            </SheetHeader>
            <div className="py-4 px-4">
              <p className="text-sm text-muted-foreground">Sheet content goes here.</p>
            </div>
          </SheetContent>
        </Sheet>
      </Section>

      <Separator />

      {/* Drawer */}
      <Section title="Drawer">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>This drawer slides up from the bottom.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">Drawer body content.</p>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Section>

      <Separator />

      {/* Dropdown Menu */}
      <Section title="Dropdown Menu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Open Menu <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><User /> Profile</DropdownMenuItem>
            <DropdownMenuItem><Settings /> Settings</DropdownMenuItem>
            <DropdownMenuItem><Mail /> Messages</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><LogOut /> Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      <Separator />

      {/* Popover */}
      <Section title="Popover">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Width</Label>
                  <Input id="width" defaultValue="100%" className="col-span-2" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">Height</Label>
                  <Input id="height" defaultValue="25px" className="col-span-2" />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Section>

      <Separator />

      {/* Hover Card */}
      <Section title="Hover Card">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@shadcn</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@shadcn</h4>
                <p className="text-sm text-muted-foreground">The creator of shadcn/ui.</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Section>

      <Separator />

      {/* Tooltip */}
      <Section title="Tooltip">
        <TooltipProvider>
          <div className="flex gap-3">
            <Tooltip>
              <TooltipTrigger asChild><Button variant="outline" size="icon"><Bold /></Button></TooltipTrigger>
              <TooltipContent><p>Bold</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild><Button variant="outline" size="icon"><Italic /></Button></TooltipTrigger>
              <TooltipContent><p>Italic</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild><Button variant="outline" size="icon"><Underline /></Button></TooltipTrigger>
              <TooltipContent><p>Underline</p></TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </Section>

      <Separator />

      {/* Collapsible */}
      <Section title="Collapsible">
        <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen} className="w-full max-w-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">3 items tagged</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm"><ChevronDown /></Button>
            </CollapsibleTrigger>
          </div>
          <div className="mt-2 rounded-md border px-4 py-2 text-sm">@radix-ui/primitives</div>
          <CollapsibleContent className="space-y-2 mt-2">
            <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/colors</div>
            <div className="rounded-md border px-4 py-2 text-sm">@stitches/react</div>
          </CollapsibleContent>
        </Collapsible>
      </Section>

      <Separator />

      {/* Scroll Area */}
      <Section title="Scroll Area">
        <ScrollArea className="h-48 w-full max-w-sm rounded-md border p-4">
          <div className="space-y-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="text-sm">
                Item {i + 1} — scrollable content area with many items.
              </div>
            ))}
          </div>
        </ScrollArea>
      </Section>

      <Separator />

      {/* Skeleton */}
      <Section title="Skeleton">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </Section>

      <Separator />

      {/* Spinner */}
      <Section title="Spinner">
        <div className="flex items-center gap-4">
          <Spinner className="size-4" />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </div>
      </Section>

      <Separator />

      {/* Kbd */}
      <Section title="Keyboard Shortcut">
        <div className="flex items-center gap-2">
          <span className="text-sm">Save:</span>
          <Kbd>Ctrl</Kbd>
          <span className="text-sm">+</span>
          <Kbd>S</Kbd>
        </div>
      </Section>

      <Separator />

      {/* Icons */}
      <Section title="Icons (Lucide)">
        <div className="flex flex-wrap gap-3 text-muted-foreground">
          <Bell className="size-5" />
          <Info className="size-5" />
          <AlertTriangle className="size-5" />
          <XCircle className="size-5" />
          <Check className="size-5" />
          <Terminal className="size-5" />
          <Settings className="size-5" />
          <User className="size-5" />
          <Mail className="size-5" />
          <Search className="size-5" />
          <MoreHorizontal className="size-5" />
        </div>
      </Section>
    </div>
  );
};
