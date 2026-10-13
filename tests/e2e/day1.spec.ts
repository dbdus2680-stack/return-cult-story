import { expect, test } from "@playwright/test";

async function expectScene(page: import("@playwright/test").Page, id: string) {
  await expect(page.locator(".event-meta")).toContainText(id);
}

test("PC-001 DAY 1 advances by real button clicks", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await page.locator("button.character-card").filter({ hasText: "주인공 / 고1 신입생" }).click();
  await expectScene(page, "PC1-D01-001");

  await page.getByRole("button", { name: "“뭐야. 너 여기 왜 있어?”" }).click();
  await expectScene(page, "PC1-D01-002");

  await page.getByRole("button", { name: "“갑자기 왜?”" }).click();
  await expectScene(page, "PC1-D01-003");

  await page.getByRole("button", { name: "도윤 옆에서 자연스럽게 대화에 낀다." }).click();
  await expectScene(page, "PC1-D01-004");

  await page.getByRole("button", { name: "도윤과 중학교 때 얘기를 하며 점심을 먹는다." }).click();
  await expectScene(page, "PC1-D01-005");

  await page.getByRole("button", { name: "“뭔데? 같이 가자며.” 바로 묻는다." }).click();
  await expect(page.getByRole("button", { name: "다음 날로" })).toBeVisible();
});

test("legacy DAY1 save repairs the missing numeric flag and resumes at 002", async ({ page }) => {
  await page.goto("/");

  await page.evaluate(() => {
    localStorage.setItem("return-cult-story.save.v1", JSON.stringify({
      version: 1,
      contentVersion: "0.1.0",
      savedAt: new Date().toISOString(),
      state: {
        characterId: "PC-001",
        day: 1,
        seed: 1234,
        runId: "legacy-test",
        stats: { STAT_OBS: 2, STAT_TALK: 1, STAT_NERVE: 1, STAT_TECH: 0, STAT_STRESS: 2, STAT_SYNC: 0 },
        rels: { REL_FRIEND: 2, REL_CULT: 0, REL_POLICE: 0, REL_RESEARCHER: 0 },
        flags: {},
        knows: {},
        worlds: { WORLD_POLICE: 0, WORLD_TECH_ALERT: 0, WORLD_SEARCH: 0, CULT_ACCESS: 0 },
        items: ["학생증", "교통카드", "휴대전화"],
        clues: [],
        history: ["PC1-D01-001"]
      },
      eventId: null,
      lastChoice: null
    }));
  });

  await page.reload();
  await page.getByRole("button", { name: "이어하기" }).click();
  await expectScene(page, "PC1-D01-002");
});
