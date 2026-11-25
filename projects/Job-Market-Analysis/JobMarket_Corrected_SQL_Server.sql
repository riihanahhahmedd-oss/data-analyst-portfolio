USE Data_1;
GO

/* Non-destructive preparation: no source rows are deleted.
   posting_id repeats in this dataset; use PostingRecordKey as row grain. */

CREATE OR ALTER VIEW dbo.vw_JobMarket_Base
AS
SELECT
 CONVERT(varchar(64), HASHBYTES('SHA2_256', CONCAT_WS(NCHAR(30),
  COALESCE(LTRIM(RTRIM(posting_id)),''), COALESCE(LTRIM(RTRIM(posted_month)),''),
  COALESCE(LTRIM(RTRIM(country)),''), COALESCE(LTRIM(RTRIM(country_name)),''),
  COALESCE(LTRIM(RTRIM(region_group)),''), COALESCE(LTRIM(RTRIM(company)),''),
  COALESCE(LTRIM(RTRIM(company_domain)),''), COALESCE(LTRIM(RTRIM(job_title)),''),
  COALESCE(LTRIM(RTRIM(role_family)),''), COALESCE(LTRIM(RTRIM(seniority)),''),
  COALESCE(LTRIM(RTRIM(industry_category)),''), COALESCE(LTRIM(RTRIM(skills)),''),
  COALESCE(LTRIM(RTRIM(currency)),''), COALESCE(CONVERT(varchar(40),salary_mid_local),''),
  COALESCE(CONVERT(varchar(40),salary_min_usd),''), COALESCE(CONVERT(varchar(40),salary_max_usd),''),
  COALESCE(CONVERT(varchar(40),salary_mid_usd),''), COALESCE(LTRIM(RTRIM(fliar_profile_url)), '')
 )),2) AS PostingRecordKey,
 NULLIF(LTRIM(RTRIM(posting_id)),'') AS posting_id,
 TRY_CONVERT(date, CONCAT(NULLIF(LTRIM(RTRIM(posted_month)),''),'-01')) AS posted_date,
 NULLIF(LTRIM(RTRIM(country)),'') AS country,
 NULLIF(LTRIM(RTRIM(country_name)),'') AS country_name,
 NULLIF(LTRIM(RTRIM(region_group)),'') AS region_group,
 NULLIF(LTRIM(RTRIM(company)),'') AS company,
 NULLIF(LTRIM(RTRIM(company_domain)),'') AS company_domain,
 NULLIF(LTRIM(RTRIM(job_title)),'') AS job_title,
 NULLIF(LTRIM(RTRIM(role_family)),'') AS role_family,
 NULLIF(LTRIM(RTRIM(seniority)),'') AS seniority,
 NULLIF(LTRIM(RTRIM(industry_category)),'') AS industry_category,
 NULLIF(LTRIM(RTRIM(skills)),'') AS skills,
 NULLIF(LTRIM(RTRIM(currency)),'') AS currency,
 salary_mid_local, salary_min_usd, salary_max_usd, salary_mid_usd,
 NULLIF(LTRIM(RTRIM(fliar_profile_url)),'') AS fliar_profile_url
FROM dbo.SkillSalaryGolbalSample;
GO

CREATE OR ALTER VIEW dbo.vw_JobMarket_Salary
AS
SELECT *,
 CASE
  WHEN salary_mid_usd IS NULL OR salary_mid_usd <= 0 THEN 0
  WHEN salary_min_usd IS NOT NULL AND salary_min_usd > salary_max_usd THEN 0
  WHEN salary_min_usd IS NOT NULL AND salary_mid_usd < salary_min_usd THEN 0
  WHEN salary_mid_usd > salary_max_usd THEN 0
  ELSE 1
 END AS IsSalaryValid
FROM dbo.vw_JobMarket_Base
WHERE salary_mid_usd IS NOT NULL AND salary_mid_usd > 0;
GO

CREATE OR ALTER VIEW dbo.vw_JobMarket_Skills
AS
SELECT DISTINCT b.PostingRecordKey, b.posting_id,
 LOWER(LTRIM(RTRIM(s.value))) AS skill
FROM dbo.vw_JobMarket_Base b
CROSS APPLY STRING_SPLIT(COALESCE(b.skills,''),'|') s
WHERE LTRIM(RTRIM(s.value)) <> '';
GO

/* Quality checks */
SELECT COUNT_BIG(*) AS source_rows,
 COUNT(DISTINCT posting_id) AS distinct_posting_ids,
 COUNT(DISTINCT company) AS companies,
 COUNT(DISTINCT country) AS countries
FROM dbo.vw_JobMarket_Base;

SELECT COUNT_BIG(*) AS skill_bridge_rows,
 COUNT(DISTINCT skill) AS unique_skills
FROM dbo.vw_JobMarket_Skills;

SELECT COUNT_BIG(*) AS invalid_salary_rows
FROM dbo.vw_JobMarket_Salary
WHERE IsSalaryValid = 0;

/* KPIs */
SELECT COUNT_BIG(*) AS source_records,
 COUNT(DISTINCT posting_id) AS distinct_posting_ids,
 COUNT(DISTINCT company) AS companies,
 COUNT(DISTINCT country) AS countries,
 AVG(CAST(salary_mid_usd AS decimal(18,2))) AS average_mid_salary_usd
FROM dbo.vw_JobMarket_Salary;

SELECT DISTINCT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary_mid_usd)
 OVER () AS median_mid_salary_usd
FROM dbo.vw_JobMarket_Salary;

/* Top skills: average salary is at source-row grain */
SELECT TOP (20) s.skill,
 COUNT(DISTINCT s.posting_id) AS distinct_posting_ids,
 COUNT_BIG(*) AS posting_skill_rows,
 AVG(CAST(b.salary_mid_usd AS decimal(18,2))) AS average_mid_salary_usd
FROM dbo.vw_JobMarket_Skills s
JOIN dbo.vw_JobMarket_Salary b ON b.PostingRecordKey = s.PostingRecordKey
GROUP BY s.skill
ORDER BY distinct_posting_ids DESC;
GO

/* Inspect repeated IDs; do not delete them without business rules */
SELECT posting_id, COUNT_BIG(*) AS rows_per_id
FROM dbo.vw_JobMarket_Base
GROUP BY posting_id
HAVING COUNT_BIG(*) > 1
ORDER BY rows_per_id DESC;
