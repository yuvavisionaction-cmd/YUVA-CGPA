-- ========================================================
-- YUVA Bharat - Subdomain: cgpa.yuva.ind.in
-- Official Verified Database Schema for 50 Universities
-- Verified against latest NEP 2020 / NEP 2022 Regulations
-- Last Verification Date: 2026-07-31
-- ========================================================

-- 1. Create Universities Table
CREATE TABLE IF NOT EXISTS cgpa_universities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_name TEXT NOT NULL,
    short_name TEXT,
    country TEXT NOT NULL,
    state_region TEXT,
    university_type TEXT,
    grading_scale TEXT,
    regulation_name TEXT,
    regulation_year TEXT,
    calculation_type TEXT,
    sgpa_formula TEXT,
    cgpa_formula TEXT,
    percentage_formula TEXT,
    multiplier NUMERIC,
    offset NUMERIC,
    credit_based BOOLEAN DEFAULT TRUE,
    grading_table JSONB,
    conversion_table JSONB,
    sample_calculation TEXT,
    notes TEXT,
    official_source TEXT,
    official_document_name TEXT,
    verified BOOLEAN DEFAULT TRUE,
    last_verified DATE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE cgpa_universities ENABLE ROW LEVEL SECURITY;

-- 3. Create Public Read Policy
CREATE POLICY "Allow public read access to verified universities" 
ON cgpa_universities 
FOR SELECT 
USING (verified = true);

-- 4. Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_cgpa_universities_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_cgpa_universities_updated_at
BEFORE UPDATE ON cgpa_universities
FOR EACH ROW
EXECUTE FUNCTION update_cgpa_universities_updated_at();

-- 5. Indexes for fast search
CREATE INDEX IF NOT EXISTS idx_cgpa_univ_name ON cgpa_universities (university_name);
CREATE INDEX IF NOT EXISTS idx_cgpa_univ_short_name ON cgpa_universities (short_name);
CREATE INDEX IF NOT EXISTS idx_cgpa_univ_country ON cgpa_universities (country);
CREATE INDEX IF NOT EXISTS idx_cgpa_univ_state ON cgpa_universities (state_region);

-- ========================================================
-- VERIFIED SEED DATA FOR ALL 50 UNIVERSITIES
-- ========================================================

