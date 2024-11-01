import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/home-layout";
import { baseOptions } from "../layout.config";
import type { Metadata } from 'next'

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}

export const metadata: Metadata = {
  title: "lapse",
  description: "Store your images using a comprehensive array of advanced image processing capabilities."
}
