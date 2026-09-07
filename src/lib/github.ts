// 사이트에 노출되는 GitHub 수치는 전부 여기서 나온다. 하드코딩하지 않는 이유는
// 두 가지다 — 값이 계속 늘어나고, 손으로 적은 숫자는 근거를 되짚을 수 없다.
//
// 기준은 GitHub API 가 한 번에 세어주는 **기본 브랜치(develop)** 다.
// 전 브랜치 합계는 API 로 재현할 수 없어(브랜치를 전부 순회해야 한다) 택하지 않았다.
//
// 토큰 없이도 동작한다. GITHUB_TOKEN 이 있으면 레이트리밋만 넉넉해진다
// (미인증 60회/시, search 는 10회/분 — revalidate 를 12시간으로 둔 이유).

const REVALIDATE = 60 * 60 * 12;

export const FINDERS_REPO = "Finders-Official/FE";
export const OMECHU_REPO = "Team-Omechu/Omechu-web";
const LOGIN = "jeonbinggu";

// API 가 죽어도 페이지는 떠야 한다. 2026.09.07 실측치를 폴백으로 둔다
const FALLBACK = {
  findersCommits: { mine: 540, total: 1722 },
  omechuCommits: { mine: 365, total: 3024 },
  mergedPrs: 102,
  reviewedPrs: 148,
  openedIssues: 73,
};

async function ghFetch<T>(path: string): Promise<T | null> {
  const token = process.env.GITHUB_TOKEN;

  try {
    const res = await fetch(`https://api.github.com/${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: REVALIDATE },
    });

    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    // 빌드 중 네트워크가 막혀도 폴백으로 넘어간다
    return null;
  }
}

type Contributor = { login: string; contributions: number };

async function repoCommits(repo: string, fallback: { mine: number; total: number }) {
  const rows = await ghFetch<Contributor[]>(
    `repos/${repo}/contributors?per_page=100`,
  );
  if (!Array.isArray(rows) || rows.length === 0) return fallback;

  const total = rows.reduce((sum, r) => sum + r.contributions, 0);
  const mine = rows.find((r) => r.login === LOGIN)?.contributions ?? 0;
  return mine > 0 ? { mine, total } : fallback;
}

async function searchCount(query: string, fallback: number) {
  const res = await ghFetch<{ total_count: number }>(
    `search/issues?q=${encodeURIComponent(query)}&per_page=1`,
  );
  return typeof res?.total_count === "number" ? res.total_count : fallback;
}

export type GithubData = Awaited<ReturnType<typeof getGithubData>>;

export async function getGithubData() {
  const [findersCommits, omechuCommits, mergedPrs, reviewedPrs, openedIssues] =
    await Promise.all([
      repoCommits(FINDERS_REPO, FALLBACK.findersCommits),
      repoCommits(OMECHU_REPO, FALLBACK.omechuCommits),
      searchCount(`is:pr author:${LOGIN} is:merged`, FALLBACK.mergedPrs),
      searchCount(`is:pr reviewed-by:${LOGIN}`, FALLBACK.reviewedPrs),
      searchCount(`is:issue author:${LOGIN}`, FALLBACK.openedIssues),
    ]);

  return { findersCommits, omechuCommits, mergedPrs, reviewedPrs, openedIssues };
}

const nf = new Intl.NumberFormat("ko-KR");

/** "커밋 540개 (31%)" — 프로젝트 카드와 상세 페이지가 같은 문자열을 쓴다 */
export function commitLabel({ mine, total }: { mine: number; total: number }) {
  const share = total > 0 ? Math.round((mine / total) * 100) : 0;
  return `커밋 ${nf.format(mine)}개 (${share}%)`;
}

export function formatCount(n: number) {
  return nf.format(n);
}
