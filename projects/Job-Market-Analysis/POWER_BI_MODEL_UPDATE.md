# Power BI Model Update

The corrected PBIP package reads from SQL views created by `JobMarket_Corrected_SQL_Server.sql`.

## Queries

- Fact: `dbo.vw_JobMarket_Base`
- Skills bridge: `dbo.vw_JobMarket_Skills`

## Relationship

`SkillSalaryGolbalSample[PostingRecordKey]` **1 → many** `SkillsTable[PostingRecordKey]`

Use Single cross-filter direction. Skill measures use `TREATAS` to apply selected skill row keys back to the fact table, rather than relying on a many-to-many relationship through non-unique `posting_id`.

## Skills

The corrected skill query uses `|` as the delimiter, trims values, and removes blank skill rows. The existing display field `skills.1` is preserved to avoid breaking report visuals.

## Refresh checklist

1. Run the corrected SQL script in SQL Server against `Data_1`.
2. Open `JobMarket.pbip` from the corrected source ZIP.
3. Confirm the server/database connection for your machine (original: `localhost / Data_1`).
4. Refresh the model.
5. Confirm `PostingRecordKey` is unique in the fact table and repeats in SkillsTable.
6. Confirm the active 1:* relationship.
7. Test all slicers and visuals on all three report pages.
8. Save the refreshed PBIP project.

The PBIP/TMDL text definitions were patched, but Power BI Desktop and a live SQL Server refresh were not available for execution here. Do not describe the refreshed visuals as runtime-tested until this checklist is completed.
