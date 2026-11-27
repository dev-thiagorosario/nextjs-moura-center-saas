const customerServicePath = "/customer-service";

const futurePages = {
  exchanges: { path: "/exchanges-and-returns", available: true, fallback: "#trocas" },
  faq: { path: "/faq", available: true, fallback: "#perguntas" },
  contact: { path: "/contact-us", available: true, fallback: "#canais" },
};

export function helpDestination(page: keyof typeof futurePages) {
  const { path, available, fallback } = futurePages[page];
  return available ? path : customerServicePath + fallback;
}

export function publishedHelpPage(page: keyof typeof futurePages) {
  return futurePages[page].available ? futurePages[page].path : undefined;
}
