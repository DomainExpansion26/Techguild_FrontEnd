// [TechGuild Update: 30-09-2026] Safe no-op prefetch helpers.
// These are fire-and-forget performance hints only. They must never throw
// or block navigation, and must work even when called with no args.
export function prefetchOnPublicPage() {
  return undefined;
}

export function prefetchPostLogin() {
  return undefined;
}

export function prefetchNeighbourPages() {
  return undefined;
}
