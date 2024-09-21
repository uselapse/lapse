import { type HomeLayoutProps } from "fumadocs-ui/home-layout";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: HomeLayoutProps = {
  nav: {
    title: <><svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><rect id="Rectangle 14" x="16.6777" y="-1" width="25" height="25" rx="2.5" transform="rotate(45 16.6777 -1)" fill="white" /></svg><p>Lapse</p></>
  },
  links: [
    {
      text: "Pricing",
      url: "https://guide.lapse.host/integrations",
    },
    {
      text: "Feedback",
      url: "https://lapse.canny.io/",
    },
    {
      text: "Documentation",
      url: "/docs",
      active: "nested-url",
    },
  ],
};
