# Mantine Components — Build Priority

Components in Mantine's Core package (https://mantine.dev/core/package/) that
we don't have an equivalent for yet, ordered so that anything a later
component depends on is built first. Port with `/mantine-port <name> - <url>`.

Tiers are build batches, not strict sub-dependencies within a tier — items in
the same tier can be done in any order relative to each other.

## Tier 1 — Foundational primitives
Nothing below depends on these existing yet, but several later components do.

1. Box - https://mantine.dev/core/box/
2. VisuallyHidden - https://mantine.dev/core/visually-hidden/
3. Portal - https://mantine.dev/core/portal/
4. Transition - https://mantine.dev/core/transition/
5. Overlay - https://mantine.dev/core/overlay/

## Tier 2 — Layout primitives
Built on Box.

6. Stack - https://mantine.dev/core/stack/
7. Group - https://mantine.dev/core/group/
8. Flex - https://mantine.dev/core/flex/
9. Center - https://mantine.dev/core/center/
10. Container - https://mantine.dev/core/container/
11. SimpleGrid - https://mantine.dev/core/simple-grid/
12. Space - https://mantine.dev/core/space/
13. Paper - https://mantine.dev/core/paper/ (surface many later components sit on — ColorPicker dropdown, Cascader panel, etc.)

## Tier 3 — Typography primitives

14. Text - https://mantine.dev/core/text/
15. Title - https://mantine.dev/core/title/
16. Typography - https://mantine.dev/core/typography/ (depends on Text/Title styles)
17. Blockquote - https://mantine.dev/core/blockquote/ (depends on Text)
18. Code - https://mantine.dev/core/code/
19. Highlight - https://mantine.dev/core/highlight/ (depends on Text + existing Marker)
20. List - https://mantine.dev/core/list/ (depends on Text)

## Tier 4 — Standalone atoms
Low/no dependencies, quick wins.

21. Anchor - https://mantine.dev/core/anchor/ (depends on Text)
22. CloseButton - https://mantine.dev/core/close-button/
23. CopyButton - https://mantine.dev/core/copy-button/
24. FileButton - https://mantine.dev/core/file-button/
25. Indicator - https://mantine.dev/core/indicator/
26. ThemeIcon - https://mantine.dev/core/theme-icon/
27. ColorSwatch - https://mantine.dev/core/color-swatch/
28. BackgroundImage - https://mantine.dev/core/background-image/
29. Image - https://mantine.dev/core/image/
30. NumberFormatter - https://mantine.dev/core/number-formatter/
31. RollingNumber - https://mantine.dev/core/rolling-number/ (depends on NumberFormatter)
32. Burger - https://mantine.dev/core/burger/

## Tier 5 — Color input chain

33. HueSlider - https://mantine.dev/core/hue-slider/ (built on existing Slider)
34. AlphaSlider - https://mantine.dev/core/alpha-slider/ (built on existing Slider)
35. AngleSlider - https://mantine.dev/core/angle-slider/ (built on existing Slider)
36. ColorPicker - https://mantine.dev/core/color-picker/ (depends on HueSlider, AlphaSlider, ColorSwatch)
37. ColorInput - https://mantine.dev/core/color-input/ (depends on ColorPicker + existing Input/Popover)

## Tier 6 — Overlay composites
Depend on Portal / Transition / Overlay from Tier 1.

38. FloatingIndicator - https://mantine.dev/core/floating-indicator/
39. FocusTrap - https://mantine.dev/core/focus-trap/
40. Affix - https://mantine.dev/core/affix/ (depends on Portal, Transition)
41. ActionBar - https://mantine.dev/core/action-bar/ (depends on Portal, Transition)
42. LoadingOverlay - https://mantine.dev/core/loading-overlay/ (depends on Overlay, Transition)
43. FloatingWindow - https://mantine.dev/core/floating-window/ (depends on Portal, FocusTrap, Transition)

## Tier 7 — Pill → Combobox chain
Pill first — everything else here builds on it.

44. Pill - https://mantine.dev/core/pill/
45. PillsInput - https://mantine.dev/core/pills-input/ (depends on Pill + existing Input)
46. MultiSelect - https://mantine.dev/core/multi-select/ (depends on Pill, PillsInput, existing Combobox)
47. TagsInput - https://mantine.dev/core/tags-input/ (depends on Pill, PillsInput, existing Combobox)
48. Autocomplete - https://mantine.dev/core/autocomplete/ (depends on existing Combobox/Input)
49. Cascader - https://mantine.dev/core/cascader/ (depends on existing Combobox/Popover, ScrollArea)

## Tier 8 — Navigation composites

50. NavLink - https://mantine.dev/core/nav-link/ (depends on Anchor)
51. Stepper - https://mantine.dev/core/stepper/
52. TableOfContents - https://mantine.dev/core/table-of-contents/ (depends on List, Anchor)
53. Tree - https://mantine.dev/core/tree/
54. TreeSelect - https://mantine.dev/core/tree-select/ (depends on Tree + existing Combobox)
55. AppShell - https://mantine.dev/core/app-shell/ (depends on Box/Group/Stack, Burger, existing ScrollArea/Sidebar patterns)

## Tier 9 — Remaining inputs
Independent of each other and of everything above.

56. Chip - https://mantine.dev/core/chip/
57. Fieldset - https://mantine.dev/core/fieldset/
58. FileInput - https://mantine.dev/core/file-input/
59. JsonInput - https://mantine.dev/core/json-input/
60. MaskInput - https://mantine.dev/core/mask-input/
61. NumberInput - https://mantine.dev/core/number-input/
62. PasswordInput - https://mantine.dev/core/password-input/
63. Rating - https://mantine.dev/core/rating/

## Tier 10 — Remaining data display / misc

64. DataList - https://mantine.dev/core/data-list/ (depends on Text/Title)
65. OverflowList - https://mantine.dev/core/overflow-list/
66. Spoiler - https://mantine.dev/core/spoiler/ (depends on existing Collapsible)
67. Timeline - https://mantine.dev/core/timeline/
68. RingProgress - https://mantine.dev/core/ring-progress/
69. SemiCircleProgress - https://mantine.dev/core/semi-circle-progress/ (shares RingProgress's SVG-arc pattern)
70. Marquee - https://mantine.dev/core/marquee/
71. Scroller - https://mantine.dev/core/scroller/ (depends on existing ScrollArea)
