import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetPlayground({
  side,
  showCloseButton,
}: {
  side: "top" | "right" | "bottom" | "left"
  showCloseButton: boolean
}) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open sheet
      </SheetTrigger>
      <SheetContent side={side} showCloseButton={showCloseButton}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Left and right sheets cap at sm:max-w-sm; top and bottom size to
            their content.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" size="sm" />}>
            Close
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export function SheetSides() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline" size="sm" />}>
            {side}
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>side=&quot;{side}&quot;</SheetTitle>
              <SheetDescription>
                The enter and exit transforms follow the side automatically.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}

export function SheetWithForm() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Edit settings
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Project settings</SheetTitle>
          <SheetDescription>
            Changes save when you close the sheet.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sheet-name">Name</Label>
            <Input id="sheet-name" defaultValue="design-system" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sheet-domain">Domain</Label>
            <Input id="sheet-domain" defaultValue="ds.example.com" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose render={<Button size="sm" />}>Save</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
