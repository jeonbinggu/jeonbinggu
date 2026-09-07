import type { Metadata } from "next";
import CaseDetail from "@/components/CaseDetail";
import { omechu, omechuTroubles } from "@/data/omechu";

export const metadata: Metadata = {
  title: "오메추 — 전병국",
  description: omechu.lead,
};

export default function OmechuPage() {
  return (
    <CaseDetail
      project={omechu}
      troubles={omechuTroubles}
      troublesHeading="구조·상태·정책을 정리하며 만난 문제들"
      next={{ href: "/work/finders", title: "Finders" }}
    />
  );
}
