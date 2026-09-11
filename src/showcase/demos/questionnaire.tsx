import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

const ITEMS = [
  {
    name: "role",
    required: true,
    choices: [
      { value: "engineer" },
      { value: "designer" },
      { value: "product" },
      { value: "other" },
    ],
  },
  {
    name: "surfaces",
    choices: [{ value: "web" }, { value: "mobile" }, { value: "desktop" }],
  },
  { name: "notes" },
] as const

function Survey({
  shortcuts,
}: {
  shortcuts: "letters" | "numbers" | undefined
}) {
  const [answers, setAnswers] = React.useState<Record<string, string[]> | null>(
    null,
  )
  const [runKey, setRunKey] = React.useState(0)

  if (answers) {
    return (
      <div className="flex w-full max-w-md flex-col gap-3">
        <p className="text-sm font-medium">Submitted</p>
        <pre className="overflow-x-auto rounded-lg border bg-muted/40 p-3 font-mono text-xs">
          {JSON.stringify(answers, null, 2)}
        </pre>
        <Button
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() => {
            setAnswers(null)
            setRunKey((current) => current + 1)
          }}
        >
          Start over
        </Button>
      </div>
    )
  }

  return (
    <Questionnaire
      key={runKey}
      items={ITEMS}
      shortcuts={shortcuts}
      className="max-w-md"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const result: Record<string, string[]> = {}

        for (const key of new Set(data.keys())) {
          result[key] = data.getAll(key).map(String)
        }

        setAnswers(result)
      }}
    >
      <QuestionnaireProgress />

      <QuestionnaireItem name="role" required>
        <QuestionnaireTitle>What do you work on?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Pick the closest match.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="engineer">
            Engineering
            <QuestionnaireChoiceDescription>
              You mostly write code.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="designer">Design</QuestionnaireChoice>
          <QuestionnaireChoice value="product">Product</QuestionnaireChoice>
          <QuestionnaireChoice value="other">
            Something else
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="surfaces" multiple>
        <QuestionnaireTitle>Which surfaces do you ship?</QuestionnaireTitle>
        <QuestionnaireDescription>Choose any number.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="web">Web</QuestionnaireChoice>
          <QuestionnaireChoice value="mobile">Mobile</QuestionnaireChoice>
          <QuestionnaireChoice value="desktop">Desktop</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireItem name="notes">
        <QuestionnaireTitle>Anything else?</QuestionnaireTitle>
        <QuestionnaireInput placeholder="Optional" />
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnaireProgress />
        <QuestionnairePrevious>Back</QuestionnairePrevious>
        <QuestionnaireSkip>Skip</QuestionnaireSkip>
        <QuestionnaireNext>Next</QuestionnaireNext>
        <QuestionnaireSubmit>Submit</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}

export function QuestionnairePlayground({
  shortcuts,
}: {
  shortcuts: "none" | "letters" | "numbers"
}) {
  return <Survey shortcuts={shortcuts === "none" ? undefined : shortcuts} />
}

export function QuestionnaireBasic() {
  return <Survey shortcuts={undefined} />
}

export function QuestionnaireWithShortcuts() {
  return <Survey shortcuts="letters" />
}
