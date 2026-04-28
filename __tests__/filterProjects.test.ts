import { filterProjects } from "@/lib/filterProjects";
import { ProjectType } from "@prisma/client";

const makeProject = (type: ProjectType) => ({ projectType: type });

describe("filterProjects", () => {
  const projects = [
    makeProject("WEB"),
    makeProject("WEB"),
    makeProject("MOBILE"),
    makeProject("FULLSTACK"),
  ];

  it('returns all projects when filter is "ALL"', () => {
    expect(filterProjects(projects, "ALL")).toHaveLength(4);
  });

  it("returns only WEB projects when filter is WEB", () => {
    const result = filterProjects(projects, "WEB");
    expect(result).toHaveLength(2);
    result.forEach((p) => expect(p.projectType).toBe("WEB"));
  });

  it("returns only MOBILE projects when filter is MOBILE", () => {
    const result = filterProjects(projects, "MOBILE");
    expect(result).toHaveLength(1);
    expect(result[0].projectType).toBe("MOBILE");
  });

  it("returns only FULLSTACK projects when filter is FULLSTACK", () => {
    const result = filterProjects(projects, "FULLSTACK");
    expect(result).toHaveLength(1);
    expect(result[0].projectType).toBe("FULLSTACK");
  });

  it("returns empty array when no projects match the filter", () => {
    expect(filterProjects([makeProject("WEB")], "MOBILE")).toHaveLength(0);
  });

  it("returns empty array when input is empty", () => {
    expect(filterProjects([], "WEB")).toHaveLength(0);
    expect(filterProjects([], "ALL")).toHaveLength(0);
  });

  it("filtered result contains no projects of other types", () => {
    const result = filterProjects(projects, "WEB");
    result.forEach((p) => expect(p.projectType).not.toBe("MOBILE"));
    result.forEach((p) => expect(p.projectType).not.toBe("FULLSTACK"));
  });
});
