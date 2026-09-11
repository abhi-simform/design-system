import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectPlayground({
  size,
  disabled,
  invalid,
}: {
  size: "sm" | "default"
  disabled: boolean
  invalid: boolean
}) {
  return (
    <Select defaultValue="medium">
      <SelectTrigger
        size={size}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className="w-48"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="small">Small</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="large">Large</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function SelectBasic() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <Label>Fruit</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export function SelectGrouped() {
  return (
    <Select defaultValue="ist">
      <SelectTrigger className="w-56">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="ist">India (IST)</SelectItem>
          <SelectItem value="jst">Japan (JST)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">London (GMT)</SelectItem>
          <SelectItem value="cet">Berlin (CET)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function SelectSizes() {
  return (
    <div className="flex flex-col gap-4">
      {(["sm", "default"] as const).map((size) => (
        <Select key={size} defaultValue="a">
          <SelectTrigger size={size} className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">size=&quot;{size}&quot;</SelectItem>
            <SelectItem value="b">Another option</SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  )
}

export function SelectStates() {
  return (
    <div className="flex flex-col gap-4">
      <Select disabled>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Disabled" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger aria-invalid="true" className="w-48">
          <SelectValue placeholder="Invalid" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="b">
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Enabled option</SelectItem>
          <SelectItem value="b">Selected option</SelectItem>
          <SelectItem value="c" disabled>
            Disabled option
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