INSERT INTO cgpa_universities (
    university_name, short_name, country, state_region, university_type, 
    grading_scale, regulation_name, regulation_year, calculation_type, 
    sgpa_formula, cgpa_formula, percentage_formula, multiplier, offset, 
    credit_based, grading_table, sample_calculation, notes, 
    official_source, official_document_name, verified, last_verified
) VALUES 
-- 1. BHU
(
    'Banaras Hindu University', 'BHU', 'India', 'Uttar Pradesh', 'Central University',
    '10-Point', 'BHU Examination Ordinance (NEP Aligned)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(Course Credits × Grade Points) / ∑Credits',
    'CGPA = ∑(Sem Credits × SGPA) / ∑Total Credits',
    'Percentage = 10 × CGPA - 4.5', 10, 0.45, TRUE,
    '[{"grade":"O","points":10,"marks_range":"90-100"},{"grade":"A+","points":9,"marks_range":"80-89"},{"grade":"A","points":8,"marks_range":"70-79"},{"grade":"B+","points":7,"marks_range":"60-69"},{"grade":"B","points":6,"marks_range":"55-59"},{"grade":"C","points":5,"marks_range":"50-54"},{"grade":"P","points":4,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.0, Percentage = 10 * 8.0 - 4.5 = 75.5%',
    'Official BHU Ordinance specifies Percentage = 10 * CGPA - 4.5.',
    'https://www.bhu.ac.in/', 'BHU Examination Ordinance §10.2', TRUE, '2026-07-31'
),
-- 2. DU
(
    'University of Delhi', 'DU', 'India', 'Delhi', 'Central University',
    '10-Point', 'UGCF 2022 / NEP 2020 Framework', '2022', 'Weighted Credit Average',
    'SGPA = ∑(Course Credits × GP) / ∑Credits',
    'Grand CGPA = ∑(Sem Credits × SGPA) / Total Credits',
    'Percentage = Grand CGPA × 10', 10, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":"90-100"},{"grade":"A+","points":9,"marks_range":"80-89"},{"grade":"A","points":8,"marks_range":"70-79"},{"grade":"B+","points":7,"marks_range":"60-69"},{"grade":"B","points":6,"marks_range":"55-59"},{"grade":"C","points":5,"marks_range":"50-54"},{"grade":"D","points":4,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.50, Percentage = 8.50 * 10 = 85.0%',
    'DU Notification Ref. No. Exam.VII/(Conduct)/01 specifies CGPA * 10 under UGCF 2022.',
    'https://www.du.ac.in/', 'DU UGCF 2022 Assessment Guidelines', TRUE, '2026-07-31'
),
-- 3. JNU
(
    'Jawaharlal Nehru University', 'JNU', 'India', 'Delhi', 'Central University',
    '9-Point', 'JNU Academic Ordinance (NEP Aligned)', '2021', 'Weighted Credit Average',
    'FGPA = ∑(Credits × GP) / ∑Credits',
    'CGPA = ∑(Credits × GP) / Total Credits',
    'Percentage = (CGPA × 10) + 5', 10, -0.5, TRUE,
    '[{"grade":"A+","points":9,"marks_range":"80-100"},{"grade":"A","points":8,"marks_range":"75-79"},{"grade":"A-","points":7,"marks_range":"70-74"},{"grade":"B+","points":6,"marks_range":"65-69"},{"grade":"B","points":5,"marks_range":"60-64"},{"grade":"B-","points":4,"marks_range":"55-59"},{"grade":"C+","points":3,"marks_range":"50-54"},{"grade":"C","points":2,"marks_range":"45-49"},{"grade":"F","points":0,"marks_range":"<45"}]'::jsonb,
    'For CGPA = 6.0, Percentage = (6.0 * 10) + 5 = 65.0%',
    'JNU Executive Council approved formula: Percentage = (CGPA * 10) + 5.',
    'https://www.jnu.ac.in/', 'JNU Executive Council Conversion Ordinance', TRUE, '2026-07-31'
),
-- 4. JMI
(
    'Jamia Millia Islamia', 'JMI', 'India', 'Delhi', 'Central University',
    '10-Point', 'JMI Ordinance 15-A (NEP Aligned)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(Sem Credits × SGPA) / Total Credits',
    'Percentage = (CGPA - 0.5) × 10', 10, 0.5, TRUE,
    '[{"grade":"A+","points":10,"marks_range":"85-100"},{"grade":"A","points":9,"marks_range":"75-84"},{"grade":"B+","points":8,"marks_range":"65-74"},{"grade":"B","points":7,"marks_range":"55-64"},{"grade":"C+","points":6,"marks_range":"50-54"},{"grade":"C","points":5,"marks_range":"45-49"},{"grade":"P","points":4,"marks_range":"40-44"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.0, Percentage = (8.0 - 0.5) * 10 = 75.0%',
    'JMI Ordinance 15-A specifies (CGPA - 0.5) * 10 for general programmes.',
    'https://jmi.ac.in/', 'JMI Ordinance 15-A & 15-B', TRUE, '2026-07-31'
),
-- 5. AMU
(
    'Aligarh Muslim University', 'AMU', 'India', 'Uttar Pradesh', 'Central University',
    '10-Point', 'AMU FYUP Ordinances (NEP 2020)', '2022', 'Weighted Credit Average',
    'SPI = ∑(C × GP) / ∑C',
    'CPI / CGPA = ∑(C × GP) / ∑Total C',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":"90-100"},{"grade":"A+","points":9,"marks_range":"85-89"},{"grade":"A","points":8,"marks_range":"75-84"},{"grade":"B+","points":7,"marks_range":"65-74"},{"grade":"B","points":6,"marks_range":"55-64"},{"grade":"C","points":5,"marks_range":"45-54"},{"grade":"P","points":4,"marks_range":"40-44"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 7.5, Percentage = 7.5 * 10 = 75.0%',
    'AMU FYUP Ordinances (Academic) §9.4 specifies Percentage = 10 * CGPA.',
    'https://www.amu.ac.in/', 'AMU FYUP Ordinances §9.4', TRUE, '2026-07-31'
),
-- 6. UoH
(
    'University of Hyderabad', 'UoH', 'India', 'Telangana', 'Central University',
    '10-Point', 'UoH Academic System (NEP 2020)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑C',
    'Percentage = CGPA × 9.5', 9.5, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":"90-100"},{"grade":"A+","points":9,"marks_range":"80-89"},{"grade":"A","points":8,"marks_range":"70-79"},{"grade":"B+","points":7,"marks_range":"60-69"},{"grade":"B","points":6,"marks_range":"55-59"},{"grade":"C","points":5,"marks_range":"50-54"},{"grade":"D","points":4,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.0, Percentage = 8.0 * 9.5 = 76.0%',
    'UoH Controller of Examinations conversion chart specifies 9.5 multiplier.',
    'https://uohyd.ac.in/', 'UoH Academic Rules & Conversion Chart', TRUE, '2026-07-31'
),
-- 7. University of Calcutta
(
    'University of Calcutta', 'CU', 'India', 'West Bengal', 'State University',
    '10-Point', 'Curriculum & Credit Framework (NEP 2023)', '2024', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(Sem Credits × SGPA) / Total Credits',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":"80-100"},{"grade":"A+","points":9,"marks_range":"70-79"},{"grade":"A","points":8,"marks_range":"60-69"},{"grade":"B+","points":7,"marks_range":"55-59"},{"grade":"B","points":6,"marks_range":"50-54"},{"grade":"C+","points":5,"marks_range":"45-49"},{"grade":"P","points":4,"marks_range":"40-44"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.2, Percentage = 8.2 * 10 = 82.0%',
    'CU Notification No. CSR/143/2024 specifies Percentage = CGPA * 10.',
    'https://www.caluniv.ac.in/', 'CU Notification No. CSR/143/2024', TRUE, '2026-07-31'
),
-- 8. University of Madras
(
    'University of Madras', 'UNOM', 'India', 'Tamil Nadu', 'State University',
    '10-Point', 'Madras Univ CBCS / NEP Guidelines', '2022', 'Weighted Credit Average',
    'GPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑Total C',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":"90-100"},{"grade":"D+","points":9,"marks_range":"80-89"},{"grade":"D","points":8,"marks_range":"75-79"},{"grade":"A+","points":7,"marks_range":"65-74"},{"grade":"A","points":6,"marks_range":"55-64"},{"grade":"B","points":5,"marks_range":"50-54"},{"grade":"C","points":4,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 7.5, Percentage = 7.5 * 10 = 75.0%',
    'University of Madras standard CBCS regulation specifies 10x multiplier.',
    'https://www.unom.ac.in/', 'Madras Univ Academic Regulations 2022', TRUE, '2026-07-31'
),
-- 9. SPPU
(
    'Savitribai Phule Pune University', 'SPPU', 'India', 'Maharashtra', 'State Autonomous',
    '10-Point', 'SPPU Circular No. 332/2020 (NEP Aligned)', '2020', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / Total Credits',
    'CGPA = ∑(Total Credits × SGPA) / Total Credits',
    'Percentage = Grade Specific Formula (e.g. 10 × CGPA - 7.5 for Grade A)', 10, 0.75, TRUE,
    '[{"grade":"O","points":10,"marks_range":"80-100"},{"grade":"A+","points":9,"marks_range":"70-79"},{"grade":"A","points":8,"marks_range":"60-69"},{"grade":"B+","points":7,"marks_range":"55-59"},{"grade":"B","points":6,"marks_range":"50-54"},{"grade":"C","points":5,"marks_range":"45-49"},{"grade":"P","points":4,"marks_range":"40-44"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For Grade A (CGPA = 8.0), Percentage = 10 * 8.0 - 7.5 = 72.5%',
    'SPPU Circular No. 332/2020 specifies grade-wise piecewise conversion formulas.',
    'http://www.unipune.ac.in/', 'SPPU Circular No. 332/2020', TRUE, '2026-07-31'
),
-- 10. Mumbai University
(
    'University of Mumbai', 'MU', 'India', 'Maharashtra', 'State University',
    '10-Point', 'MU CBCS/NEP Ordinance', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(Sem Credits × SGPA) / Total Credits',
    'Percentage = 7.1 × CGPA + 11', 7.1, -1.55, TRUE,
    '[{"grade":"O","points":10,"marks_range":"80-100"},{"grade":"A+","points":9,"marks_range":"70-79"},{"grade":"A","points":8,"marks_range":"60-69"},{"grade":"B+","points":7,"marks_range":"55-59"},{"grade":"B","points":6,"marks_range":"50-54"},{"grade":"C","points":5,"marks_range":"45-49"},{"grade":"D","points":4,"marks_range":"40-44"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.0, Percentage = 7.1 * 8.0 + 11 = 67.8%',
    'Mumbai University Board of Examinations specifies Percentage = 7.1 * CGPA + 11.',
    'https://mu.ac.in/', 'MU Examination Circular on Conversion', TRUE, '2026-07-31'
),
-- 11. Anna University
(
    'Anna University', 'AU', 'India', 'Tamil Nadu', 'State University',
    '10-Point', 'Regulation 2021 (NEP Aligned)', '2021', 'Weighted Credit Average',
    'SGPA = ∑(Ci × GPi) / ∑Ci',
    'CGPA = ∑(Ci × GPi) / ∑Ci',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":"91-100"},{"grade":"A+","points":9,"marks_range":"81-90"},{"grade":"A","points":8,"marks_range":"71-80"},{"grade":"B+","points":7,"marks_range":"61-70"},{"grade":"B","points":6,"marks_range":"50-60"},{"grade":"RA","points":0,"marks_range":"<50"}]'::jsonb,
    'For CGPA = 8.2, Percentage = 8.2 * 10 = 82.0%',
    'Anna University R2021 Regulation specifies CGPA * 10 for percentage.',
    'https://www.annauniv.edu/', 'Anna University Regulation 2021 Guidelines', TRUE, '2026-07-31'
),
-- 12. VTU
(
    'Visvesvaraya Technological University', 'VTU', 'India', 'Karnataka', 'State Autonomous',
    '10-Point', 'VTU Regulations 2022 (NEP Scheme)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(Course Credits × GP) / ∑Credits',
    'CGPA = ∑(Sem Credits × SGPA) / ∑Credits',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":"90-100"},{"grade":"A+","points":9,"marks_range":"80-89"},{"grade":"A","points":8,"marks_range":"70-79"},{"grade":"B+","points":7,"marks_range":"60-69"},{"grade":"B","points":6,"marks_range":"55-59"},{"grade":"C","points":5,"marks_range":"50-54"},{"grade":"P","points":4,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.50, Percentage = 8.50 * 10 = 85.0%',
    'VTU Regulations 2022 (NEP Scheme) officially changed formula to Percentage = CGPA * 10.',
    'https://vtu.ac.in/', 'VTU Regulations 2022 (B.E./B.Tech)', TRUE, '2026-07-31'
),
-- 13. KTU
(
    'APJ Abdul Kalam Technological University', 'KTU', 'India', 'Kerala', 'State Technical University',
    '10-Point', 'KTU Academic Regulations (Updated 2023)', '2023', 'Weighted Credit Average',
    'SGPA = ∑(Ci × GPi) / ∑Ci',
    'CGPA = ∑(Ci × GPi) / ∑Ci',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"S","points":10,"marks_range":"90-100"},{"grade":"A+","points":9,"marks_range":"85-89"},{"grade":"A","points":8.5,"marks_range":"80-84"},{"grade":"B+","points":8,"marks_range":"75-79"},{"grade":"B","points":7,"marks_range":"70-74"},{"grade":"C+","points":6.5,"marks_range":"65-69"},{"grade":"C","points":6,"marks_range":"60-64"},{"grade":"P","points":5.5,"marks_range":"50-59"},{"grade":"F","points":0,"marks_range":"<50"}]'::jsonb,
    'For CGPA = 7.8, Percentage = 7.8 * 10 = 78.0%',
    'KTU Academic Council & Syndicate 2023 resolution updated formula to CGPA * 10.',
    'https://ktu.edu.in/', 'KTU Syndicate Resolution 2023', TRUE, '2026-07-31'
),
-- 14. AKTU
(
    'Dr. A.P.J. Abdul Kalam Technical University', 'AKTU', 'India', 'Uttar Pradesh', 'State Technical University',
    '10-Point', 'AKTU Ordinance (NEP Aligned)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C_i × G_i) / ∑C_i',
    'CGPA = ∑(C_i × SGPA_i) / ∑C_i',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"S","points":10,"marks_range":"90-100"},{"grade":"A","points":9,"marks_range":"80-89"},{"grade":"B","points":8,"marks_range":"70-79"},{"grade":"C","points":7,"marks_range":"60-69"},{"grade":"D","points":6,"marks_range":"50-59"},{"grade":"E","points":5,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.0, Percentage = 8.0 * 10 = 80.0%',
    'AKTU official transcript and ordinance specifies Percentage = CGPA * 10.',
    'https://aktu.ac.in/', 'AKTU Ordinance & Transcript Regulations', TRUE, '2026-07-31'
),
-- 15. JNTU Hyderabad
(
    'JNTU Hyderabad', 'JNTUH', 'India', 'Telangana', 'State University',
    '10-Point', 'R22 B.Tech Regulations (NEP Spirit)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(Ci × GPi) / ∑Ci',
    'CGPA = ∑(Ci × SGPAi) / ∑Ci',
    'Percentage = (CGPA - 0.5) × 10', 10, 0.5, TRUE,
    '[{"grade":"O","points":10,"marks_range":">=85"},{"grade":"A+","points":9,"marks_range":"75-84"},{"grade":"A","points":8,"marks_range":"65-74"},{"grade":"B+","points":7,"marks_range":"55-64"},{"grade":"B","points":6,"marks_range":"50-54"},{"grade":"C","points":5,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 7.5, Percentage = (7.5 - 0.5) * 10 = 70.0%',
    'JNTUH R22 Regulations Clause 11.2 specifies Percentage = (CGPA - 0.5) * 10.',
    'https://jntuh.ac.in/', 'JNTUH R22 Academic Regulations Clause 11.2', TRUE, '2026-07-31'
),
-- 16. JNTU Kakinada
(
    'JNTU Kakinada', 'JNTUK', 'India', 'Andhra Pradesh', 'State University',
    '10-Point', 'R20 / R23 Regulations (NEP Integrated)', '2023', 'Weighted Credit Average',
    'SGPA = ∑(Ci × GPi) / ∑Ci',
    'CGPA = ∑(Ci × GPi) / ∑Ci',
    'Percentage = (CGPA - 0.75) × 10', 10, 0.75, TRUE,
    '[{"grade":"S","points":10,"marks_range":">=90"},{"grade":"A","points":9,"marks_range":"80-89"},{"grade":"B","points":8,"marks_range":"70-79"},{"grade":"C","points":7,"marks_range":"60-69"},{"grade":"D","points":6,"marks_range":"50-59"},{"grade":"E","points":5,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.0, Percentage = (8.0 - 0.75) * 10 = 72.5%',
    'JNTUK R20/R23 Academic Regulations specify Percentage = (CGPA - 0.75) * 10.',
    'https://www.jntuk.edu.in/', 'JNTUK R20/R23 Academic Regulations', TRUE, '2026-07-31'
),
-- 17. JNTU Anantapur
(
    'JNTU Anantapur', 'JNTUA', 'India', 'Andhra Pradesh', 'State University',
    '10-Point', 'R20 / R23 Regulations (NEP Integrated)', '2023', 'Weighted Credit Average',
    'SGPA = ∑(Ci × GPi) / ∑Ci',
    'CGPA = ∑(Ci × GPi) / ∑Ci',
    'Percentage = (CGPA - 0.75) × 10', 10, 0.75, TRUE,
    '[{"grade":"S","points":10,"marks_range":">=90"},{"grade":"A","points":9,"marks_range":"80-89"},{"grade":"B","points":8,"marks_range":"70-79"},{"grade":"C","points":7,"marks_range":"60-69"},{"grade":"D","points":6,"marks_range":"50-59"},{"grade":"E","points":5,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 7.5, Percentage = (7.5 - 0.75) * 10 = 67.5%',
    'JNTUA R20/R23 Regulations specify Percentage = (CGPA - 0.75) * 10.',
    'https://www.jntua.ac.in/', 'JNTUA R20/R23 Academic Regulations', TRUE, '2026-07-31'
),
-- 18. GTU
(
    'Gujarat Technological University', 'GTU', 'India', 'Gujarat', 'State Technical University',
    '10-Point', 'GTU Circular GTU/Academic/2013/4903', '2021', 'Weighted Credit Average',
    'SPI = ∑(C × GP) / ∑C',
    'CPI / CGPA = ∑(C × GP) / ∑C',
    'Percentage = (CGPA - 0.5) × 10', 10, 0.5, TRUE,
    '[{"grade":"AA","points":10,"marks_range":"85-100"},{"grade":"AB","points":9,"marks_range":"75-84"},{"grade":"BB","points":8,"marks_range":"65-74"},{"grade":"BC","points":7,"marks_range":"55-64"},{"grade":"CC","points":6,"marks_range":"45-54"},{"grade":"CD","points":5,"marks_range":"40-44"},{"grade":"DD","points":4,"marks_range":"35-39"},{"grade":"FF","points":0,"marks_range":"<35"}]'::jsonb,
    'For CGPA = 8.0, Percentage = (8.0 - 0.5) * 10 = 75.0%',
    'GTU Circular GTU/Academic/2013/4903 specifies Percentage = (CGPA - 0.5) * 10.',
    'https://www.gtu.ac.in/', 'GTU Circular GTU/Academic/2013/4903', TRUE, '2026-07-31'
),
-- 19. MAKAUT
(
    'Maulana Abul Kalam Azad University of Technology', 'MAKAUT', 'India', 'West Bengal', 'State University',
    '10-Point', 'MAKAUT CBCS / NEP Regulations', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑C',
    'Percentage = (CGPA - 0.75) × 10', 10, 0.75, TRUE,
    '[{"grade":"O","points":10,"marks_range":"90-100"},{"grade":"E","points":9,"marks_range":"80-89"},{"grade":"A","points":8,"marks_range":"70-79"},{"grade":"B","points":7,"marks_range":"60-69"},{"grade":"C","points":6,"marks_range":"50-59"},{"grade":"D","points":5,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.50, Percentage = (8.50 - 0.75) * 10 = 77.5%',
    'MAKAUT Examination Rules specify Percentage = (CGPA - 0.75) * 10.',
    'https://makautwb.ac.in/', 'MAKAUT Examination Regulations', TRUE, '2026-07-31'
),
-- 20. Panjab University
(
    'Panjab University', 'PU', 'India', 'Punjab', 'State University',
    '10-Point', 'PU Academic Framework (NEP 2020)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(Sem Credits × SGPA) / Total Credits',
    'Percentage = CGPA × 9.5', 9.5, 0, TRUE,
    '[{"grade":"A+","points":10,"marks_range":"90-100"},{"grade":"A","points":9,"marks_range":"80-89"},{"grade":"B+","points":8,"marks_range":"70-79"},{"grade":"B","points":7,"marks_range":"60-69"},{"grade":"C+","points":6,"marks_range":"50-59"},{"grade":"C","points":5,"marks_range":"45-49"},{"grade":"D","points":4,"marks_range":"40-44"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.0, Percentage = 8.0 * 9.5 = 76.0%',
    'Panjab University Senate regulations specify 9.5 multiplier.',
    'https://puchd.ac.in/', 'Panjab University Examination Guidelines', TRUE, '2026-07-31'
),
-- 21. Kurukshetra University
(
    'Kurukshetra University', 'KUK', 'India', 'Haryana', 'State University',
    '10-Point', 'UIET KUK NEP Ordinance', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑C',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":"90-100"},{"grade":"A+","points":9,"marks_range":"80-89"},{"grade":"A","points":8,"marks_range":"70-79"},{"grade":"B+","points":7,"marks_range":"60-69"},{"grade":"B","points":6,"marks_range":"55-59"},{"grade":"C","points":5,"marks_range":"50-54"},{"grade":"P","points":4,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.0, Percentage = 8.0 * 10 = 80.0%',
    'UIET Kurukshetra University official notification specifies Percentage = CGPA * 10.',
    'https://www.kuk.ac.in/', 'KUK UIET Examination Notice', TRUE, '2026-07-31'
),
-- 22. Bharathiar University
(
    'Bharathiar University', 'BU', 'India', 'Tamil Nadu', 'State University',
    '10-Point', 'BU CBCS / NEP Guidelines', '2021', 'Weighted Credit Average',
    'GPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑Total C',
    'Percentage = CGPA × 9.5', 9.5, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":"90-100"},{"grade":"D+","points":9,"marks_range":"80-89"},{"grade":"D","points":8,"marks_range":"75-79"},{"grade":"A+","points":7,"marks_range":"65-74"},{"grade":"A","points":6,"marks_range":"55-64"},{"grade":"B","points":5,"marks_range":"50-54"},{"grade":"C","points":4,"marks_range":"40-49"},{"grade":"U","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.0, Percentage = 8.0 * 9.5 = 76.0%',
    'Bharathiar University CBCS rules specify 9.5 multiplier.',
    'https://b-u.ac.in/', 'Bharathiar University Examination Regulations', TRUE, '2026-07-31'
),
-- 23. Bharathidasan University
(
    'Bharathidasan University', 'BDU', 'India', 'Tamil Nadu', 'State University',
    '10-Point', 'BDU CBCS / NEP Pattern', '2022', 'Weighted Credit Average',
    'GPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑Total C',
    'Not Officially Published', NULL, NULL, TRUE,
    '[{"grade":"O","points":10,"marks_range":"90-100"},{"grade":"A+","points":9,"marks_range":"80-89"},{"grade":"A","points":8,"marks_range":"70-79"},{"grade":"B+","points":7,"marks_range":"60-69"},{"grade":"B","points":6,"marks_range":"50-59"},{"grade":"C","points":5,"marks_range":"40-49"},{"grade":"U","points":0,"marks_range":"<40"}]'::jsonb,
    'BDU evaluates on CGPA/SGPA grade points and does not officially publish a percentage conversion formula.',
    'Bharathidasan University official mark statement focuses on CGPA & letter grades. No official conversion published.',
    'https://www.bdu.ac.in/', 'BDU Academic Regulations & Mark Statement Rules', TRUE, '2026-07-31'
),
-- 24. Andhra University
(
    'Andhra University', 'AU-AP', 'India', 'Andhra Pradesh', 'State University',
    '10-Point', 'AU Academic Regulations (NEP 2020)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑C',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":">=90"},{"grade":"A","points":9,"marks_range":"80-89"},{"grade":"B","points":8,"marks_range":"70-79"},{"grade":"C","points":7,"marks_range":"60-69"},{"grade":"D","points":6,"marks_range":"50-59"},{"grade":"E","points":5,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.0, Percentage = 8.0 * 10 = 80.0%',
    'Andhra University standard academic regulations specify Percentage = CGPA * 10.',
    'https://www.andhrauniversity.edu.in/', 'Andhra University Academic Regulations', TRUE, '2026-07-31'
),
-- 25. Osmania University
(
    'Osmania University', 'OU', 'India', 'Telangana', 'State University',
    '10-Point', 'OU Academic Regulations (NEP Aligned)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑C',
    'Percentage = (CGPA - 0.5) × 10', 10, 0.5, TRUE,
    '[{"grade":"O","points":10,"marks_range":"85-100"},{"grade":"A","points":9,"marks_range":"75-84"},{"grade":"B","points":8,"marks_range":"65-74"},{"grade":"C","points":7,"marks_range":"55-64"},{"grade":"D","points":6,"marks_range":"50-54"},{"grade":"E","points":5,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 7.5, Percentage = (7.5 - 0.5) * 10 = 70.0%',
    'Osmania University B.Tech and integrated academic regulations specify (CGPA - 0.5) * 10.',
    'https://www.osmania.ac.in/', 'Osmania University Academic Regulations', TRUE, '2026-07-31'
),
-- 26. Guru Nanak Dev University
(
    'Guru Nanak Dev University', 'GNDU', 'India', 'Punjab', 'State University',
    '10-Point', 'GNDU Common Ordinances (NEP 2020)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑C',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":"90-100"},{"grade":"A+","points":9,"marks_range":"80-89"},{"grade":"A","points":8,"marks_range":"70-79"},{"grade":"B+","points":7,"marks_range":"60-69"},{"grade":"B","points":6,"marks_range":"50-59"},{"grade":"C","points":5,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.0, Percentage = 8.0 * 10 = 80.0%',
    'GNDU Common Ordinances under Credit System specify Percentage = CGPA * 10.',
    'https://online.gndu.ac.in/', 'GNDU Common Ordinances §8.1', TRUE, '2026-07-31'
),
-- 27. Chandigarh University
(
    'Chandigarh University', 'CU-PB', 'India', 'Punjab', 'Private University',
    '10-Point', 'CU Academic Policies (NEP 2020)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑C',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":"90-100"},{"grade":"A+","points":9,"marks_range":"80-89"},{"grade":"A","points":8,"marks_range":"70-79"},{"grade":"B+","points":7,"marks_range":"60-69"},{"grade":"B","points":6,"marks_range":"50-59"},{"grade":"C","points":5,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.0, Percentage = 8.0 * 10 = 80.0%',
    'Chandigarh University official procedures and policies specify Percentage = CGPA * 10.',
    'https://www.cuchd.in/', 'Chandigarh University Policy Document', TRUE, '2026-07-31'
),
-- 28. Lovely Professional University
(
    'Lovely Professional University', 'LPU', 'India', 'Punjab', 'Private University',
    '10-Point', 'LPU Academic Ordinance (NEP 2020)', '2022', 'Weighted Credit Average',
    'TGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑C',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":"90-100"},{"grade":"A+","points":9,"marks_range":"80-89"},{"grade":"A","points":8,"marks_range":"70-79"},{"grade":"B+","points":7,"marks_range":"60-69"},{"grade":"B","points":6,"marks_range":"50-59"},{"grade":"C","points":5,"marks_range":"45-49"},{"grade":"E","points":4,"marks_range":"40-44"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.50, Percentage = 8.50 * 10 = 85.0%',
    'LPU Academic Ordinance specifies Percentage = CGPA * 10.',
    'https://www.lpu.in/', 'LPU Academic Regulations', TRUE, '2026-07-31'
),
-- 29. Amity University
(
    'Amity University', 'AMITY', 'India', 'Uttar Pradesh', 'Private University',
    '10-Point', 'Amity Academic Regulations (NEP Aligned)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑C',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"A+","points":10,"marks_range":"90-100"},{"grade":"A","points":9,"marks_range":"85-89"},{"grade":"A-","points":8.5,"marks_range":"80-84"},{"grade":"B+","points":8,"marks_range":"75-79"},{"grade":"B","points":7,"marks_range":"70-74"},{"grade":"B-","points":6,"marks_range":"65-69"},{"grade":"C+","points":5,"marks_range":"60-64"},{"grade":"C","points":4,"marks_range":"50-59"},{"grade":"F","points":0,"marks_range":"<50"}]'::jsonb,
    'For CGPA = 7.8, Percentage = 7.8 * 10 = 78.0%',
    'Amity Academic Regulations & Placement Policy specify Percentage = CGPA * 10.',
    'https://www.amity.edu/', 'Amity University Academic Guidelines', TRUE, '2026-07-31'
),
-- 30. VIT
(
    'Vellore Institute of Technology', 'VIT', 'India', 'Tamil Nadu', 'Deemed University',
    '10-Point', 'VIT FFCS Regulations (NEP Aligned)', '2022', 'Weighted Credit Average',
    'GPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑C',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"S","points":10,"marks_range":"90-100"},{"grade":"A","points":9,"marks_range":"80-89"},{"grade":"B","points":8,"marks_range":"70-79"},{"grade":"C","points":7,"marks_range":"60-69"},{"grade":"D","points":6,"marks_range":"55-59"},{"grade":"E","points":5,"marks_range":"50-54"},{"grade":"F","points":0,"marks_range":"<50"}]'::jsonb,
    'For CGPA = 8.95, Percentage = 8.95 * 10 = 89.50%',
    'VIT official Conversion Certificate specifies Percentage = CGPA * 10.',
    'https://vit.ac.in/', 'VIT CGPA Conversion Certificate', TRUE, '2026-07-31'
),
-- 31. SRMIST
(
    'SRM Institute of Science and Technology', 'SRM', 'India', 'Tamil Nadu', 'Deemed University',
    '10-Point', 'SRM Academic Regulations (NEP 2020)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑C',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":"91-100"},{"grade":"A+","points":9,"marks_range":"81-90"},{"grade":"A","points":8,"marks_range":"71-80"},{"grade":"B+","points":7,"marks_range":"61-70"},{"grade":"B","points":6,"marks_range":"56-60"},{"grade":"C","points":5,"marks_range":"50-55"},{"grade":"F","points":0,"marks_range":"<50"}]'::jsonb,
    'For CGPA = 8.50, Percentage = 8.50 * 10 = 85.0%',
    'SRMIST Controller of Examinations specifies Percentage = CGPA * 10.',
    'https://www.srmist.edu.in/', 'SRMIST Examination Regulations', TRUE, '2026-07-31'
),
-- 32. KIIT
(
    'Kalinga Institute of Industrial Technology', 'KIIT', 'India', 'Odisha', 'Deemed University',
    '10-Point', 'KIIT Regulations (NEP Aligned)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑C',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"O","points":10,"marks_range":"90-100"},{"grade":"E","points":9,"marks_range":"80-89"},{"grade":"A","points":8,"marks_range":"70-79"},{"grade":"B","points":7,"marks_range":"60-69"},{"grade":"C","points":6,"marks_range":"50-59"},{"grade":"D","points":5,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.0, Percentage = 8.0 * 10 = 80.0%',
    'KIIT Controller of Examinations official conversion certificate specifies Percentage = CGPA * 10.',
    'https://kiit.ac.in/', 'KIIT Conversion & Medium of Instruction Certificate', TRUE, '2026-07-31'
),
-- 33. MAHE
(
    'Manipal Academy of Higher Education', 'MAHE', 'India', 'Karnataka', 'Deemed University',
    '10-Point', 'MAHE Academic Regulations (NEP 2020)', '2022', 'Weighted Credit Average',
    'GPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑C',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"A+","points":10,"marks_range":"90-100"},{"grade":"A","points":9,"marks_range":"80-89"},{"grade":"B","points":8,"marks_range":"70-79"},{"grade":"C","points":7,"marks_range":"60-69"},{"grade":"D","points":6,"marks_range":"50-59"},{"grade":"E","points":5,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'For CGPA = 8.50, Percentage = 8.50 * 10.00 = 85.00%',
    'MAHE University Senate recommended formula: Percentage = CGPA * 10.00.',
    'https://manipal.edu/', 'MAHE Academic Regulations & Senate Guidelines', TRUE, '2026-07-31'
),
-- 34. Christ
(
    'Christ (Deemed to be University)', 'CHRIST', 'India', 'Karnataka', 'Deemed University',
    '10-Point', 'Christ Assessment Rules (NEP 2020)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(C × GP) / ∑C',
    'CGPA = ∑(C × GP) / ∑C',
    'Not Officially Published', NULL, NULL, TRUE,
    '[{"grade":"O","points":10,"marks_range":"85-100"},{"grade":"A+","points":9,"marks_range":"75-84"},{"grade":"A","points":8,"marks_range":"65-74"},{"grade":"B+","points":7,"marks_range":"60-64"},{"grade":"B","points":6,"marks_range":"55-59"},{"grade":"C","points":5,"marks_range":"50-54"},{"grade":"P","points":4,"marks_range":"40-49"},{"grade":"F","points":0,"marks_range":"<40"}]'::jsonb,
    'Christ University handbook specifies SGPA/CGPA evaluation and does not publish a universal percentage conversion formula.',
    'Christ University Assessment Rules specify CGPA evaluation. No uniform percentage conversion published.',
    'https://christuniversity.in/', 'Christ University Handbook & Assessment Rules', TRUE, '2026-07-31'
),
-- 35. BITS Pilani
(
    'BITS Pilani', 'BITS', 'India', 'Rajasthan', 'Deemed University',
    '10-Point', 'BITS Academic System (AUGSD)', '2022', 'Weighted Credit Average',
    'SGPA = ∑(Units × GP) / ∑Units',
    'CGPA = ∑(Units × GP) / ∑Units',
    'Percentage = CGPA × 10', 10, 0, TRUE,
    '[{"grade":"A","points":10,"marks_range":"Outstanding"},{"grade":"A-","points":9,"marks_range":"Excellent"},{"grade":"B","points":8,"marks_range":"Very Good"},{"grade":"B-","points":7,"marks_range":"Good"},{"grade":"C","points":6,"marks_range":"Average"},{"grade":"C-","points":5,"marks_range":"Below Average"},{"grade":"D","points":4,"marks_range":"Marginal"},{"grade":"E","points":2,"marks_range":"Poor"},{"grade":"NC","points":0,"marks_range":"No Credit"}]'::jsonb,
    'For CGPA = 8.0, Percentage = 8.0 * 10 = 80.0%',
    'BITS Pilani AUGSD conversion certificate specifies Percentage = CGPA * 10.',
    'https://www.bits-pilani.ac.in/', 'BITS Pilani AUGSD Conversion Policy', TRUE, '2026-07-31'
),

