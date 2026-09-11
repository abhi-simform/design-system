import { CreditCardIcon, MailIcon, SearchIcon, SendIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export function InputGroupPlayground({
  align,
  showButton,
}: {
  align: "inline-start" | "inline-end" | "block-start" | "block-end"
  showButton: boolean
}) {
  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupInput placeholder="Search components…" />
      <InputGroupAddon align={align}>
        <SearchIcon />
        {showButton ? (
          <InputGroupButton className="ml-auto">Go</InputGroupButton>
        ) : null}
      </InputGroupAddon>
    </InputGroup>
  )
}

export function InputGroupAlignments() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="inline-start" />
        <InputGroupAddon align="inline-start">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="inline-end" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="block-start">
          <InputGroupText>Subject</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="block-start addon above" />
      </InputGroup>
    </div>
  )
}

export function InputGroupWithText() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <MailIcon />
        </InputGroupAddon>
        <InputGroupInput type="email" placeholder="name@example.com" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <CreditCardIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="4242 4242 4242 4242" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function InputGroupWithTextarea() {
  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupTextarea placeholder="Write a message…" />
      <InputGroupAddon align="block-end">
        <InputGroupButton className="ml-auto" variant="default" size="sm">
          <SendIcon data-icon="inline-start" />
          Send
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export function InputGroupButtonSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {(["xs", "sm"] as const).map((size) => (
        <InputGroup key={size}>
          <InputGroupInput placeholder={`Button size ${size}`} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size={size}>Apply</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      ))}
    </div>
  )
}
