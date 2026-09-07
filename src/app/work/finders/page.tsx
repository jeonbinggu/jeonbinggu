import type { Metadata } from "next";
import CaseDetail from "@/components/CaseDetail";
import { finders, troubles } from "@/data/finders";
import { commitLabel, getGithubData } from "@/lib/github";

export const metadata: Metadata = {
  title: "Finders — 전병국",
  description: finders.lead,
};

export default async function FindersPage() {
  const { findersCommits } = await getGithubData();

  return (
    <CaseDetail
      project={{
        ...finders,
        // 랜딩 카드와 같은 조회 결과라 두 화면의 숫자가 어긋날 수 없다
        facts: [
          ...finders.facts,
          { label: "COMMITS", value: commitLabel(findersCommits) },
        ],
      }}
      troubles={troubles}
      troublesHeading="웹 계층 밖에서 생긴 문제들"
      next={{ href: "/work/omechu", title: "오메추" }}
    />
  );
}
