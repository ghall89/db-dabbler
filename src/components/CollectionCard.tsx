import { Database, EllipsisVertical } from 'lucide-react';
import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CollectionCardProps {
  collectionName: string;
  slug: string;
}

export default function CollectionCard({
  collectionName,
  slug,
}: CollectionCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-center gap-6 aspect-video justify-center">
          <Database className="size-9" />
          <span>{collectionName}</span>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link
          href={`/collections/${slug}`}
          className={buttonVariants({ variant: 'outline' })}
        >
          View
        </Link>
      </CardFooter>
    </Card>
  );
}
