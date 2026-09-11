import {
  booleanControl,
  selectControl,
  textControl,
} from "@/showcase/lib/controls"
import { definePlayground } from "@/showcase/registry/define-playground"
import type { ComponentEntry } from "@/showcase/registry/types"
import {
  AttachmentGroups,
  AttachmentPlayground,
  AttachmentSizes,
  AttachmentStates,
  AttachmentVertical,
} from "@/showcase/demos/attachment"
import {
  BubbleAlignment,
  BubbleConversation,
  BubblePlayground,
  BubbleVariants,
} from "@/showcase/demos/bubble"
import {
  MessageAlignment,
  MessagePlayground,
  MessageThread,
} from "@/showcase/demos/message"
import {
  MessageScrollerBasic,
  MessageScrollerPlayground,
  MessageScrollerWithBubbles,
} from "@/showcase/demos/message-scroller"
import {
  QuestionnaireBasic,
  QuestionnairePlayground,
  QuestionnaireWithShortcuts,
} from "@/showcase/demos/questionnaire"

const messageEntry: ComponentEntry = {
  id: "message",
  name: "Message",
  category: "Communication",
  description:
    "A chat row with avatar, header, body and footer slots, aligned to either side of the thread.",
  sourcePath: "src/components/ui/message.tsx",
  importStatement:
    'import {\n  Message,\n  MessageAvatar,\n  MessageContent,\n  MessageFooter,\n  MessageGroup,\n  MessageHeader,\n} from "@/components/ui/message"',
  exports: [
    "MessageGroup",
    "Message",
    "MessageAvatar",
    "MessageContent",
    "MessageFooter",
    "MessageHeader",
  ],
  keywords: ["chat", "thread", "conversation", "im"],
  notes: [
    "Message is the row layout; Bubble is the speech-balloon surface. They compose.",
  ],
  playground: definePlayground({
    tag: "Message",
    layout: "stretch",
    component: MessagePlayground,
    controls: {
      align: selectControl({
        label: "Align",
        options: ["start", "end"],
        defaultValue: "start",
      }),
      showAvatar: booleanControl({
        label: "Avatar",
        defaultValue: true,
        codeRole: "none",
      }),
      showHeader: booleanControl({
        label: "Header",
        defaultValue: true,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "alignment",
      title: "Alignment",
      component: MessageAlignment,
      layout: "stretch",
      sourceModule: "message",
      sourceExport: "MessageAlignment",
    },
    {
      id: "thread",
      title: "A thread",
      component: MessageThread,
      layout: "stretch",
      sourceModule: "message",
      sourceExport: "MessageThread",
    },
  ],
}

const bubbleEntry: ComponentEntry = {
  id: "bubble",
  name: "Bubble",
  category: "Communication",
  description:
    "A speech-balloon surface with seven variants and a reactions slot that can sit above or below the balloon.",
  sourcePath: "src/components/ui/bubble.tsx",
  importStatement:
    'import {\n  Bubble,\n  BubbleContent,\n  BubbleGroup,\n} from "@/components/ui/bubble"',
  exports: ["BubbleGroup", "Bubble", "BubbleContent", "BubbleReactions"],
  keywords: ["chat", "balloon", "speech", "message"],
  notes: [
    "align controls which side of the group the balloon hugs, not just its text alignment.",
  ],
  playground: definePlayground({
    tag: "Bubble",
    layout: "stretch",
    component: BubblePlayground,
    controls: {
      variant: selectControl({
        label: "Variant",
        options: [
          "default",
          "secondary",
          "muted",
          "tinted",
          "outline",
          "ghost",
          "destructive",
        ],
        defaultValue: "default",
      }),
      align: selectControl({
        label: "Align",
        options: ["start", "end"],
        defaultValue: "start",
      }),
      children: textControl({
        label: "Text",
        defaultValue: "How do I make a button render as a link?",
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "variants",
      title: "Variants",
      component: BubbleVariants,
      layout: "stretch",
      sourceModule: "bubble",
      sourceExport: "BubbleVariants",
    },
    {
      id: "alignment",
      title: "Alignment",
      component: BubbleAlignment,
      layout: "stretch",
      sourceModule: "bubble",
      sourceExport: "BubbleAlignment",
    },
    {
      id: "conversation",
      title: "A conversation",
      component: BubbleConversation,
      layout: "stretch",
      sourceModule: "bubble",
      sourceExport: "BubbleConversation",
    },
  ],
}

const messageScrollerEntry: ComponentEntry = {
  id: "message-scroller",
  name: "Message Scroller",
  category: "Communication",
  description:
    "A chat viewport that pins to the newest message, restores position on prepend, and offers a jump-to-end button when you scroll away.",
  sourcePath: "src/components/ui/message-scroller.tsx",
  importStatement:
    'import {\n  MessageScroller,\n  MessageScrollerButton,\n  MessageScrollerContent,\n  MessageScrollerItem,\n  MessageScrollerProvider,\n  MessageScrollerViewport,\n} from "@/components/ui/message-scroller"',
  exports: [
    "MessageScrollerProvider",
    "MessageScroller",
    "MessageScrollerViewport",
    "MessageScrollerContent",
    "MessageScrollerItem",
    "MessageScrollerButton",
    "useMessageScroller",
    "useMessageScrollerScrollable",
    "useMessageScrollerVisibility",
  ],
  externalDeps: ["@shadcn/react"],
  keywords: ["chat", "autoscroll", "virtual", "sticky", "jump to bottom"],
  notes: [
    "The root is size-full, so its parent must have a bounded height.",
    "Mark the last item with scrollAnchor so autoScroll knows what to pin to.",
    "The jump button only appears once you scroll away from the anchored end.",
  ],
  playground: definePlayground({
    tag: "MessageScrollerProvider",
    layout: "stretch",
    component: MessageScrollerPlayground,
    controls: {
      autoScroll: booleanControl({ label: "Auto scroll", defaultValue: true }),
      defaultScrollPosition: selectControl({
        label: "Initial position",
        options: ["end", "start"],
        defaultValue: "end",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: MessageScrollerBasic,
      layout: "stretch",
      sourceModule: "message-scroller",
      sourceExport: "MessageScrollerBasic",
    },
    {
      id: "bubbles",
      title: "With bubbles",
      component: MessageScrollerWithBubbles,
      layout: "stretch",
      sourceModule: "message-scroller",
      sourceExport: "MessageScrollerWithBubbles",
    },
  ],
}

const attachmentEntry: ComponentEntry = {
  id: "attachment",
  name: "Attachment",
  category: "Communication",
  description:
    "A file chip with upload lifecycle states, horizontal or vertical layout, and an actions slot for download or remove.",
  sourcePath: "src/components/ui/attachment.tsx",
  importStatement:
    'import {\n  Attachment,\n  AttachmentAction,\n  AttachmentActions,\n  AttachmentContent,\n  AttachmentDescription,\n  AttachmentGroup,\n  AttachmentMedia,\n  AttachmentTitle,\n} from "@/components/ui/attachment"',
  exports: [
    "Attachment",
    "AttachmentGroup",
    "AttachmentMedia",
    "AttachmentContent",
    "AttachmentTitle",
    "AttachmentDescription",
    "AttachmentActions",
    "AttachmentAction",
    "AttachmentTrigger",
  ],
  keywords: ["file", "upload", "chip", "document", "media"],
  notes: [
    'state moves through idle, uploading, processing, error and done — the default is "done".',
    'AttachmentMedia variant="image" sizes for a thumbnail; "icon" gives a muted tile.',
  ],
  playground: definePlayground({
    tag: "Attachment",
    layout: "stretch",
    component: AttachmentPlayground,
    controls: {
      size: selectControl({
        label: "Size",
        options: ["default", "sm", "xs"],
        defaultValue: "default",
      }),
      orientation: selectControl({
        label: "Orientation",
        options: ["horizontal", "vertical"],
        defaultValue: "horizontal",
      }),
      state: selectControl({
        label: "State",
        options: ["done", "idle", "uploading", "processing", "error"],
        defaultValue: "done",
      }),
      mediaVariant: selectControl({
        label: "Media variant",
        options: ["icon", "image"],
        defaultValue: "icon",
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "states",
      title: "States",
      component: AttachmentStates,
      layout: "stretch",
      sourceModule: "attachment",
      sourceExport: "AttachmentStates",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: AttachmentSizes,
      layout: "stretch",
      sourceModule: "attachment",
      sourceExport: "AttachmentSizes",
    },
    {
      id: "groups",
      title: "Groups with actions",
      component: AttachmentGroups,
      layout: "stretch",
      sourceModule: "attachment",
      sourceExport: "AttachmentGroups",
    },
    {
      id: "vertical",
      title: "Vertical",
      component: AttachmentVertical,
      sourceModule: "attachment",
      sourceExport: "AttachmentVertical",
    },
  ],
}

const questionnaireEntry: ComponentEntry = {
  id: "questionnaire",
  name: "Questionnaire",
  category: "Communication",
  description:
    "A multi-step survey form. It owns step state, progress, validation and the previous/skip/next/submit flow from one items definition.",
  sourcePath: "src/components/ui/questionnaire.tsx",
  importStatement:
    'import {\n  Questionnaire,\n  QuestionnaireActions,\n  QuestionnaireChoice,\n  QuestionnaireChoices,\n  QuestionnaireItem,\n  QuestionnaireNext,\n  QuestionnaireProgress,\n  QuestionnaireSubmit,\n  QuestionnaireTitle,\n} from "@/components/ui/questionnaire"',
  exports: [
    "Questionnaire",
    "QuestionnaireProgress",
    "QuestionnaireItem",
    "QuestionnaireTitle",
    "QuestionnaireDescription",
    "QuestionnaireChoices",
    "QuestionnaireChoice",
    "QuestionnaireChoiceDescription",
    "QuestionnaireInput",
    "QuestionnaireError",
    "QuestionnaireActions",
    "QuestionnairePrevious",
    "QuestionnaireSkip",
    "QuestionnaireNext",
    "QuestionnaireSubmit",
  ],
  externalDeps: ["@shadcn/react"],
  keywords: ["survey", "form", "steps", "wizard", "poll"],
  notes: [
    "The root is a real <form> — call event.preventDefault() in onSubmit and read a FormData from it.",
    "The items prop declares the step order and which steps are required; each QuestionnaireItem then matches by name.",
    'multiple on an item turns its choices into checkboxes; shortcuts adds "a/b/c" or "1/2/3" key hints.',
  ],
  playground: definePlayground({
    tag: "Questionnaire",
    layout: "stretch",
    component: QuestionnairePlayground,
    controls: {
      shortcuts: selectControl({
        label: "Shortcuts",
        options: ["none", "letters", "numbers"],
        defaultValue: "none",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "A three-step survey",
      description:
        "Radio step, multi-select step, free-text step — then the submitted FormData.",
      component: QuestionnaireBasic,
      layout: "stretch",
      sourceModule: "questionnaire",
      sourceExport: "QuestionnaireBasic",
    },
    {
      id: "shortcuts",
      title: "With letter shortcuts",
      component: QuestionnaireWithShortcuts,
      layout: "stretch",
      sourceModule: "questionnaire",
      sourceExport: "QuestionnaireWithShortcuts",
    },
  ],
}

export const communicationEntries: readonly ComponentEntry[] = [
  messageEntry,
  messageScrollerEntry,
  bubbleEntry,
  attachmentEntry,
  questionnaireEntry,
]
