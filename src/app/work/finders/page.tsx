import type { Metadata } from "next";
import CaseDetail from "@/components/CaseDetail";
import { finders, troubles } from "@/data/finders";

export const metadata: Metadata = {
  title: "Finders — 전병국",
  description: finders.lead,
};

export default function FindersPage() {
  return (
    <CaseDetail
      project={finders}
      troubles={troubles}
      troublesHeading="웹 계층 밖에서 생긴 문제들"
      next={{ href: "/work/omechu", title: "오메추" }}
    />
  );
}
