import { groupSkills, CATEGORY_ORDER } from "@/lib/groupSkills";
import { SkillCategory } from "@prisma/client";

const makeSkill = (id: string, category: SkillCategory) => ({ id, category });

describe("groupSkills", () => {
  it("every skill appears in exactly one group", () => {
    const skills = [
      makeSkill("1", "FRONTEND"),
      makeSkill("2", "BACKEND"),
      makeSkill("3", "MOBILE"),
      makeSkill("4", "DATABASE"),
      makeSkill("5", "FRONTEND"),
    ];
    const grouped = groupSkills(skills);
    const allGrouped = CATEGORY_ORDER.flatMap((cat) => grouped[cat]);
    expect(allGrouped).toHaveLength(skills.length);
    // No duplicates
    const ids = allGrouped.map((s) => s.id);
    expect(new Set(ids).size).toBe(skills.length);
  });

  it("union of all groups equals the full skill list", () => {
    const skills = [
      makeSkill("a", "FRONTEND"),
      makeSkill("b", "BACKEND"),
      makeSkill("c", "MOBILE"),
    ];
    const grouped = groupSkills(skills);
    const union = CATEGORY_ORDER.flatMap((cat) => grouped[cat]);
    const inputIds = skills.map((s) => s.id).sort();
    const unionIds = union.map((s) => s.id).sort();
    expect(unionIds).toEqual(inputIds);
  });

  it("each skill is placed in the correct category group", () => {
    const skills = [
      makeSkill("1", "FRONTEND"),
      makeSkill("2", "DATABASE"),
    ];
    const grouped = groupSkills(skills);
    expect(grouped.FRONTEND.map((s) => s.id)).toContain("1");
    expect(grouped.DATABASE.map((s) => s.id)).toContain("2");
    expect(grouped.BACKEND).toHaveLength(0);
    expect(grouped.MOBILE).toHaveLength(0);
  });

  it("returns empty arrays for categories with no skills", () => {
    const grouped = groupSkills([]);
    CATEGORY_ORDER.forEach((cat) => expect(grouped[cat]).toHaveLength(0));
  });
});
