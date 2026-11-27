import type { Metadata } from "next";
import { ServicePage } from "@/app/(public)/_components/service-page";
import { services } from "@/app/(public)/_data/services";

const service = services[1];

export const metadata: Metadata = {
  title: service.name + " | Moura Center",
  description: service.description,
};

export default function Page() {
  return <ServicePage service={service} />;
}
