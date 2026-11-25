# Data Quality Audit

## Source profile

- Rows: **100,060**
- Columns: **18**
- Date coverage: **2024-01 to 2026-06**
- Distinct posting IDs: **98,398**
- Repeated posting-ID rows: **1,662**
- Exact duplicate rows: **0**
- Companies: **22,471**
- Countries: **45**
- Role families: **23**

## Missing values

| Field | Missing rows | Missing % |
|---|---:|---:|
| skills | 82,696 | 82.65% |
| fliar_profile_url | 69,889 | 69.84% |
| company_domain | 69,516 | 69.47% |
| salary_min_usd | 67,139 | 67.11% |
| seniority | 61,774 | 61.74% |
| industry_category | 47,383 | 47.36% |
| country | 1 | 0.00% |
| job_title | 1 | 0.00% |

## Salary checks

- Invalid lower/upper bounds (non-positive or minimum greater than maximum): **0**
- Midpoint outside the available lower/upper range: **0**
- Average midpoint salary: **$61,603**
- Median midpoint salary: **$48,214**

## Why the original DELETE logic must change

The original script deletes any row missing company_domain, seniority, skills, salary_min_usd, or industry_category. Only **757 rows (0.76%)** satisfy all five non-null conditions. This would discard 99.24% of the dataset. These fields are not all required for every metric, so the revised SQL retains incomplete rows and applies filters only where a metric requires them.

## Duplicate ID finding

`posting_id` is not unique. There are 98,398 distinct IDs across 100,060 source rows. Repeated-ID groups generally differ in other attributes. The source has zero exact duplicate rows. Do not deduplicate solely by `posting_id`.

The corrected PBIP model introduces `PostingRecordKey`, a row-level hash over all source attributes, and relates the Skills bridge to the fact table using that key.

## Skills parsing

The skill values use the pipe delimiter `|`. The corrected SQL view uses `STRING_SPLIT(skills, '|')`, trims each value, and filters empty values. This avoids the prior Power Query step that split on comma and discarded the second output column.

## Interpretation cautions

1. This is a sample of job-posting records, not a census of all global jobs.
2. Skill and seniority analyses cover only rows where those fields are present.
3. Salary range analysis has lower coverage than midpoint salary analysis because salary_min_usd is missing in 67.11% of rows.
4. Average salary is sensitive to high values; present median alongside it.
5. Distinct posting IDs and source-row counts are different measures.

## Validation boundary

The CSV was profiled locally and the PBIP/TMDL definitions were inspected and patched. A live SQL Server refresh and interactive Power BI Desktop test cannot be executed in this environment. Complete the checklist in `POWER_BI_MODEL_UPDATE.md` before treating the refreshed report as fully validated.