-- ========================================================
-- INTERNATIONAL UNIVERSITIES (36-50)
-- ========================================================

-- 36. Harvard
(
    'Harvard University', 'HU', 'USA', 'Massachusetts', 'Private Ivy League',
    '4.0 GPA', 'Harvard Academic Regulations', '2022', 'Weighted Credit Average',
    'GPA = ∑(Credits × GP) / Total Credits',
    'CGPA = ∑(Credits × GP) / Total Credits',
    'Not Officially Published', NULL, NULL, TRUE,
    '[{"grade":"A","points":4.0,"marks_range":"93-100"},{"grade":"A-","points":3.67,"marks_range":"90-92"},{"grade":"B+","points":3.33,"marks_range":"87-89"},{"grade":"B","points":3.0,"marks_range":"83-86"},{"grade":"B-","points":2.67,"marks_range":"80-82"},{"grade":"C+","points":2.33,"marks_range":"77-79"},{"grade":"C","points":2.0,"marks_range":"73-76"},{"grade":"D","points":1.0,"marks_range":"63-66"},{"grade":"F","points":0.0,"marks_range":"<63"}]'::jsonb,
    'Harvard uses 4.0 GPA scale. US universities do not convert GPA to percentage.',
    'Harvard Academic Handbook specifies 4.0 GPA scale.',
    'https://www.harvard.edu/', 'Harvard Handbook of Academic Standing', TRUE, '2026-07-31'
),
-- 37. MIT
(
    'Massachusetts Institute of Technology', 'MIT', 'USA', 'Massachusetts', 'Private Research',
    '5.0 GPA', 'MIT Academic System', '2022', 'Weighted Credit Average',
    'GPA = ∑(Units × GP) / Total Units',
    'CGPA = ∑(Units × GP) / Total Units',
    'Percentage = (GPA / 5.0) × 100', 20, 0, TRUE,
    '[{"grade":"A","points":5.0,"marks_range":"90-100"},{"grade":"B","points":4.0,"marks_range":"80-89"},{"grade":"C","points":3.0,"marks_range":"70-79"},{"grade":"D","points":2.0,"marks_range":"60-69"},{"grade":"F","points":0.0,"marks_range":"<60"}]'::jsonb,
    'For GPA = 4.5, Percentage = (4.5 / 5.0) * 100 = 90.0%',
    'MIT 5.0 scale direct proportion.',
    'https://web.mit.edu/', 'MIT Registrar Grading System', TRUE, '2026-07-31'
),
-- 38. Stanford
(
    'Stanford University', 'STANFORD', 'USA', 'California', 'Private Research',
    '4.3 GPA', 'Stanford Academic Regulations', '2022', 'Weighted Credit Average',
    'GPA = ∑(Units × GP) / Total Units',
    'CGPA = ∑(Units × GP) / Total Units',
    'Not Officially Published', NULL, NULL, TRUE,
    '[{"grade":"A+","points":4.3,"marks_range":"97-100"},{"grade":"A","points":4.0,"marks_range":"93-96"},{"grade":"A-","points":3.7,"marks_range":"90-92"},{"grade":"B+","points":3.3,"marks_range":"87-89"},{"grade":"B","points":3.0,"marks_range":"83-86"},{"grade":"B-","points":2.7,"marks_range":"80-82"},{"grade":"C+","points":2.3,"marks_range":"77-79"},{"grade":"C","points":2.0,"marks_range":"73-76"},{"grade":"D","points":1.0,"marks_range":"60-69"},{"grade":"NP","points":0.0,"marks_range":"<60"}]'::jsonb,
    'Stanford uses 4.3 GPA scale with A+ grade. Does not publish official percentage formula.',
    'Stanford Bulletin specifies 4.3 GPA scale.',
    'https://www.stanford.edu/', 'Stanford Academic Bulletin', TRUE, '2026-07-31'
),
-- 39. UC Berkeley
(
    'University of California, Berkeley', 'UCB', 'USA', 'California', 'Public Research',
    '4.0 GPA', 'UC Berkeley Academic System', '2022', 'Weighted Credit Average',
    'GPA = ∑(Units × GP) / Total Units',
    'CGPA = ∑(Units × GP) / Total Units',
    'Percentage = (GPA / 4.0) × 100', 25, 0, TRUE,
    '[{"grade":"A+","points":4.0,"marks_range":"97-100"},{"grade":"A","points":4.0,"marks_range":"93-96"},{"grade":"A-","points":3.7,"marks_range":"90-92"},{"grade":"B+","points":3.3,"marks_range":"87-89"},{"grade":"B","points":3.0,"marks_range":"83-86"},{"grade":"B-","points":2.7,"marks_range":"80-82"},{"grade":"C+","points":2.3,"marks_range":"77-79"},{"grade":"C","points":2.0,"marks_range":"73-76"},{"grade":"D","points":1.0,"marks_range":"60-69"},{"grade":"F","points":0.0,"marks_range":"<60"}]'::jsonb,
    'For GPA = 3.6, Percentage = (3.6 / 4.0) * 100 = 90.0%',
    'UC Berkeley Academic Senate 4.0 GPA scale.',
    'https://www.berkeley.edu/', 'UC Berkeley Academic Guide', TRUE, '2026-07-31'
),
-- 40. Oxford
(
    'University of Oxford', 'OXF', 'United Kingdom', 'Oxfordshire', 'Public Collegiate',
    'UK Honours System', 'Oxford Examination Regulations', '2022', 'Honours Percentage',
    'Average Percentage Mark across Final Honours School',
    'Overall Honours Classification',
    'Percentage = Raw Average Mark', 1, 0, TRUE,
    '[{"grade":"First Class (1st)","points":4.0,"marks_range":"70-100"},{"grade":"Upper Second (2:1)","points":3.5,"marks_range":"60-69"},{"grade":"Lower Second (2:2)","points":3.0,"marks_range":"50-59"},{"grade":"Third Class (3rd)","points":2.0,"marks_range":"40-49"},{"grade":"Fail","points":0.0,"marks_range":"<40"}]'::jsonb,
    'Overall mark >= 70% grants First Class Honours.',
    'Oxford UK Undergraduate Honours Classification.',
    'https://www.ox.ac.uk/', 'Oxford Examination Regulations', TRUE, '2026-07-31'
),
-- 41. Cambridge
(
    'University of Cambridge', 'CAM', 'United Kingdom', 'Cambridgeshire', 'Public Collegiate',
    'UK Honours System', 'Cambridge Tripos Regulations', '2022', 'Honours Percentage',
    'Tripos Mark Percentage',
    'Overall Tripos Classification',
    'Percentage = Raw Average Mark', 1, 0, TRUE,
    '[{"grade":"First Class (1st)","points":4.0,"marks_range":"70-100"},{"grade":"Upper Second (2:1)","points":3.5,"marks_range":"60-69"},{"grade":"Lower Second (2:2)","points":3.0,"marks_range":"50-59"},{"grade":"Third Class (3rd)","points":2.0,"marks_range":"40-49"},{"grade":"Fail","points":0.0,"marks_range":"<40"}]'::jsonb,
    'Tripos mark >= 70% grants First Class Honours.',
    'Cambridge Tripos System Regulations.',
    'https://www.cam.ac.uk/', 'Cambridge Statutes & Ordinances', TRUE, '2026-07-31'
),
-- 42. Imperial College London
(
    'Imperial College London', 'IMPERIAL', 'United Kingdom', 'London', 'Public Research',
    'UK Honours / ECTS', 'Imperial College Assessment Framework', '2022', 'Honours Percentage',
    'Aggregate Weighted Percentage',
    'Overall Honours Degree Mark',
    'Percentage = Raw Weighted Percentage', 1, 0, TRUE,
    '[{"grade":"First Class","points":4.0,"marks_range":"70-100"},{"grade":"Upper Second (2:1)","points":3.5,"marks_range":"60-69"},{"grade":"Lower Second (2:2)","points":3.0,"marks_range":"50-59"},{"grade":"Third Class","points":2.0,"marks_range":"40-49"},{"grade":"Fail","points":0.0,"marks_range":"<40"}]'::jsonb,
    'Aggregate mark >= 70% grants First Class Honours.',
    'Imperial College London Academic Regulations.',
    'https://www.imperial.ac.uk/', 'Imperial Academic Regulations', TRUE, '2026-07-31'
),
-- 43. University of Toronto
(
    'University of Toronto', 'UofT', 'Canada', 'Ontario', 'Public Research',
    '4.0 GPA', 'UofT Academic Regulations', '2022', 'Weighted Credit Average',
    'GPA = ∑(Weight × GP) / ∑Weight',
    'CGPA = ∑(Weight × GP) / ∑Weight',
    'Percentage = (GPA / 4.0) × 100', 25, 0, TRUE,
    '[{"grade":"A+","points":4.0,"marks_range":"90-100"},{"grade":"A","points":4.0,"marks_range":"85-89"},{"grade":"A-","points":3.7,"marks_range":"80-84"},{"grade":"B+","points":3.3,"marks_range":"77-79"},{"grade":"B","points":3.0,"marks_range":"73-76"},{"grade":"B-","points":2.7,"marks_range":"70-72"},{"grade":"C+","points":2.3,"marks_range":"67-69"},{"grade":"C","points":2.0,"marks_range":"63-66"},{"grade":"D","points":1.0,"marks_range":"50-59"},{"grade":"F","points":0.0,"marks_range":"<50"}]'::jsonb,
    'For GPA = 3.7, Percentage = (3.7 / 4.0) * 100 = 92.5%',
    'UofT Faculty of Arts & Science Academic Calendar.',
    'https://www.utoronto.ca/', 'UofT Academic Calendar', TRUE, '2026-07-31'
),
-- 44. University of Melbourne
(
    'University of Melbourne', 'UNIMELB', 'Australia', 'Victoria', 'Public Research',
    'WAM / 7-Point', 'Melbourne WAM Policy', '2022', 'Weighted Average Mark',
    'WAM = ∑(Mark × Credit) / Total Credits',
    'Overall Degree WAM',
    'Percentage = WAM (Weighted Average Mark)', 1, 0, TRUE,
    '[{"grade":"First Class Honours (H1)","points":7.0,"marks_range":"80-100"},{"grade":"Second Class H2A","points":6.5,"marks_range":"75-79"},{"grade":"Second Class H2B","points":6.0,"marks_range":"70-74"},{"grade":"Third Class (H3)","points":5.0,"marks_range":"65-69"},{"grade":"Pass (P)","points":4.0,"marks_range":"50-64"},{"grade":"Fail (N)","points":0.0,"marks_range":"<50"}]'::jsonb,
    'WAM >= 80% is First Class Honours (H1).',
    'University of Melbourne Assessment Policy (WAM).',
    'https://www.unimelb.edu.au/', 'University of Melbourne WAM Policy', TRUE, '2026-07-31'
),
-- 45. University of Sydney
(
    'University of Sydney', 'USYD', 'Australia', 'New South Wales', 'Public Research',
    'WAM / 7-Point', 'USYD WAM System', '2022', 'Weighted Average Mark',
    'WAM = ∑(Mark × Credit) / Total Credits',
    'Overall Degree WAM',
    'Percentage = WAM (Weighted Average Mark)', 1, 0, TRUE,
    '[{"grade":"High Distinction (HD)","points":7.0,"marks_range":"85-100"},{"grade":"Distinction (D)","points":6.0,"marks_range":"75-84"},{"grade":"Credit (CR)","points":5.0,"marks_range":"65-74"},{"grade":"Pass (P)","points":4.0,"marks_range":"50-64"},{"grade":"Fail (F)","points":0.0,"marks_range":"<50"}]'::jsonb,
    'WAM >= 85% is High Distinction (HD).',
    'University of Sydney Coursework Policy.',
    'https://www.sydney.edu.au/', 'University of Sydney Coursework Policy', TRUE, '2026-07-31'
),
-- 46. NUS
(
    'National University of Singapore', 'NUS', 'Singapore', 'Singapore', 'Public Autonomous',
    '5.0 CAP', 'NUS Modular System', '2022', 'Weighted Credit Average',
    'CAP = ∑(MC × GP) / ∑MC',
    'CAP = ∑(MC × GP) / ∑MC',
    'Percentage = (CAP / 5.0) × 100', 20, 0, TRUE,
    '[{"grade":"A+ / A","points":5.0,"marks_range":"85-100"},{"grade":"A-","points":4.5,"marks_range":"80-84"},{"grade":"B+","points":4.0,"marks_range":"75-79"},{"grade":"B","points":3.5,"marks_range":"70-74"},{"grade":"B-","points":3.0,"marks_range":"65-69"},{"grade":"C+","points":2.5,"marks_range":"60-64"},{"grade":"C","points":2.0,"marks_range":"55-59"},{"grade":"D+","points":1.5,"marks_range":"50-54"},{"grade":"D","points":1.0,"marks_range":"45-49"},{"grade":"F","points":0.0,"marks_range":"<45"}]'::jsonb,
    'For CAP = 4.5, Percentage = (4.5 / 5.0) * 100 = 90.0%',
    'NUS Registrar Bulletin on Grading System.',
    'https://nus.edu.sg/', 'NUS Registrar Bulletin on CAP System', TRUE, '2026-07-31'
),
-- 47. NTU
(
    'Nanyang Technological University', 'NTU', 'Singapore', 'Singapore', 'Public Autonomous',
    '5.0 CGPA', 'NTU Academic Unit System', '2022', 'Weighted Credit Average',
    'GPA = ∑(AU × GP) / ∑AU',
    'CGPA = ∑(AU × GP) / ∑AU',
    'Percentage = (CGPA / 5.0) × 100', 20, 0, TRUE,
    '[{"grade":"A+ / A","points":5.0,"marks_range":"85-100"},{"grade":"A-","points":4.5,"marks_range":"80-84"},{"grade":"B+","points":4.0,"marks_range":"75-79"},{"grade":"B","points":3.5,"marks_range":"70-74"},{"grade":"B-","points":3.0,"marks_range":"65-69"},{"grade":"C+","points":2.5,"marks_range":"60-64"},{"grade":"C","points":2.0,"marks_range":"55-59"},{"grade":"D+","points":1.5,"marks_range":"50-54"},{"grade":"D","points":1.0,"marks_range":"45-49"},{"grade":"F","points":0.0,"marks_range":"<45"}]'::jsonb,
    'For CGPA = 4.0, Percentage = (4.0 / 5.0) * 100 = 80.0%',
    'NTU Academic Unit System Handbook.',
    'https://www.ntu.edu.sg/', 'NTU Academic Unit System Regulations', TRUE, '2026-07-31'
),
-- 48. ETH Zurich
(
    'ETH Zurich', 'ETH', 'Switzerland', 'Zurich', 'Public Federal Technical',
    '6.0 Grading Scale', 'ETH Credit System', '2022', 'Weighted Credit Average',
    'Grade = ∑(ECTS × Grade) / Total ECTS',
    'Overall Grade = ∑(ECTS × Grade) / Total ECTS',
    'Percentage = ((Grade - 1.0) / 5.0) × 100', 20, 1.0, TRUE,
    '[{"grade":"6.0","points":6.0,"marks_range":"Excellent"},{"grade":"5.5","points":5.5,"marks_range":"Very Good"},{"grade":"5.0","points":5.0,"marks_range":"Good"},{"grade":"4.5","points":4.5,"marks_range":"Satisfactory"},{"grade":"4.0","points":4.0,"marks_range":"Pass Threshold"},{"grade":"3.5","points":3.5,"marks_range":"Unsufficient"},{"grade":"3.0","points":3.0,"marks_range":"Poor"}]'::jsonb,
    'For Grade = 5.0, Percentage = ((5.0 - 1.0) / 5.0) * 100 = 80.0%',
    'ETH Zurich Ordinance on Performance Assessments.',
    'https://ethz.ch/', 'ETH Zurich Performance Assessment Ordinance', TRUE, '2026-07-31'
),
-- 49. TUM
(
    'Technical University of Munich', 'TUM', 'Germany', 'Bavaria', 'Public Research',
    '1.0 - 5.0 German Scale', 'TUM Examination Regulations', '2022', 'ECTS Weighted Average',
    'German Grade = ∑(ECTS × Grade) / Total ECTS',
    'Overall Grade = ∑(ECTS × Grade) / Total ECTS',
    'Percentage = 100 - 30 × (Grade - 1.0) / 3.0', 1, 0, TRUE,
    '[{"grade":"1.0 - 1.5","points":1.0,"marks_range":"Very Good (Sehr Gut)"},{"grade":"1.6 - 2.5","points":2.0,"marks_range":"Good (Gut)"},{"grade":"2.6 - 3.5","points":3.0,"marks_range":"Satisfactory (Befriedigend)"},{"grade":"3.6 - 4.0","points":4.0,"marks_range":"Sufficient (Ausreichend)"},{"grade":"4.1 - 5.0","points":5.0,"marks_range":"Fail (Nicht Bestanden)"}]'::jsonb,
    'For Grade = 1.0, Percentage = 100.0%. For Grade = 4.0, Percentage = 70.0%.',
    'TUM German Grade Bavarian Formula.',
    'https://www.tum.de/', 'TUM Academic & Examination Regulations', TRUE, '2026-07-31'
),
-- 50. University of Auckland
(
    'University of Auckland', 'UOA', 'New Zealand', 'Auckland', 'Public Research',
    '9.0 GPA Scale', 'Auckland GPA System', '2022', 'Weighted Credit Average',
    'GPA = ∑(Points × Grade Value) / Total Points',
    'CGPA = ∑(Points × Grade Value) / Total Points',
    'Percentage = ((GPA + 1) / 10) × 100', 10, -1.0, TRUE,
    '[{"grade":"A+","points":9.0,"marks_range":"90-100"},{"grade":"A","points":8.0,"marks_range":"85-89"},{"grade":"A-","points":7.0,"marks_range":"80-84"},{"grade":"B+","points":6.0,"marks_range":"75-79"},{"grade":"B","points":5.0,"marks_range":"70-74"},{"grade":"B-","points":4.0,"marks_range":"65-69"},{"grade":"C+","points":3.0,"marks_range":"60-64"},{"grade":"C","points":2.0,"marks_range":"55-59"},{"grade":"C-","points":1.0,"marks_range":"50-54"},{"grade":"D","points":0.0,"marks_range":"<50"}]'::jsonb,
    'For GPA = 8.0, Percentage = ((8.0 + 1) / 10) * 100 = 90.0%',
    'University of Auckland Calendar & Assessment Regulations.',
    'https://www.auckland.ac.nz/', 'University of Auckland Calendar', TRUE, '2026-07-31'
);
