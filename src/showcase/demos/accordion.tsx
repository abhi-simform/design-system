import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = [
  {
    value: "tokens",
    question: "Where do the colours come from?",
    answer:
      "Every colour is an OKLCH custom property in src/index.css, mapped to a Tailwind utility through @theme inline.",
  },
  {
    value: "base-ui",
    question: "Is this Radix under the hood?",
    answer:
      "No — these components are built on Base UI. The practical difference is the render prop, which replaces asChild.",
  },
  {
    value: "variants",
    question: "How are variants defined?",
    answer:
      "With class-variance-authority. Variant values are also mirrored onto data attributes so sibling components can style against them.",
  },
]

export function AccordionPlayground({
  multiple,
  disabled,
}: {
  multiple: boolean
  disabled: boolean
}) {
  return (
    <Accordion
      multiple={multiple}
      disabled={disabled}
      defaultValue={["tokens"]}
      className="w-full max-w-md"
    >
      {FAQ.map((entry) => (
        <AccordionItem key={entry.value} value={entry.value}>
          <AccordionTrigger>{entry.question}</AccordionTrigger>
          <AccordionContent>{entry.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function AccordionSingle() {
  return (
    <Accordion multiple={false} defaultValue={["tokens"]} className="w-full">
      {FAQ.map((entry) => (
        <AccordionItem key={entry.value} value={entry.value}>
          <AccordionTrigger>{entry.question}</AccordionTrigger>
          <AccordionContent>{entry.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function AccordionMultiple() {
  return (
    <Accordion defaultValue={["tokens", "base-ui"]} className="w-full">
      {FAQ.map((entry) => (
        <AccordionItem key={entry.value} value={entry.value}>
          <AccordionTrigger>{entry.question}</AccordionTrigger>
          <AccordionContent>{entry.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function AccordionDisabledItem() {
  return (
    <Accordion className="w-full">
      <AccordionItem value="one">
        <AccordionTrigger>Available</AccordionTrigger>
        <AccordionContent>This panel opens normally.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="two" disabled>
        <AccordionTrigger>Disabled</AccordionTrigger>
        <AccordionContent>You will never see this.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
