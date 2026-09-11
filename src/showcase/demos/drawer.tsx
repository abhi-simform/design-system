import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function DrawerPlayground({
  swipeDirection,
  showSwipeHandle,
  modal,
}: {
  swipeDirection: "up" | "down" | "left" | "right"
  showSwipeHandle: boolean
  modal: boolean
}) {
  return (
    <Drawer
      swipeDirection={swipeDirection}
      showSwipeHandle={showSwipeHandle}
      modal={modal}
    >
      <DrawerTrigger render={<Button variant="outline" />}>
        Open drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move goal</DrawerTitle>
          <DrawerDescription>
            Drag the sheet in the swipe direction to dismiss it.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button size="sm">Set goal</Button>
          <DrawerClose render={<Button variant="ghost" size="sm" />}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function DrawerBasic() {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button size="sm">Confirm</Button>
          <DrawerClose render={<Button variant="ghost" size="sm" />}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function DrawerWithSnapPoints() {
  return (
    <Drawer snapPoints={[0.4, 1]} showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>
        Snap points
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Two stops</DrawerTitle>
          <DrawerDescription>
            snapPoints={"{[0.4, 1]}"} — drag between 40% and full height.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4 text-sm text-muted-foreground">
          {Array.from({ length: 6 }, (_, index) => (
            <p key={index} className="mb-3">
              Content line {index + 1}.
            </p>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export function DrawerNonModal() {
  return (
    <Drawer modal={false} showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>
        Non-modal
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Still interactive behind</DrawerTitle>
          <DrawerDescription>
            With modal={"{false}"} the rest of the page keeps taking clicks.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="ghost" size="sm" />}>
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
