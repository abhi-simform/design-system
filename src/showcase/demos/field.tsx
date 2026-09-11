import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function FieldPlayground({
  orientation,
  showDescription,
  showError,
}: {
  orientation: "vertical" | "horizontal" | "responsive"
  showDescription: boolean
  showError: boolean
}) {
  return (
    <Field orientation={orientation} className="w-full max-w-md">
      <FieldLabel htmlFor="field-playground">Workspace name</FieldLabel>
      <FieldContent>
        <Input id="field-playground" placeholder="acme-inc" />
        {showDescription ? (
          <FieldDescription>
            Lowercase letters, numbers and hyphens only.
          </FieldDescription>
        ) : null}
        {showError ? (
          <FieldError errors={[{ message: "That name is already taken." }]} />
        ) : null}
      </FieldContent>
    </Field>
  )
}

export function FieldOrientations() {
  return (
    <div className="flex w-full flex-col gap-8">
      {(["vertical", "horizontal", "responsive"] as const).map(
        (orientation) => (
          <Field key={orientation} orientation={orientation}>
            <FieldLabel htmlFor={`field-${orientation}`}>
              {orientation}
            </FieldLabel>
            <FieldContent>
              <Input id={`field-${orientation}`} placeholder="Value" />
              <FieldDescription>
                {orientation === "responsive"
                  ? "Horizontal above the sm breakpoint, vertical below it."
                  : `orientation="${orientation}"`}
              </FieldDescription>
            </FieldContent>
          </Field>
        ),
      )}
    </div>
  )
}

export function FieldWithErrors() {
  return (
    <Field className="w-full max-w-md">
      <FieldLabel htmlFor="field-password">Password</FieldLabel>
      <FieldContent>
        <Input id="field-password" type="password" aria-invalid="true" />
        {/* Several errors render as a list; duplicates are removed. */}
        <FieldError
          errors={[
            { message: "Must be at least 12 characters." },
            { message: "Must contain a number." },
            { message: "Must contain a number." },
          ]}
        />
      </FieldContent>
    </Field>
  )
}

export function FieldSets() {
  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend>Notifications</FieldLegend>
      <FieldDescription>
        Choose how you would like to hear from us.
      </FieldDescription>
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Product updates</FieldTitle>
            <FieldDescription>New features and changes.</FieldDescription>
          </FieldContent>
          <Switch defaultChecked />
        </Field>
        <FieldSeparator />
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Security alerts</FieldTitle>
            <FieldDescription>Sign-ins from new devices.</FieldDescription>
          </FieldContent>
          <Switch defaultChecked />
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}

export function FieldFullForm() {
  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend variant="label">Create a project</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-name">Name</FieldLabel>
          <Input id="field-name" placeholder="My project" />
        </Field>
        <Field>
          <FieldLabel htmlFor="field-about">Description</FieldLabel>
          <FieldContent>
            <Textarea id="field-about" placeholder="What is it for?" />
            <FieldDescription>
              Shown on the project overview page.
            </FieldDescription>
          </FieldContent>
        </Field>
        <FieldSeparator>Advanced</FieldSeparator>
        <Field orientation="horizontal">
          <Checkbox id="field-public" />
          <FieldLabel htmlFor="field-public" className="font-normal">
            Make this project public
          </FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
