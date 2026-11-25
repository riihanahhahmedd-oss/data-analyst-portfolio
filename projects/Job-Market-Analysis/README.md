# Global Job Market & Salary Analysis

> **[Open Interactive Live Demo](https://data-analyst-portfolio-ecru-chi.vercel.app/job-market-analysis-live-demo.html)** · 3 dashboards · 6 shared slicers · Donut, treemap, heatmap, scatter plot, and trend visualizations.

A three-page Power BI and SQL Server project exploring job postings, salary benchmarks, seniority, role families, skill demand, and company patterns across countries.

## Power BI report structure

The PBIP source contains **3 pages and 65 visuals**:

| Page | Focus | Visuals |
|---|---|---:|
| 1 · Market & Salary | Market overview, salaries, countries, seniority | 19 |
| 2 · Roles & Titles | Role-family demand, job titles, salary by seniority | 23 |
| 3 · Skills & Companies | Skill demand, pay by skill, company comparisons | 23 |

The report definitions contain 20 slicers, 17 cards, 9 bar charts, 1 donut chart, 1 matrix/table, 5 page navigators, and 12 text elements.

## Verified source-data snapshot

| Metric | Value |
|---|---:|
| Source rows | 100,060 |
| Distinct posting IDs | 98,398 |
| Companies | 22,471 |
| Countries | 45 |
| Role families | 23 |
| Average midpoint salary | $61,603 |
| Median midpoint salary | $48,214 |
| Date coverage | Jan 2024 – Jun 2026 |

Metrics above were recalculated from the supplied CSV. They are not claimed as refreshed Power BI results.

## Data quality findings and fixes

- The source has 100,060 rows and 18 columns.
- `posting_id` is not unique: there are 98,398 distinct IDs and 1,662 repeated-ID rows. The repeated rows differ in other attributes, so they must not be blindly deleted.
- The original SQL DELETE rules retain only 757 rows (0.76%) because they require several optional fields to be populated. The replacement SQL is non-destructive and handles missingness per analysis.
- The skill delimiter is `|`. The corrected model parses it directly rather than splitting on commas and discarding a column.
- A row-level `PostingRecordKey` is added to support a one-to-many relationship from the job fact table to the skill bridge.
- Missing values remain missing; no values are fabricated.

## Project files

- `JobMarket_Corrected_SQL_Server.sql` — SQL Server views, parsing, validation and analysis queries.
- `DATA_QUALITY_AUDIT.md` — source data audit and interpretation cautions.
- `POWER_BI_MODEL_UPDATE.md` — PBIP model changes and refresh checklist.

The corrected PBIP source package is available separately in the project handoff. The raw dataset is not included in this public repository copy; add it locally to SQL Server before refresh.

## Setup

1. Import the supplied CSV into SQL Server database `Data_1`, table `dbo.SkillSalaryGolbalSample`.
2. Run `JobMarket_Corrected_SQL_Server.sql`.
3. Open the corrected `JobMarket.pbip` in Power BI Desktop.
4. Confirm the SQL Server connection points to your own SQL Server instance and `Data_1`.
5. Refresh the model and verify `PostingRecordKey` is unique on the fact side and repeats on the skills side.
6. Confirm the active 1:* relationship and test slicers on all three pages.

## Analyst storytelling

- The average midpoint salary ($61,603) is higher than the median ($48,214), indicating a right-skewed salary distribution; show both metrics.
- Skills are missing in 82.6% of rows and seniority in 61.7%, so those analyses describe observed records only.
- Compare both posting volume and salary; high demand does not automatically imply higher pay.
- Treat country and role-family comparisons as descriptive, not causal.

## Tools

Power BI Desktop · SQL Server · Power Query (M) · DAX · Data Cleaning · EDA · Data Storytelling

Created by **Rihanah Ahmed**.
