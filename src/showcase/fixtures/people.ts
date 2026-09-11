export type Person = {
  id: string
  name: string
  initials: string
  role: string
  email: string
  avatar: string
}

/**
 * Deterministic placeholder avatars (DiceBear renders them as inline SVG data
 * at a stable URL). They are decorative — every demo also supplies initials so
 * the fallback is meaningful when the network is unavailable.
 */
function avatarFor(seed: string) {
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${seed}&backgroundColor=transparent`
}

export const PEOPLE: readonly Person[] = [
  {
    id: "ada",
    name: "Ada Lovelace",
    initials: "AL",
    role: "Engineering",
    email: "ada@example.com",
    avatar: avatarFor("Ada"),
  },
  {
    id: "grace",
    name: "Grace Hopper",
    initials: "GH",
    role: "Engineering",
    email: "grace@example.com",
    avatar: avatarFor("Grace"),
  },
  {
    id: "alan",
    name: "Alan Turing",
    initials: "AT",
    role: "Research",
    email: "alan@example.com",
    avatar: avatarFor("Alan"),
  },
  {
    id: "katherine",
    name: "Katherine Johnson",
    initials: "KJ",
    role: "Research",
    email: "katherine@example.com",
    avatar: avatarFor("Katherine"),
  },
  {
    id: "radia",
    name: "Radia Perlman",
    initials: "RP",
    role: "Networking",
    email: "radia@example.com",
    avatar: avatarFor("Radia"),
  },
]
