import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogPlayground({
  showCloseButton,
  showFooterClose,
}: {
  showCloseButton: boolean
  showFooterClose: boolean
}) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open dialog
      </DialogTrigger>
      <DialogContent showCloseButton={showCloseButton}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton={showFooterClose}>
          <Button size="sm">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogBasic() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Edit profile
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your display name. This is visible to your whole team.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="dialog-name">Name</Label>
          <Input id="dialog-name" defaultValue="Ada Lovelace" />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" size="sm" />}>
            Cancel
          </DialogClose>
          <Button size="sm">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogWithoutCloseButton() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        No corner X
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Confirm your choice</DialogTitle>
          <DialogDescription>
            With showCloseButton={"{false}"} the only way out is an explicit
            action.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" size="sm" />}>
            Not now
          </DialogClose>
          <Button size="sm">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogScrollable() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Long content
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>Last updated 11 September 2026.</DialogDescription>
        </DialogHeader>
        <div className="max-h-64 overflow-y-auto pr-2 text-sm text-muted-foreground">
          {Array.from({ length: 8 }, (_, index) => (
            <p key={index} className="mb-3">
              Section {index + 1}. The dialog itself does not scroll — give an
              inner wrapper a max height and overflow so the header and footer
              stay pinned.
            </p>
          ))}
        </div>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}
