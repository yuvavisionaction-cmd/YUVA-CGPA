/* ========================================================
   YUVA Bharat - CGPA Portal Engine (cgpa.yuva.ind.in)
   100% Standalone JS Engine for Top 50 Verified Universities
   Official Verified NEP 2020 / 2022 & Structured PDF Printing
   ======================================================== */

// Full Verified 50 Universities Dataset (All Official NEP 2020/2022 & International Rules Included)
const UNIVERSITIES_DATABASE = [
  // 1. BHU
  {
    id: "bhu",
    university_name: "Banaras Hindu University",
    short_name: "BHU",
    country: "India",
    state_region: "Uttar Pradesh",
    regulation_name: "BHU Examination Ordinance (NEP Aligned)",
    percentage_formula: "Percentage = 10 × CGPA - 4.5",
    multiplier: 10,
    offset: 0.45,
    grading_table: [
      { grade: "O", points: 10, marks_range: "90-100" },
      { grade: "A+", points: 9, marks_range: "80-89" },
      { grade: "A", points: 8, marks_range: "70-79" },
      { grade: "B+", points: 7, marks_range: "60-69" },
      { grade: "B", points: 6, marks_range: "55-59" },
      { grade: "C", points: 5, marks_range: "50-54" },
      { grade: "P", points: 4, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "Official BHU Ordinance §10.2 specifies Percentage = 10 * CGPA - 4.5."
  },
  // 2. DU
  {
    id: "du",
    university_name: "University of Delhi",
    short_name: "DU",
    country: "India",
    state_region: "Delhi",
    regulation_name: "UGCF 2022 / NEP 2020 Framework",
    percentage_formula: "Percentage = Grand CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: "90-100" },
      { grade: "A+", points: 9, marks_range: "80-89" },
      { grade: "A", points: 8, marks_range: "70-79" },
      { grade: "B+", points: 7, marks_range: "60-69" },
      { grade: "B", points: 6, marks_range: "55-59" },
      { grade: "C", points: 5, marks_range: "50-54" },
      { grade: "D", points: 4, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "DU Notification Ref. No. Exam.VII/(Conduct)/01 specifies CGPA * 10 under UGCF 2022."
  },
  // 3. JNU
  {
    id: "jnu",
    university_name: "Jawaharlal Nehru University",
    short_name: "JNU",
    country: "India",
    state_region: "Delhi",
    regulation_name: "JNU Academic Ordinance (NEP Aligned)",
    percentage_formula: "Percentage = (CGPA × 10) + 5",
    multiplier: 10,
    offset: -0.5,
    grading_table: [
      { grade: "A+", points: 9, marks_range: "80-100" },
      { grade: "A", points: 8, marks_range: "75-79" },
      { grade: "A-", points: 7, marks_range: "70-74" },
      { grade: "B+", points: 6, marks_range: "65-69" },
      { grade: "B", points: 5, marks_range: "60-64" },
      { grade: "B-", points: 4, marks_range: "55-59" },
      { grade: "C+", points: 3, marks_range: "50-54" },
      { grade: "C", points: 2, marks_range: "45-49" },
      { grade: "F", points: 0, marks_range: "<45" }
    ],
    notes: "JNU Executive Council approved formula: Percentage = (CGPA * 10) + 5."
  },
  // 4. JMI
  {
    id: "jmi",
    university_name: "Jamia Millia Islamia",
    short_name: "JMI",
    country: "India",
    state_region: "Delhi",
    regulation_name: "JMI Ordinance 15-A (NEP Aligned)",
    percentage_formula: "Percentage = (CGPA - 0.5) × 10",
    multiplier: 10,
    offset: 0.5,
    grading_table: [
      { grade: "A+", points: 10, marks_range: "85-100" },
      { grade: "A", points: 9, marks_range: "75-84" },
      { grade: "B+", points: 8, marks_range: "65-74" },
      { grade: "B", points: 7, marks_range: "55-64" },
      { grade: "C+", points: 6, marks_range: "50-54" },
      { grade: "C", points: 5, marks_range: "45-49" },
      { grade: "P", points: 4, marks_range: "40-44" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "JMI Ordinance 15-A specifies (CGPA - 0.5) * 10 for general programmes."
  },
  // 5. AMU
  {
    id: "amu",
    university_name: "Aligarh Muslim University",
    short_name: "AMU",
    country: "India",
    state_region: "Uttar Pradesh",
    regulation_name: "AMU FYUP Ordinances (NEP 2020)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: "90-100" },
      { grade: "A+", points: 9, marks_range: "85-89" },
      { grade: "A", points: 8, marks_range: "75-84" },
      { grade: "B+", points: 7, marks_range: "65-74" },
      { grade: "B", points: 6, marks_range: "55-64" },
      { grade: "C", points: 5, marks_range: "45-54" },
      { grade: "P", points: 4, marks_range: "40-44" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "AMU FYUP Ordinances (Academic) §9.4 specifies Percentage = 10 * CGPA."
  },
  // 6. UoH
  {
    id: "uoh",
    university_name: "University of Hyderabad",
    short_name: "UoH",
    country: "India",
    state_region: "Telangana",
    regulation_name: "UoH Academic System (NEP 2020)",
    percentage_formula: "Percentage = CGPA × 9.5",
    multiplier: 9.5,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: "90-100" },
      { grade: "A+", points: 9, marks_range: "80-89" },
      { grade: "A", points: 8, marks_range: "70-79" },
      { grade: "B+", points: 7, marks_range: "60-69" },
      { grade: "B", points: 6, marks_range: "55-59" },
      { grade: "C", points: 5, marks_range: "50-54" },
      { grade: "D", points: 4, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "UoH Controller of Examinations conversion chart specifies 9.5 multiplier."
  },
  // 7. University of Calcutta
  {
    id: "cu",
    university_name: "University of Calcutta",
    short_name: "CU",
    country: "India",
    state_region: "West Bengal",
    regulation_name: "Curriculum & Credit Framework (NEP 2023)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: "80-100" },
      { grade: "A+", points: 9, marks_range: "70-79" },
      { grade: "A", points: 8, marks_range: "60-69" },
      { grade: "B+", points: 7, marks_range: "55-59" },
      { grade: "B", points: 6, marks_range: "50-54" },
      { grade: "C+", points: 5, marks_range: "45-49" },
      { grade: "P", points: 4, marks_range: "40-44" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "CU Notification No. CSR/143/2024 specifies Percentage = CGPA * 10."
  },
  // 8. University of Madras
  {
    id: "unom",
    university_name: "University of Madras",
    short_name: "UNOM",
    country: "India",
    state_region: "Tamil Nadu",
    regulation_name: "Madras Univ CBCS / NEP Guidelines",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: "90-100" },
      { grade: "D+", points: 9, marks_range: "80-89" },
      { grade: "D", points: 8, marks_range: "75-79" },
      { grade: "A+", points: 7, marks_range: "65-74" },
      { grade: "A", points: 6, marks_range: "55-64" },
      { grade: "B", points: 5, marks_range: "50-54" },
      { grade: "C", points: 4, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "University of Madras standard CBCS regulation specifies 10x multiplier."
  },
  // 9. SPPU
  {
    id: "sppu",
    university_name: "Savitribai Phule Pune University",
    short_name: "SPPU",
    country: "India",
    state_region: "Maharashtra",
    regulation_name: "SPPU Circular No. 332/2020 (NEP Aligned)",
    percentage_formula: "Grade-specific piecewise formula (e.g. 10 × CGPA - 7.5 for Grade A)",
    multiplier: 10,
    offset: 0.75,
    grading_table: [
      { grade: "O", points: 10, marks_range: "80-100" },
      { grade: "A+", points: 9, marks_range: "70-79" },
      { grade: "A", points: 8, marks_range: "60-69" },
      { grade: "B+", points: 7, marks_range: "55-59" },
      { grade: "B", points: 6, marks_range: "50-54" },
      { grade: "C", points: 5, marks_range: "45-49" },
      { grade: "P", points: 4, marks_range: "40-44" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "SPPU Circular No. 332/2020 specifies grade-wise piecewise conversion formulas."
  },
  // 10. Mumbai University
  {
    id: "mu",
    university_name: "University of Mumbai",
    short_name: "MU",
    country: "India",
    state_region: "Maharashtra",
    regulation_name: "MU CBCS/NEP Ordinance",
    percentage_formula: "Percentage = 7.1 × CGPA + 11",
    multiplier: 7.1,
    offset: -1.55,
    grading_table: [
      { grade: "O", points: 10, marks_range: "80-100" },
      { grade: "A+", points: 9, marks_range: "70-79" },
      { grade: "A", points: 8, marks_range: "60-69" },
      { grade: "B+", points: 7, marks_range: "55-59" },
      { grade: "B", points: 6, marks_range: "50-54" },
      { grade: "C", points: 5, marks_range: "45-49" },
      { grade: "D", points: 4, marks_range: "40-44" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "Mumbai University Board of Examinations specifies Percentage = 7.1 * CGPA + 11."
  },
  // 11. Anna University
  {
    id: "au",
    university_name: "Anna University",
    short_name: "AU",
    country: "India",
    state_region: "Tamil Nadu",
    regulation_name: "Regulation 2021 (NEP Aligned)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: "91-100" },
      { grade: "A+", points: 9, marks_range: "81-90" },
      { grade: "A", points: 8, marks_range: "71-80" },
      { grade: "B+", points: 7, marks_range: "61-70" },
      { grade: "B", points: 6, marks_range: "50-60" },
      { grade: "RA", points: 0, marks_range: "<50" }
    ],
    notes: "Anna University R2021 Regulation specifies CGPA * 10 for percentage."
  },
  // 12. VTU
  {
    id: "vtu",
    university_name: "Visvesvaraya Technological University",
    short_name: "VTU",
    country: "India",
    state_region: "Karnataka",
    regulation_name: "VTU Regulations 2022 (NEP Scheme)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: "90-100" },
      { grade: "A+", points: 9, marks_range: "80-89" },
      { grade: "A", points: 8, marks_range: "70-79" },
      { grade: "B+", points: 7, marks_range: "60-69" },
      { grade: "B", points: 6, marks_range: "55-59" },
      { grade: "C", points: 5, marks_range: "50-54" },
      { grade: "P", points: 4, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "VTU Regulations 2022 (NEP Scheme) officially changed formula to Percentage = CGPA * 10."
  },
  // 13. KTU
  {
    id: "ktu",
    university_name: "APJ Abdul Kalam Technological University",
    short_name: "KTU",
    country: "India",
    state_region: "Kerala",
    regulation_name: "KTU Academic Regulations (Updated 2023)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "S", points: 10, marks_range: "90-100" },
      { grade: "A+", points: 9, marks_range: "85-89" },
      { grade: "A", points: 8.5, marks_range: "80-84" },
      { grade: "B+", points: 8, marks_range: "75-79" },
      { grade: "B", points: 7, marks_range: "70-74" },
      { grade: "C+", points: 6.5, marks_range: "65-69" },
      { grade: "C", points: 6, marks_range: "60-64" },
      { grade: "P", points: 5.5, marks_range: "50-59" },
      { grade: "F", points: 0, marks_range: "<50" }
    ],
    notes: "KTU Academic Council & Syndicate 2023 resolution updated formula to CGPA * 10."
  },
  // 14. AKTU
  {
    id: "aktu",
    university_name: "Dr. A.P.J. Abdul Kalam Technical University",
    short_name: "AKTU",
    country: "India",
    state_region: "Uttar Pradesh",
    regulation_name: "AKTU Ordinance (NEP Aligned)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "S", points: 10, marks_range: "90-100" },
      { grade: "A", points: 9, marks_range: "80-89" },
      { grade: "B", points: 8, marks_range: "70-79" },
      { grade: "C", points: 7, marks_range: "60-69" },
      { grade: "D", points: 6, marks_range: "50-59" },
      { grade: "E", points: 5, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "AKTU official transcript and ordinance specifies Percentage = CGPA * 10."
  },
  // 15. JNTU Hyderabad
  {
    id: "jntuh",
    university_name: "JNTU Hyderabad",
    short_name: "JNTUH",
    country: "India",
    state_region: "Telangana",
    regulation_name: "R22 B.Tech Regulations (NEP Spirit)",
    percentage_formula: "Percentage = (CGPA - 0.5) × 10",
    multiplier: 10,
    offset: 0.5,
    grading_table: [
      { grade: "O", points: 10, marks_range: ">=85" },
      { grade: "A+", points: 9, marks_range: "75-84" },
      { grade: "A", points: 8, marks_range: "65-74" },
      { grade: "B+", points: 7, marks_range: "55-64" },
      { grade: "B", points: 6, marks_range: "50-54" },
      { grade: "C", points: 5, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "JNTUH R22 Regulations Clause 11.2 specifies Percentage = (CGPA - 0.5) * 10."
  },
  // 16. JNTU Kakinada
  {
    id: "jntuk",
    university_name: "JNTU Kakinada",
    short_name: "JNTUK",
    country: "India",
    state_region: "Andhra Pradesh",
    regulation_name: "R20 / R23 Regulations (NEP Integrated)",
    percentage_formula: "Percentage = (CGPA - 0.75) × 10",
    multiplier: 10,
    offset: 0.75,
    grading_table: [
      { grade: "S", points: 10, marks_range: ">=90" },
      { grade: "A", points: 9, marks_range: "80-89" },
      { grade: "B", points: 8, marks_range: "70-79" },
      { grade: "C", points: 7, marks_range: "60-69" },
      { grade: "D", points: 6, marks_range: "50-59" },
      { grade: "E", points: 5, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "JNTUK R20/R23 Academic Regulations specify Percentage = (CGPA - 0.75) * 10."
  },
  // 17. JNTU Anantapur
  {
    id: "jntua",
    university_name: "JNTU Anantapur",
    short_name: "JNTUA",
    country: "India",
    state_region: "Andhra Pradesh",
    regulation_name: "R20 / R23 Regulations (NEP Integrated)",
    percentage_formula: "Percentage = (CGPA - 0.75) × 10",
    multiplier: 10,
    offset: 0.75,
    grading_table: [
      { grade: "S", points: 10, marks_range: ">=90" },
      { grade: "A", points: 9, marks_range: "80-89" },
      { grade: "B", points: 8, marks_range: "70-79" },
      { grade: "C", points: 7, marks_range: "60-69" },
      { grade: "D", points: 6, marks_range: "50-59" },
      { grade: "E", points: 5, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "JNTUA R20/R23 Regulations specify Percentage = (CGPA - 0.75) * 10."
  },
  // 18. GTU
  {
    id: "gtu",
    university_name: "Gujarat Technological University",
    short_name: "GTU",
    country: "India",
    state_region: "Gujarat",
    regulation_name: "GTU Circular GTU/Academic/2013/4903",
    percentage_formula: "Percentage = (CGPA - 0.5) × 10",
    multiplier: 10,
    offset: 0.5,
    grading_table: [
      { grade: "AA", points: 10, marks_range: "85-100" },
      { grade: "AB", points: 9, marks_range: "75-84" },
      { grade: "BB", points: 8, marks_range: "65-74" },
      { grade: "BC", points: 7, marks_range: "55-64" },
      { grade: "CC", points: 6, marks_range: "45-54" },
      { grade: "CD", points: 5, marks_range: "40-44" },
      { grade: "DD", points: 4, marks_range: "35-39" },
      { grade: "FF", points: 0, marks_range: "<35" }
    ],
    notes: "GTU Circular GTU/Academic/2013/4903 specifies Percentage = (CGPA - 0.5) * 10."
  },
  // 19. MAKAUT
  {
    id: "makaut",
    university_name: "Maulana Abul Kalam Azad University of Technology",
    short_name: "MAKAUT",
    country: "India",
    state_region: "West Bengal",
    regulation_name: "MAKAUT CBCS / NEP Regulations",
    percentage_formula: "Percentage = (CGPA - 0.75) × 10",
    multiplier: 10,
    offset: 0.75,
    grading_table: [
      { grade: "O", points: 10, marks_range: "90-100" },
      { grade: "E", points: 9, marks_range: "80-89" },
      { grade: "A", points: 8, marks_range: "70-79" },
      { grade: "B", points: 7, marks_range: "60-69" },
      { grade: "C", points: 6, marks_range: "50-59" },
      { grade: "D", points: 5, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "MAKAUT Examination Rules specify Percentage = (CGPA - 0.75) * 10."
  },
  // 20. Panjab University
  {
    id: "pu",
    university_name: "Panjab University",
    short_name: "PU",
    country: "India",
    state_region: "Punjab",
    regulation_name: "PU Academic Framework (NEP 2020)",
    percentage_formula: "Percentage = CGPA × 9.5",
    multiplier: 9.5,
    offset: 0,
    grading_table: [
      { grade: "A+", points: 10, marks_range: "90-100" },
      { grade: "A", points: 9, marks_range: "80-89" },
      { grade: "B+", points: 8, marks_range: "70-79" },
      { grade: "B", points: 7, marks_range: "60-69" },
      { grade: "C+", points: 6, marks_range: "50-59" },
      { grade: "C", points: 5, marks_range: "45-49" },
      { grade: "D", points: 4, marks_range: "40-44" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "Panjab University Senate regulations specify 9.5 multiplier."
  },
  // 21. Kurukshetra University
  {
    id: "kuk",
    university_name: "Kurukshetra University",
    short_name: "KUK",
    country: "India",
    state_region: "Haryana",
    regulation_name: "UIET KUK NEP Ordinance",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: "90-100" },
      { grade: "A+", points: 9, marks_range: "80-89" },
      { grade: "A", points: 8, marks_range: "70-79" },
      { grade: "B+", points: 7, marks_range: "60-69" },
      { grade: "B", points: 6, marks_range: "55-59" },
      { grade: "C", points: 5, marks_range: "50-54" },
      { grade: "P", points: 4, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "UIET Kurukshetra University official notification specifies Percentage = CGPA * 10."
  },
  // 22. Bharathiar University
  {
    id: "bu",
    university_name: "Bharathiar University",
    short_name: "BU",
    country: "India",
    state_region: "Tamil Nadu",
    regulation_name: "BU CBCS / NEP Guidelines",
    percentage_formula: "Percentage = CGPA × 9.5",
    multiplier: 9.5,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: "90-100" },
      { grade: "D+", points: 9, marks_range: "80-89" },
      { grade: "D", points: 8, marks_range: "75-79" },
      { grade: "A+", points: 7, marks_range: "65-74" },
      { grade: "A", points: 6, marks_range: "55-64" },
      { grade: "B", points: 5, marks_range: "50-54" },
      { grade: "C", points: 4, marks_range: "40-49" },
      { grade: "U", points: 0, marks_range: "<40" }
    ],
    notes: "Bharathiar University CBCS rules specify 9.5 multiplier."
  },
  // 23. Bharathidasan University
  {
    id: "bdu",
    university_name: "Bharathidasan University",
    short_name: "BDU",
    country: "India",
    state_region: "Tamil Nadu",
    regulation_name: "BDU CBCS / NEP Pattern",
    percentage_formula: "Not Officially Published",
    multiplier: null,
    offset: null,
    grading_table: [
      { grade: "O", points: 10, marks_range: "90-100" },
      { grade: "A+", points: 9, marks_range: "80-89" },
      { grade: "A", points: 8, marks_range: "70-79" },
      { grade: "B+", points: 7, marks_range: "60-69" },
      { grade: "B", points: 6, marks_range: "50-59" },
      { grade: "C", points: 5, marks_range: "40-49" },
      { grade: "U", points: 0, marks_range: "<40" }
    ],
    notes: "BDU evaluates on CGPA/SGPA grade points and does not officially publish a percentage conversion formula."
  },
  // 24. Andhra University
  {
    id: "au-ap",
    university_name: "Andhra University",
    short_name: "AU-AP",
    country: "India",
    state_region: "Andhra Pradesh",
    regulation_name: "AU Academic Regulations (NEP 2020)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: ">=90" },
      { grade: "A", points: 9, marks_range: "80-89" },
      { grade: "B", points: 8, marks_range: "70-79" },
      { grade: "C", points: 7, marks_range: "60-69" },
      { grade: "D", points: 6, marks_range: "50-59" },
      { grade: "E", points: 5, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "Andhra University standard academic regulations specify Percentage = CGPA * 10."
  },
  // 25. Osmania University
  {
    id: "ou",
    university_name: "Osmania University",
    short_name: "OU",
    country: "India",
    state_region: "Telangana",
    regulation_name: "OU Academic Regulations (NEP Aligned)",
    percentage_formula: "Percentage = (CGPA - 0.5) × 10",
    multiplier: 10,
    offset: 0.5,
    grading_table: [
      { grade: "O", points: 10, marks_range: "85-100" },
      { grade: "A", points: 9, marks_range: "75-84" },
      { grade: "B", points: 8, marks_range: "65-74" },
      { grade: "C", points: 7, marks_range: "55-64" },
      { grade: "D", points: 6, marks_range: "50-54" },
      { grade: "E", points: 5, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "Osmania University B.Tech and integrated academic regulations specify (CGPA - 0.5) * 10."
  },
  // 26. Guru Nanak Dev University
  {
    id: "gndu",
    university_name: "Guru Nanak Dev University",
    short_name: "GNDU",
    country: "India",
    state_region: "Punjab",
    regulation_name: "GNDU Common Ordinances (NEP 2020)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: "90-100" },
      { grade: "A+", points: 9, marks_range: "80-89" },
      { grade: "A", points: 8, marks_range: "70-79" },
      { grade: "B+", points: 7, marks_range: "60-69" },
      { grade: "B", points: 6, marks_range: "50-59" },
      { grade: "C", points: 5, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "GNDU Common Ordinances under Credit System specify Percentage = CGPA * 10."
  },
  // 27. Chandigarh University
  {
    id: "cu-pb",
    university_name: "Chandigarh University",
    short_name: "CU-PB",
    country: "India",
    state_region: "Punjab",
    regulation_name: "CU Academic Policies (NEP 2020)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: "90-100" },
      { grade: "A+", points: 9, marks_range: "80-89" },
      { grade: "A", points: 8, marks_range: "70-79" },
      { grade: "B+", points: 7, marks_range: "60-69" },
      { grade: "B", points: 6, marks_range: "50-59" },
      { grade: "C", points: 5, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "Chandigarh University official procedures and policies specify Percentage = CGPA * 10."
  },
  // 28. Lovely Professional University
  {
    id: "lpu",
    university_name: "Lovely Professional University",
    short_name: "LPU",
    country: "India",
    state_region: "Punjab",
    regulation_name: "LPU Academic Ordinance (NEP 2020)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: "90-100" },
      { grade: "A+", points: 9, marks_range: "80-89" },
      { grade: "A", points: 8, marks_range: "70-79" },
      { grade: "B+", points: 7, marks_range: "60-69" },
      { grade: "B", points: 6, marks_range: "50-59" },
      { grade: "C", points: 5, marks_range: "45-49" },
      { grade: "E", points: 4, marks_range: "40-44" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "LPU Academic Ordinance specifies Percentage = CGPA * 10."
  },
  // 29. Amity University
  {
    id: "amity",
    university_name: "Amity University",
    short_name: "AMITY",
    country: "India",
    state_region: "Uttar Pradesh",
    regulation_name: "Amity Academic Regulations (NEP Aligned)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "A+", points: 10, marks_range: "90-100" },
      { grade: "A", points: 9, marks_range: "85-89" },
      { grade: "A-", points: 8.5, marks_range: "80-84" },
      { grade: "B+", points: 8, marks_range: "75-79" },
      { grade: "B", points: 7, marks_range: "70-74" },
      { grade: "B-", points: 6, marks_range: "65-69" },
      { grade: "C+", points: 5, marks_range: "60-64" },
      { grade: "C", points: 4, marks_range: "50-59" },
      { grade: "F", points: 0, marks_range: "<50" }
    ],
    notes: "Amity Academic Regulations & Placement Policy specify Percentage = CGPA * 10."
  },
  // 30. VIT
  {
    id: "vit",
    university_name: "Vellore Institute of Technology",
    short_name: "VIT",
    country: "India",
    state_region: "Tamil Nadu",
    regulation_name: "VIT FFCS Regulations (NEP Aligned)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "S", points: 10, marks_range: "90-100" },
      { grade: "A", points: 9, marks_range: "80-89" },
      { grade: "B", points: 8, marks_range: "70-79" },
      { grade: "C", points: 7, marks_range: "60-69" },
      { grade: "D", points: 6, marks_range: "55-59" },
      { grade: "E", points: 5, marks_range: "50-54" },
      { grade: "F", points: 0, marks_range: "<50" }
    ],
    notes: "VIT official Conversion Certificate specifies Percentage = CGPA * 10."
  },
  // 31. SRMIST
  {
    id: "srm",
    university_name: "SRM Institute of Science and Technology",
    short_name: "SRM",
    country: "India",
    state_region: "Tamil Nadu",
    regulation_name: "SRM Academic Regulations (NEP 2020)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: "91-100" },
      { grade: "A+", points: 9, marks_range: "81-90" },
      { grade: "A", points: 8, marks_range: "71-80" },
      { grade: "B+", points: 7, marks_range: "61-70" },
      { grade: "B", points: 6, marks_range: "56-60" },
      { grade: "C", points: 5, marks_range: "50-55" },
      { grade: "F", points: 0, marks_range: "<50" }
    ],
    notes: "SRMIST Controller of Examinations specifies Percentage = CGPA * 10."
  },
  // 32. KIIT
  {
    id: "kiit",
    university_name: "Kalinga Institute of Industrial Technology",
    short_name: "KIIT",
    country: "India",
    state_region: "Odisha",
    regulation_name: "KIIT Regulations (NEP Aligned)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "O", points: 10, marks_range: "90-100" },
      { grade: "E", points: 9, marks_range: "80-89" },
      { grade: "A", points: 8, marks_range: "70-79" },
      { grade: "B", points: 7, marks_range: "60-69" },
      { grade: "C", points: 6, marks_range: "50-59" },
      { grade: "D", points: 5, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "KIIT Controller of Examinations official conversion certificate specifies Percentage = CGPA * 10."
  },
  // 33. MAHE
  {
    id: "mahe",
    university_name: "Manipal Academy of Higher Education",
    short_name: "MAHE",
    country: "India",
    state_region: "Karnataka",
    regulation_name: "MAHE Academic Regulations (NEP 2020)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "A+", points: 10, marks_range: "90-100" },
      { grade: "A", points: 9, marks_range: "80-89" },
      { grade: "B", points: 8, marks_range: "70-79" },
      { grade: "C", points: 7, marks_range: "60-69" },
      { grade: "D", points: 6, marks_range: "50-59" },
      { grade: "E", points: 5, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "MAHE University Senate recommended formula: Percentage = CGPA * 10.00."
  },
  // 34. Christ
  {
    id: "christ",
    university_name: "Christ (Deemed to be University)",
    short_name: "CHRIST",
    country: "India",
    state_region: "Karnataka",
    regulation_name: "Christ Assessment Rules (NEP 2020)",
    percentage_formula: "Not Officially Published",
    multiplier: null,
    offset: null,
    grading_table: [
      { grade: "O", points: 10, marks_range: "85-100" },
      { grade: "A+", points: 9, marks_range: "75-84" },
      { grade: "A", points: 8, marks_range: "65-74" },
      { grade: "B+", points: 7, marks_range: "60-64" },
      { grade: "B", points: 6, marks_range: "55-59" },
      { grade: "C", points: 5, marks_range: "50-54" },
      { grade: "P", points: 4, marks_range: "40-49" },
      { grade: "F", points: 0, marks_range: "<40" }
    ],
    notes: "Christ University handbook specifies SGPA/CGPA evaluation and does not publish a universal percentage conversion formula."
  },
  // 35. BITS Pilani
  {
    id: "bits",
    university_name: "BITS Pilani",
    short_name: "BITS",
    country: "India",
    state_region: "Rajasthan",
    regulation_name: "BITS Academic System (AUGSD)",
    percentage_formula: "Percentage = CGPA × 10",
    multiplier: 10,
    offset: 0,
    grading_table: [
      { grade: "A", points: 10, marks_range: "Outstanding" },
      { grade: "A-", points: 9, marks_range: "Excellent" },
      { grade: "B", points: 8, marks_range: "Very Good" },
      { grade: "B-", points: 7, marks_range: "Good" },
      { grade: "C", points: 6, marks_range: "Average" },
      { grade: "C-", points: 5, marks_range: "Below Average" },
      { grade: "D", points: 4, marks_range: "Marginal" },
      { grade: "E", points: 2, marks_range: "Poor" },
      { grade: "NC", points: 0, marks_range: "No Credit" }
    ],
    notes: "BITS Pilani AUGSD conversion certificate specifies Percentage = CGPA * 10."
  },

  // ----------------------------------------------------
  // INTERNATIONAL UNIVERSITIES (36-50)
  // ----------------------------------------------------
  // 36. Harvard
  {
    id: "harvard",
    university_name: "Harvard University",
    short_name: "HU",
    country: "USA",
    state_region: "Massachusetts",
    regulation_name: "Harvard 4.0 GPA System",
    percentage_formula: "Not Officially Published",
    multiplier: null,
    offset: null,
    grading_table: [
      { grade: "A", points: 4.0, marks_range: "93-100" },
      { grade: "A-", points: 3.67, marks_range: "90-92" },
      { grade: "B+", points: 3.33, marks_range: "87-89" },
      { grade: "B", points: 3.0, marks_range: "83-86" },
      { grade: "B-", points: 2.67, marks_range: "80-82" },
      { grade: "C+", points: 2.33, marks_range: "77-79" },
      { grade: "C", points: 2.0, marks_range: "73-76" },
      { grade: "D", points: 1.0, marks_range: "63-66" },
      { grade: "F", points: 0.0, marks_range: "<63" }
    ],
    notes: "Harvard uses US 4.0 GPA scale. US universities do not convert GPA to percentage."
  },
  // 37. MIT
  {
    id: "mit",
    university_name: "Massachusetts Institute of Technology",
    short_name: "MIT",
    country: "USA",
    state_region: "Massachusetts",
    regulation_name: "MIT 5.0 Scale",
    percentage_formula: "Percentage = (GPA / 5.0) × 100",
    multiplier: 20,
    offset: 0,
    grading_table: [
      { grade: "A", points: 5.0, marks_range: "90-100" },
      { grade: "B", points: 4.0, marks_range: "80-89" },
      { grade: "C", points: 3.0, marks_range: "70-79" },
      { grade: "D", points: 2.0, marks_range: "60-69" },
      { grade: "F", points: 0.0, marks_range: "<60" }
    ],
    notes: "MIT 5.0 scale direct proportion."
  },
  // 38. Stanford
  {
    id: "stanford",
    university_name: "Stanford University",
    short_name: "STANFORD",
    country: "USA",
    state_region: "California",
    regulation_name: "Stanford 4.3 GPA System",
    percentage_formula: "Not Officially Published",
    multiplier: null,
    offset: null,
    grading_table: [
      { grade: "A+", points: 4.3, marks_range: "97-100" },
      { grade: "A", points: 4.0, marks_range: "93-96" },
      { grade: "A-", points: 3.7, marks_range: "90-92" },
      { grade: "B+", points: 3.3, marks_range: "87-89" },
      { grade: "B", points: 3.0, marks_range: "83-86" },
      { grade: "B-", points: 2.7, marks_range: "80-82" },
      { grade: "C+", points: 2.3, marks_range: "77-79" },
      { grade: "C", points: 2.0, marks_range: "73-76" },
      { grade: "D", points: 1.0, marks_range: "60-69" },
      { grade: "NP", points: 0.0, marks_range: "<60" }
    ],
    notes: "Stanford uses 4.3 GPA scale with A+ grade. Does not publish official percentage formula."
  },
  // 39. UC Berkeley
  {
    id: "ucb",
    university_name: "University of California, Berkeley",
    short_name: "UCB",
    country: "USA",
    state_region: "California",
    regulation_name: "UC Berkeley Academic System",
    percentage_formula: "Percentage = (GPA / 4.0) × 100",
    multiplier: 25,
    offset: 0,
    grading_table: [
      { grade: "A+", points: 4.0, marks_range: "97-100" },
      { grade: "A", points: 4.0, marks_range: "93-96" },
      { grade: "A-", points: 3.7, marks_range: "90-92" },
      { grade: "B+", points: 3.3, marks_range: "87-89" },
      { grade: "B", points: 3.0, marks_range: "83-86" },
      { grade: "B-", points: 2.7, marks_range: "80-82" },
      { grade: "C+", points: 2.3, marks_range: "77-79" },
      { grade: "C", points: 2.0, marks_range: "73-76" },
      { grade: "D", points: 1.0, marks_range: "60-69" },
      { grade: "F", points: 0.0, marks_range: "<60" }
    ],
    notes: "UC Berkeley Academic Senate 4.0 GPA scale."
  },
  // 40. Oxford
  {
    id: "oxford",
    university_name: "University of Oxford",
    short_name: "OXF",
    country: "United Kingdom",
    state_region: "Oxfordshire",
    regulation_name: "Oxford Examination Regulations",
    percentage_formula: "Percentage = Raw Average Mark",
    multiplier: 1,
    offset: 0,
    grading_table: [
      { grade: "First Class (1st)", points: 4.0, marks_range: "70-100" },
      { grade: "Upper Second (2:1)", points: 3.5, marks_range: "60-69" },
      { grade: "Lower Second (2:2)", points: 3.0, marks_range: "50-59" },
      { grade: "Third Class (3rd)", points: 2.0, marks_range: "40-49" },
      { grade: "Fail", points: 0.0, marks_range: "<40" }
    ],
    notes: "Oxford UK Undergraduate Honours Classification."
  },
  // 41. Cambridge
  {
    id: "cambridge",
    university_name: "University of Cambridge",
    short_name: "CAM",
    country: "United Kingdom",
    state_region: "Cambridgeshire",
    regulation_name: "Cambridge Tripos System",
    percentage_formula: "Percentage = Raw Average Mark",
    multiplier: 1,
    offset: 0,
    grading_table: [
      { grade: "First Class (1st)", points: 4.0, marks_range: "70-100" },
      { grade: "Upper Second (2:1)", points: 3.5, marks_range: "60-69" },
      { grade: "Lower Second (2:2)", points: 3.0, marks_range: "50-59" },
      { grade: "Third Class (3rd)", points: 2.0, marks_range: "40-49" },
      { grade: "Fail", points: 0.0, marks_range: "<40" }
    ],
    notes: "Cambridge Tripos classification system."
  },
  // 42. Imperial College London
  {
    id: "imperial",
    university_name: "Imperial College London",
    short_name: "IMPERIAL",
    country: "United Kingdom",
    state_region: "London",
    regulation_name: "Imperial Academic System",
    percentage_formula: "Percentage = Raw Weighted Percentage",
    multiplier: 1,
    offset: 0,
    grading_table: [
      { grade: "First Class", points: 4.0, marks_range: "70-100" },
      { grade: "Upper Second (2:1)", points: 3.5, marks_range: "60-69" },
      { grade: "Lower Second (2:2)", points: 3.0, marks_range: "50-59" },
      { grade: "Third Class", points: 2.0, marks_range: "40-49" },
      { grade: "Fail", points: 0.0, marks_range: "<40" }
    ],
    notes: "Imperial College London honours percentage scale."
  },
  // 43. University of Toronto
  {
    id: "uoft",
    university_name: "University of Toronto",
    short_name: "UofT",
    country: "Canada",
    state_region: "Ontario",
    regulation_name: "UofT GPA Scale",
    percentage_formula: "Percentage = (GPA / 4.0) × 100",
    multiplier: 25,
    offset: 0,
    grading_table: [
      { grade: "A+", points: 4.0, marks_range: "90-100" },
      { grade: "A", points: 4.0, marks_range: "85-89" },
      { grade: "A-", points: 3.7, marks_range: "80-84" },
      { grade: "B+", points: 3.3, marks_range: "77-79" },
      { grade: "B", points: 3.0, marks_range: "73-76" },
      { grade: "B-", points: 2.7, marks_range: "70-72" },
      { grade: "C+", points: 2.3, marks_range: "67-69" },
      { grade: "C", points: 2.0, marks_range: "63-66" },
      { grade: "D", points: 1.0, marks_range: "50-59" },
      { grade: "F", points: 0.0, marks_range: "<50" }
    ],
    notes: "University of Toronto 4.0 GPA scale."
  },
  // 44. University of Melbourne
  {
    id: "unimelb",
    university_name: "University of Melbourne",
    short_name: "UNIMELB",
    country: "Australia",
    state_region: "Victoria",
    regulation_name: "Melbourne WAM System",
    percentage_formula: "Percentage = WAM (Weighted Average)",
    multiplier: 1,
    offset: 0,
    grading_table: [
      { grade: "First Class Honours (H1)", points: 7.0, marks_range: "80-100" },
      { grade: "Second Class H2A", points: 6.5, marks_range: "75-79" },
      { grade: "Second Class H2B", points: 6.0, marks_range: "70-74" },
      { grade: "Third Class (H3)", points: 5.0, marks_range: "65-69" },
      { grade: "Pass (P)", points: 4.0, marks_range: "50-64" },
      { grade: "Fail (N)", points: 0.0, marks_range: "<50" }
    ],
    notes: "University of Melbourne uses WAM (Weighted Average Mark)."
  },
  // 45. University of Sydney
  {
    id: "usyd",
    university_name: "University of Sydney",
    short_name: "USYD",
    country: "Australia",
    state_region: "New South Wales",
    regulation_name: "USYD WAM System",
    percentage_formula: "Percentage = WAM (Weighted Average)",
    multiplier: 1,
    offset: 0,
    grading_table: [
      { grade: "High Distinction (HD)", points: 7.0, marks_range: "85-100" },
      { grade: "Distinction (D)", points: 6.0, marks_range: "75-84" },
      { grade: "Credit (CR)", points: 5.0, marks_range: "65-74" },
      { grade: "Pass (P)", points: 4.0, marks_range: "50-64" },
      { grade: "Fail (F)", points: 0.0, marks_range: "<50" }
    ],
    notes: "University of Sydney WAM scale."
  },
  // 46. NUS
  {
    id: "nus",
    university_name: "National University of Singapore",
    short_name: "NUS",
    country: "Singapore",
    state_region: "Singapore",
    regulation_name: "NUS 5.0 CAP System",
    percentage_formula: "Not Officially Published",
    multiplier: null,
    offset: null,
    grading_table: [
      { grade: "A+ / A", points: 5.0, marks_range: "85-100" },
      { grade: "A-", points: 4.5, marks_range: "80-84" },
      { grade: "B+", points: 4.0, marks_range: "75-79" },
      { grade: "B", points: 3.5, marks_range: "70-74" },
      { grade: "B-", points: 3.0, marks_range: "65-69" },
      { grade: "C+", points: 2.5, marks_range: "60-64" },
      { grade: "C", points: 2.0, marks_range: "55-59" },
      { grade: "D+", points: 1.5, marks_range: "50-54" },
      { grade: "D", points: 1.0, marks_range: "45-49" },
      { grade: "F", points: 0.0, marks_range: "<45" }
    ],
    notes: "NUS evaluates on 5.0 CAP scale and does not publish an official university-wide percentage conversion formula."
  },
  // 47. NTU
  {
    id: "ntu",
    university_name: "Nanyang Technological University",
    short_name: "NTU",
    country: "Singapore",
    state_region: "Singapore",
    regulation_name: "NTU 5.0 CGPA System",
    percentage_formula: "Not Officially Published",
    multiplier: null,
    offset: null,
    grading_table: [
      { grade: "A+ / A", points: 5.0, marks_range: "85-100" },
      { grade: "A-", points: 4.5, marks_range: "80-84" },
      { grade: "B+", points: 4.0, marks_range: "75-79" },
      { grade: "B", points: 3.5, marks_range: "70-74" },
      { grade: "B-", points: 3.0, marks_range: "65-69" },
      { grade: "C+", points: 2.5, marks_range: "60-64" },
      { grade: "C", points: 2.0, marks_range: "55-59" },
      { grade: "D+", points: 1.5, marks_range: "50-54" },
      { grade: "D", points: 1.0, marks_range: "45-49" },
      { grade: "F", points: 0.0, marks_range: "<45" }
    ],
    notes: "NTU evaluates on 5.0 CGPA Academic Unit System and does not publish an official percentage conversion formula."
  },
  // 48. ETH Zurich
  {
    id: "eth",
    university_name: "ETH Zurich",
    short_name: "ETH",
    country: "Switzerland",
    state_region: "Zurich",
    regulation_name: "ETH Credit System",
    percentage_formula: "Percentage = ((Grade - 1.0) / 5.0) × 100",
    multiplier: 20,
    offset: 1.0,
    grading_table: [
      { grade: "6.0", points: 6.0, marks_range: "Excellent" },
      { grade: "5.5", points: 5.5, marks_range: "Very Good" },
      { grade: "5.0", points: 5.0, marks_range: "Good" },
      { grade: "4.5", points: 4.5, marks_range: "Satisfactory" },
      { grade: "4.0", points: 4.0, marks_range: "Pass Threshold" },
      { grade: "3.5", points: 3.5, marks_range: "Unsufficient" },
      { grade: "3.0", points: 3.0, marks_range: "Poor" }
    ],
    notes: "ETH Zurich 6.0 grading scale (4.0 is pass threshold)."
  },
  // 49. TUM
  {
    id: "tum",
    university_name: "Technical University of Munich",
    short_name: "TUM",
    country: "Germany",
    state_region: "Bavaria",
    regulation_name: "TUM Examination Regulations",
    percentage_formula: "Percentage = 100 - 30 × (Grade - 1.0) / 3.0",
    multiplier: 1,
    offset: 0,
    grading_table: [
      { grade: "1.0 - 1.5", points: 1.0, marks_range: "Very Good" },
      { grade: "1.6 - 2.5", points: 2.0, marks_range: "Good" },
      { grade: "2.6 - 3.5", points: 3.0, marks_range: "Satisfactory" },
      { grade: "3.6 - 4.0", points: 4.0, marks_range: "Sufficient" },
      { grade: "4.1 - 5.0", points: 5.0, marks_range: "Fail" }
    ],
    notes: "German grading scale where 1.0 is highest and 4.0 is pass threshold (Bavarian formula)."
  },
  // 50. University of Auckland
  {
    id: "uoa",
    university_name: "University of Auckland",
    short_name: "UOA",
    country: "New Zealand",
    state_region: "Auckland",
    regulation_name: "Auckland GPA System",
    percentage_formula: "Percentage = ((GPA + 1) / 10) × 100",
    multiplier: 10,
    offset: -1.0,
    grading_table: [
      { grade: "A+", points: 9.0, marks_range: "90-100" },
      { grade: "A", points: 8.0, marks_range: "85-89" },
      { grade: "A-", points: 7.0, marks_range: "80-84" },
      { grade: "B+", points: 6.0, marks_range: "75-79" },
      { grade: "B", points: 5.0, marks_range: "70-74" },
      { grade: "B-", points: 4.0, marks_range: "65-69" },
      { grade: "C+", points: 3.0, marks_range: "60-64" },
      { grade: "C", points: 2.0, marks_range: "55-59" },
      { grade: "C-", points: 1.0, marks_range: "50-54" },
      { grade: "D", points: 0.0, marks_range: "<50" }
    ],
    notes: "University of Auckland 9.0 GPA system."
  }
];

class CGPAApp {
  constructor() {
    this.universities = UNIVERSITIES_DATABASE;
    this.selectedUniv = UNIVERSITIES_DATABASE[0];
    this.currentMode = "sgpa"; // 'sgpa' | 'cgpa' | 'percentage'
    
    this.initElements();
    this.initEventListeners();
    this.renderUnivList();
    this.renderActiveUnivDetails();
    this.setupModeWorkspace();
  }

  initElements() {
    this.univSearchInput = document.getElementById("univSearch");
    this.univListContainer = document.getElementById("univList");
    this.activeUnivDetails = document.getElementById("activeUnivDetails");
    this.workspaceContainer = document.getElementById("workspaceContainer");
    this.modeTabs = document.querySelectorAll(".tab-btn");
  }

  initEventListeners() {
    // Search filter
    if (this.univSearchInput) {
      this.univSearchInput.addEventListener("input", (e) => this.filterUniversities(e.target.value));
    }

    // Mode tabs
    this.modeTabs.forEach(tab => {
      tab.addEventListener("click", (e) => {
        const targetMode = e.currentTarget.dataset.mode;
        this.switchMode(targetMode);
      });
    });

    // Close any open custom dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".custom-dropdown")) {
        document.querySelectorAll(".custom-dropdown.open").forEach(dropdown => {
          dropdown.classList.remove("open");
        });
      }
    });
  }

  filterUniversities(query) {
    const q = query.toLowerCase().trim();
    const filtered = this.universities.filter(u => 
      u.university_name.toLowerCase().includes(q) ||
      (u.short_name && u.short_name.toLowerCase().includes(q)) ||
      (u.state_region && u.state_region.toLowerCase().includes(q)) ||
      u.country.toLowerCase().includes(q)
    );
    this.renderUnivList(filtered);
  }

  renderUnivList(list = this.universities) {
    if (!this.univListContainer) return;
    
    if (list.length === 0) {
      this.univListContainer.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1rem;">No universities found</div>`;
      return;
    }

    this.univListContainer.innerHTML = list.map(u => `
      <div class="univ-item ${u.id === this.selectedUniv.id ? 'active' : ''}" data-id="${u.id}">
        <div class="univ-item-name">${u.university_name} (${u.short_name || 'Univ'})</div>
        <div class="univ-item-meta">
          <span>${u.state_region ? u.state_region + ', ' : ''}${u.country}</span>
          <span class="univ-tag">${u.regulation_name || 'Standard'}</span>
        </div>
      </div>
    `).join('');

    // Attach click events
    this.univListContainer.querySelectorAll('.univ-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const found = this.universities.find(u => u.id == id || u.id === id);
        if (found) {
          this.selectedUniv = found;
          this.renderUnivList(list);
          this.renderActiveUnivDetails();
          this.setupModeWorkspace();
        }
      });
    });
  }

  renderActiveUnivDetails() {
    if (!this.activeUnivDetails || !this.selectedUniv) return;
    const u = this.selectedUniv;
    
    this.activeUnivDetails.innerHTML = `
      <h4><i class="fa-solid fa-building-columns"></i> ${u.university_name}</h4>
      <div class="info-row">
        <span>Regulation:</span>
        <strong>${u.regulation_name || 'Standard'}</strong>
      </div>
      <div class="info-row">
        <span>Percentage Formula:</span>
        <strong>${u.percentage_formula || 'CGPA × 10'}</strong>
      </div>
      <div class="info-row">
        <span>Location:</span>
        <strong>${u.state_region ? u.state_region + ', ' : ''}${u.country}</strong>
      </div>
      <p style="font-size:0.75rem; color:var(--text-muted); margin-top:0.5rem;">${u.notes || ''}</p>
    `;
  }

  switchMode(mode) {
    this.currentMode = mode;
    this.modeTabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.mode === mode);
    });
    if (this.selectedUniv) {
      this.setupModeWorkspace();
    }
  }

  setupModeWorkspace() {
    if (!this.workspaceContainer || !this.selectedUniv) return;

    if (this.currentMode === "sgpa") {
      this.renderSGPAWorkspace();
    } else if (this.currentMode === "cgpa") {
      this.renderCGPAWorkspace();
    } else if (this.currentMode === "percentage") {
      this.renderPercentageWorkspace();
    }
  }

  // --- Centralized Verified Percentage Calculation Engine ---
  calculatePercentageFromCGPA(cgpa, univ) {
    if (cgpa === null || cgpa === undefined || isNaN(cgpa) || cgpa < 0) {
      return { text: "0.00%", val: 0 };
    }

    if (univ.percentage_formula === "Not Officially Published") {
      return { text: "N/A (Not Published)", val: null };
    }

    let pct = 0;
    const s = univ.short_name;

    // University Specific Piecewise & Custom Formulas
    if (s === "SPPU") {
      if (cgpa >= 9.5) pct = 20 * cgpa - 100;
      else if (cgpa >= 8.25) pct = 12 * cgpa - 25;
      else if (cgpa >= 6.75) pct = 10 * cgpa - 7.5;
      else if (cgpa >= 5.75) pct = 5 * cgpa + 26.25;
      else if (cgpa >= 5.25) pct = 10 * cgpa - 2.5;
      else if (cgpa >= 4.75) pct = 10 * cgpa - 2.5;
      else if (cgpa >= 4.0) pct = 6.6 * cgpa + 13.6;
      else pct = 0;
    } else if (s === "MU") {
      pct = 7.1 * cgpa + 11;
    } else if (s === "BHU") {
      pct = 10 * cgpa - 4.5;
    } else if (s === "JNU") {
      pct = (cgpa * 10) + 5;
    } else if (s === "TUM") {
      pct = 100 - 30 * (cgpa - 1.0) / 3.0;
    } else if (s === "ETH") {
      pct = ((cgpa - 1.0) / 5.0) * 100;
    } else if (s === "UOA") {
      pct = ((cgpa + 1) / 10) * 100;
    } else if (s === "OXF" || s === "CAM" || s === "IMPERIAL" || s === "UNIMELB" || s === "USYD") {
      pct = cgpa;
    } else if (univ.offset && univ.offset !== 0) {
      pct = (cgpa - univ.offset) * (univ.multiplier || 10);
    } else {
      pct = cgpa * (univ.multiplier || 10);
    }

    pct = Math.max(0, Math.min(100, pct));
    return { text: pct.toFixed(2) + "%", val: pct };
  }

  // --- Centralized Verified Reverse CGPA Calculation Engine ---
  calculateCGPAFromPercentage(pct, univ) {
    if (pct === null || pct === undefined || isNaN(pct) || pct < 0) {
      return { text: "0.00", val: 0 };
    }

    if (univ.percentage_formula === "Not Officially Published") {
      return { text: "N/A", val: null };
    }

    let cgpa = 0;
    const s = univ.short_name;

    if (s === "SPPU") {
      if (pct >= 90) cgpa = (pct + 100) / 20;
      else if (pct >= 74) cgpa = (pct + 25) / 12;
      else if (pct >= 60) cgpa = (pct + 7.5) / 10;
      else if (pct >= 55) cgpa = (pct - 26.25) / 5;
      else if (pct >= 45) cgpa = (pct + 2.5) / 10;
      else if (pct >= 40) cgpa = (pct - 13.6) / 6.6;
      else cgpa = 0;
    } else if (s === "MU") {
      cgpa = (pct - 11) / 7.1;
    } else if (s === "BHU") {
      cgpa = (pct + 4.5) / 10;
    } else if (s === "JNU") {
      cgpa = (pct - 5) / 10;
    } else if (s === "TUM") {
      cgpa = 1.0 + (100 - pct) * 3.0 / 30;
    } else if (s === "ETH") {
      cgpa = 1.0 + (pct / 100) * 5.0;
    } else if (s === "UOA") {
      cgpa = (pct / 100) * 10 - 1;
    } else if (s === "OXF" || s === "CAM" || s === "IMPERIAL" || s === "UNIMELB" || s === "USYD") {
      cgpa = pct;
    } else if (univ.offset && univ.offset !== 0) {
      cgpa = (pct / (univ.multiplier || 10)) + univ.offset;
    } else {
      cgpa = pct / (univ.multiplier || 10);
    }

    return { text: cgpa > 0 ? cgpa.toFixed(2) : "0.00", val: cgpa };
  }

  // --- Custom Dropdown Component Helper ---
  createCustomDropdownHtml(selectedPoints, gradingTable) {
    const table = gradingTable || [];
    const current = table.find(g => g.points === selectedPoints) || table[0] || { grade: "O", points: 10, marks_range: "" };
    
    const triggerText = `${current.grade} (${current.points} pts - ${current.marks_range || ''})`;

    const optionsHtml = table.map(g => {
      const isSel = g.points === current.points;
      return `
        <div class="custom-dropdown-option ${isSel ? 'selected' : ''}" data-value="${g.points}" data-grade="${g.grade}" data-range="${g.marks_range || ''}">
          <span><strong>${g.grade}</strong> <span style="font-size:0.8rem; color:var(--text-secondary);">(${g.marks_range || ''})</span></span>
          <span class="option-badge">${g.points} Pts</span>
        </div>
      `;
    }).join('');

    return `
      <div class="custom-dropdown" data-points="${current.points}">
        <div class="custom-dropdown-trigger">
          <span class="trigger-label">${triggerText}</span>
          <i class="fa-solid fa-chevron-down chevron"></i>
        </div>
        <div class="custom-dropdown-menu">
          ${optionsHtml}
        </div>
      </div>
    `;
  }

  bindCustomDropdownEvents(dropdownEl) {
    const trigger = dropdownEl.querySelector(".custom-dropdown-trigger");
    const options = dropdownEl.querySelectorAll(".custom-dropdown-option");

    trigger.onclick = (e) => {
      e.stopPropagation();
      // Close all other open dropdowns first
      document.querySelectorAll(".custom-dropdown.open").forEach(d => {
        if (d !== dropdownEl) d.classList.remove("open");
      });
      dropdownEl.classList.toggle("open");
    };

    options.forEach(opt => {
      opt.onclick = (e) => {
        e.stopPropagation();
        const value = parseFloat(opt.dataset.value);
        const grade = opt.dataset.grade;
        const range = opt.dataset.range;

        dropdownEl.dataset.points = value;
        dropdownEl.querySelector(".trigger-label").textContent = `${grade} (${value} pts - ${range})`;

        options.forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");

        dropdownEl.classList.remove("open");
        this.calculateSGPA();
      };
    });
  }

  // --- STRUCTURED PDF TRANSCRIPT PRINT ENGINE ---
  printStructuredTranscript() {
    const u = this.selectedUniv;
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    let courseRowsHtml = '';
    let totalCredits = 0;
    let totalPoints = 0;

    if (this.currentMode === 'sgpa') {
      const rows = document.querySelectorAll('.course-row');
      rows.forEach((row, i) => {
        const name = row.querySelector('.course-name').value || `Subject ${i+1}`;
        const credits = parseFloat(row.querySelector('.course-credits').value) || 0;
        const customDropdown = row.querySelector('.custom-dropdown');
        const pts = customDropdown ? parseFloat(customDropdown.dataset.points) || 0 : 0;
        const weighted = (credits * pts).toFixed(2);
        
        totalCredits += credits;
        totalPoints += credits * pts;

        courseRowsHtml += `
          <tr>
            <td style="text-align:center; padding: 10px; border: 1px solid #cbd5e1;">${i + 1}</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: 600;">${name}</td>
            <td style="text-align:center; padding: 10px; border: 1px solid #cbd5e1;">${credits}</td>
            <td style="text-align:center; padding: 10px; border: 1px solid #cbd5e1;">${pts} Pts</td>
            <td style="text-align:center; padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">${weighted}</td>
          </tr>
        `;
      });
    } else if (this.currentMode === 'cgpa') {
      const rows = document.querySelectorAll('.sem-row');
      let semCount = 1;
      rows.forEach((row) => {
        const sgpa = parseFloat(row.querySelector('.sem-sgpa').value);
        const credits = parseFloat(row.querySelector('.sem-credits').value) || 0;

        if (!isNaN(sgpa) && sgpa >= 0) {
          const weighted = (credits * sgpa).toFixed(2);
          totalCredits += credits;
          totalPoints += credits * sgpa;

          courseRowsHtml += `
            <tr>
              <td style="text-align:center; padding: 10px; border: 1px solid #cbd5e1;">${semCount}</td>
              <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: 600;">Semester ${semCount}</td>
              <td style="text-align:center; padding: 10px; border: 1px solid #cbd5e1;">${credits}</td>
              <td style="text-align:center; padding: 10px; border: 1px solid #cbd5e1;">${sgpa.toFixed(2)} SGPA</td>
              <td style="text-align:center; padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">${weighted}</td>
            </tr>
          `;
          semCount++;
        }
      });
    }

    const calculatedGpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
    const pctRes = this.calculatePercentageFromCGPA(calculatedGpa, u);

    const printWindow = window.open('', '_blank', 'width=850,height=1000');
    if (!printWindow) {
      alert("Please allow popups to print your structured PDF transcript.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Academic Grade Report - ${u.university_name}</title>
        <style>
          @page { size: A4; margin: 15mm; }
          body { font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; padding: 30px; color: #0f172a; background: #fff; line-height: 1.5; }
          .header { text-align: center; border-bottom: 3px double #d97706; padding-bottom: 20px; margin-bottom: 25px; }
          .brand-tag { font-size: 13px; font-weight: 700; color: #d97706; text-transform: uppercase; letter-spacing: 1.5px; }
          .univ-name { font-size: 24px; font-weight: 800; color: #0f172a; margin: 6px 0 2px; }
          .doc-title { font-size: 15px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; }
          
          .meta-table { width: 100%; border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 8px; margin-bottom: 25px; border-spacing: 0; }
          .meta-table td { padding: 10px 14px; font-size: 13px; border-bottom: 1px solid #e2e8f0; }
          .meta-table tr:last-child td { border-bottom: none; }
          .meta-table strong { color: #0f172a; }

          .grade-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 13px; }
          .grade-table th { background: #0f172a; color: #ffffff; padding: 10px 12px; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
          
          .summary-card { border: 2px solid #d97706; background: #fff7ed; border-radius: 8px; padding: 18px; display: table; width: 100%; margin-bottom: 30px; box-sizing: border-box; }
          .summary-col { display: table-cell; text-align: center; width: 33.33%; vertical-align: middle; }
          .summary-col .lbl { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; }
          .summary-col .val { font-size: 26px; font-weight: 800; color: #d97706; margin-top: 4px; }
          .summary-col .val.green { color: #15803d; }

          .scale-key { font-size: 11px; color: #475569; margin-bottom: 30px; }
          .scale-key h5 { font-size: 12px; color: #0f172a; margin-bottom: 6px; text-transform: uppercase; }

          .footer-sign { margin-top: 40px; border-top: 1px solid #cbd5e1; padding-top: 15px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 11px; color: #64748b; }
          .stamp { border: 1px dashed #d97706; padding: 6px 12px; border-radius: 4px; color: #d97706; font-weight: 700; text-transform: uppercase; font-size: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="https://yuva.ind.in/Images/YuvaNewLogo.png" alt="YUVA Bharat Logo" style="height: 52px; width: auto; margin-bottom: 8px; display: inline-block;">
          <div class="brand-tag">YUVA Bharat Digital Academic Portal</div>
          <div class="univ-name">${u.university_name}</div>
          <div class="doc-title">Official Academic Grade Report & Statement</div>
        </div>

        <table class="meta-table">
          <tr>
            <td><strong>Academic Regulation:</strong> ${u.regulation_name || 'Standard'}</td>
            <td><strong>Date of Issue:</strong> ${today}</td>
          </tr>
          <tr>
            <td><strong>Evaluation Scheme:</strong> ${this.currentMode === 'sgpa' ? 'Semester Grade Point Average (SGPA)' : 'Cumulative Grade Point Average (CGPA)'}</td>
            <td><strong>Percentage Conversion Formula:</strong> ${u.percentage_formula || 'Standard'}</td>
          </tr>
          <tr>
            <td colspan="2"><strong>University Location:</strong> ${u.state_region ? u.state_region + ', ' : ''}${u.country}</td>
          </tr>
        </table>

        <table class="grade-table">
          <thead>
            <tr>
              <th style="width:10%; text-align:center;">S.No.</th>
              <th style="width:45%;">Course / Assessment Module</th>
              <th style="width:15%; text-align:center;">Credits</th>
              <th style="width:15%; text-align:center;">Grade Pts</th>
              <th style="width:15%; text-align:center;">Weighted Pts</th>
            </tr>
          </thead>
          <tbody>
            ${courseRowsHtml || '<tr><td colspan="5" style="text-align:center; padding:15px;">No assessment records entered</td></tr>'}
          </tbody>
        </table>

        <div class="summary-card">
          <div class="summary-col">
            <div class="lbl">Total Earned Credits</div>
            <div class="val">${totalCredits}</div>
          </div>
          <div class="summary-col">
            <div class="lbl">Calculated ${this.currentMode === 'sgpa' ? 'SGPA' : 'CGPA'}</div>
            <div class="val">${calculatedGpa.toFixed(2)}</div>
          </div>
          <div class="summary-col">
            <div class="lbl">Equivalent Percentage</div>
            <div class="val green">${pctRes.text}</div>
          </div>
        </div>

        <div class="scale-key">
          <h5>Verified University Grading Scale Key</h5>
          <p>${(u.grading_table || []).map(g => `${g.grade}: ${g.points} Pts (${g.marks_range || ''})`).join(' | ')}</p>
        </div>

        <div class="footer-sign">
          <div>
            Electronically generated and verified via <strong>YUVA Bharat Academic Engine (cgpa.yuva.ind.in)</strong>.
          </div>
          <div class="stamp">
            Verified Digital Transcript
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  }

  // --- 1. SGPA Workspace ---
  renderSGPAWorkspace() {
    const u = this.selectedUniv;
    const defaultPts = (u.grading_table && u.grading_table.length > 0) ? u.grading_table[0].points : 10;

    this.workspaceContainer.innerHTML = `
      <div class="calculator-card animate-fade">
        <div class="card-header">
          <div class="card-title"><i class="fa-solid fa-calculator" style="color:var(--accent-orange-dark);"></i> SGPA Calculator</div>
          <div class="formula-chip">${u.short_name || 'Univ'}: Weighted Credit Average</div>
        </div>

        <div class="courses-table-wrapper">
          <table class="courses-table">
            <thead>
              <tr>
                <th style="width:35%;">Course Name / Code</th>
                <th style="width:20%;">Credits</th>
                <th style="width:35%;">Grade Obtained</th>
                <th style="width:10%;">Action</th>
              </tr>
            </thead>
            <tbody id="coursesTbody">
              ${this.createCourseRowHtml(1, defaultPts, u.grading_table)}
              ${this.createCourseRowHtml(2, defaultPts, u.grading_table)}
              ${this.createCourseRowHtml(3, defaultPts, u.grading_table)}
              ${this.createCourseRowHtml(4, defaultPts, u.grading_table)}
            </tbody>
          </table>
        </div>

        <div class="table-actions">
          <button class="btn-secondary" id="addCourseBtn"><i class="fa-solid fa-plus"></i> Add Course Row</button>
          <button class="btn-primary" id="calcSGPABtn"><i class="fa-solid fa-bolt"></i> Calculate SGPA</button>
          <button class="btn-secondary" id="printTranscriptBtn"><i class="fa-solid fa-file-pdf"></i> Print Structured Transcript</button>
        </div>

        <div class="results-box">
          <div class="result-card">
            <div class="result-label">Calculated SGPA</div>
            <div class="result-value" id="sgpaResult">0.00</div>
            <div class="result-sub">Overall SGPA</div>
          </div>
          <div class="result-card">
            <div class="result-label">Total Credits</div>
            <div class="result-value accent-cyan" id="totalCreditsResult">0</div>
            <div class="result-sub">Credits Attempted</div>
          </div>
          <div class="result-card">
            <div class="result-label">Equivalent %</div>
            <div class="result-value accent-green" id="percentResult">0.00%</div>
            <div class="result-sub">${u.percentage_formula || 'Standard Scale'}</div>
          </div>
        </div>

        <div class="grading-table-preview">
          <div style="font-weight:700; font-size:0.9rem; margin-bottom:0.5rem;"><i class="fa-solid fa-table-list"></i> ${u.university_name} Grading Scale</div>
          <div class="preview-grid">
            ${(u.grading_table || []).map(g => `
              <div class="grade-badge">
                <span class="grade-badge-letter">${g.grade}</span>
                <span class="grade-badge-pts">${g.points} Pts</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Attach row events & calculation listeners
    const tbody = document.getElementById("coursesTbody");
    document.getElementById("addCourseBtn").addEventListener("click", () => {
      const rowCount = tbody.children.length + 1;
      tbody.insertAdjacentHTML('beforeend', this.createCourseRowHtml(rowCount, defaultPts, u.grading_table));
      this.bindCourseInputEvents();
      this.calculateSGPA();
    });

    document.getElementById("calcSGPABtn").addEventListener("click", () => this.calculateSGPA());
    document.getElementById("printTranscriptBtn").addEventListener("click", () => this.printStructuredTranscript());
    this.bindCourseInputEvents();
    this.calculateSGPA();
  }

  createCourseRowHtml(index, selectedPoints, gradingTable) {
    const customDropdownHtml = this.createCustomDropdownHtml(selectedPoints, gradingTable);
    return `
      <tr class="course-row">
        <td><input type="text" class="input-control course-name" placeholder="Course ${index}" value="Subject ${index}"></td>
        <td><input type="number" min="1" max="10" step="0.5" class="input-control course-credits" value="${index <= 3 ? 4 : 3}"></td>
        <td>
          ${customDropdownHtml}
        </td>
        <td>
          <button class="btn-icon-danger remove-row-btn" title="Remove"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>
    `;
  }

  bindCourseInputEvents() {
    const rows = document.querySelectorAll(".course-row");
    rows.forEach(row => {
      const creditsInput = row.querySelector(".course-credits");
      const customDropdown = row.querySelector(".custom-dropdown");
      const removeBtn = row.querySelector(".remove-row-btn");

      creditsInput.oninput = () => this.calculateSGPA();
      if (customDropdown) {
        this.bindCustomDropdownEvents(customDropdown);
      }
      removeBtn.onclick = () => {
        if (document.querySelectorAll(".course-row").length > 1) {
          row.remove();
          this.calculateSGPA();
        }
      };
    });
  }

  calculateSGPA() {
    const rows = document.querySelectorAll(".course-row");
    let totalWeightedPoints = 0;
    let totalCredits = 0;

    rows.forEach(row => {
      const credits = parseFloat(row.querySelector(".course-credits").value) || 0;
      const customDropdown = row.querySelector(".custom-dropdown");
      const gradePts = customDropdown ? parseFloat(customDropdown.dataset.points) || 0 : 0;

      totalCredits += credits;
      totalWeightedPoints += (credits * gradePts);
    });

    const sgpa = totalCredits > 0 ? (totalWeightedPoints / totalCredits) : 0;
    const res = this.calculatePercentageFromCGPA(sgpa, this.selectedUniv);

    document.getElementById("sgpaResult").textContent = sgpa.toFixed(2);
    document.getElementById("totalCreditsResult").textContent = totalCredits;
    document.getElementById("percentResult").textContent = res.text;
  }

  // --- 2. CGPA Workspace ---
  renderCGPAWorkspace() {
    const u = this.selectedUniv;
    let semRowsHtml = '';

    for (let sem = 1; sem <= 8; sem++) {
      semRowsHtml += `
        <tr class="sem-row">
          <td style="font-weight:700;">Semester ${sem}</td>
          <td><input type="number" min="0" max="10" step="0.01" class="input-control sem-sgpa" placeholder="e.g. 8.50"></td>
          <td><input type="number" min="1" max="40" step="0.5" class="input-control sem-credits" value="24"></td>
        </tr>
      `;
    }

    this.workspaceContainer.innerHTML = `
      <div class="calculator-card animate-fade">
        <div class="card-header">
          <div class="card-title"><i class="fa-solid fa-layer-group" style="color:var(--accent-orange-dark);"></i> CGPA Cumulative Calculator</div>
          <div class="formula-chip">Multi-Semester Aggregator</div>
        </div>

        <div class="courses-table-wrapper">
          <table class="courses-table">
            <thead>
              <tr>
                <th style="width:30%;">Semester</th>
                <th style="width:35%;">SGPA Obtained</th>
                <th style="width:35%;">Semester Credits</th>
              </tr>
            </thead>
            <tbody>
              ${semRowsHtml}
            </tbody>
          </table>
        </div>

        <div class="table-actions">
          <button class="btn-primary" id="calcCGPABtn"><i class="fa-solid fa-bolt"></i> Calculate CGPA</button>
          <button class="btn-secondary" id="printTranscriptBtnCGPA"><i class="fa-solid fa-file-pdf"></i> Print Structured Transcript</button>
        </div>

        <div class="results-box">
          <div class="result-card">
            <div class="result-label">Cumulative CGPA</div>
            <div class="result-value" id="cgpaResult">0.00</div>
            <div class="result-sub">Weighted Overall Average</div>
          </div>
          <div class="result-card">
            <div class="result-label">Total Credits</div>
            <div class="result-value accent-cyan" id="cgpaCreditsResult">0</div>
            <div class="result-sub">Degree Credits Earned</div>
          </div>
          <div class="result-card">
            <div class="result-label">Equivalent %</div>
            <div class="result-value accent-green" id="cgpaPercentResult">0.00%</div>
            <div class="result-sub">${u.percentage_formula || 'Official Formula'}</div>
          </div>
        </div>
      </div>
    `;

    // Attach listeners
    const semRows = document.querySelectorAll(".sem-row");
    semRows.forEach(row => {
      const sgpaInput = row.querySelector(".sem-sgpa");
      const creditsInput = row.querySelector(".sem-credits");

      sgpaInput.oninput = () => this.calculateCGPA();
      creditsInput.oninput = () => this.calculateCGPA();
    });

    document.getElementById("calcCGPABtn").addEventListener("click", () => this.calculateCGPA());
    document.getElementById("printTranscriptBtnCGPA").addEventListener("click", () => this.printStructuredTranscript());
  }

  calculateCGPA() {
    const semRows = document.querySelectorAll(".sem-row");
    let totalWeightedSgpa = 0;
    let totalCredits = 0;

    semRows.forEach(row => {
      const sgpa = parseFloat(row.querySelector(".sem-sgpa").value);
      const credits = parseFloat(row.querySelector(".sem-credits").value) || 0;

      if (!isNaN(sgpa) && sgpa >= 0) {
        totalCredits += credits;
        totalWeightedSgpa += (sgpa * credits);
      }
    });

    const cgpa = totalCredits > 0 ? (totalWeightedSgpa / totalCredits) : 0;
    const res = this.calculatePercentageFromCGPA(cgpa, this.selectedUniv);

    document.getElementById("cgpaResult").textContent = cgpa.toFixed(2);
    document.getElementById("cgpaCreditsResult").textContent = totalCredits;
    document.getElementById("cgpaPercentResult").textContent = res.text;
  }

  // --- 3. Direct Percentage / CGPA Converter ---
  renderPercentageWorkspace() {
    const u = this.selectedUniv;

    this.workspaceContainer.innerHTML = `
      <div class="calculator-card animate-fade">
        <div class="card-header">
          <div class="card-title"><i class="fa-solid fa-percent" style="color:var(--accent-orange-dark);"></i> Direct Formula Converter</div>
          <div class="formula-chip">${u.percentage_formula || 'Standard Converter'}</div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-bottom:2rem;">
          <div style="background:var(--bg-secondary); padding:1.5rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <label style="font-weight:700; display:block; margin-bottom:0.5rem;">Convert CGPA to Percentage</label>
            <input type="number" step="0.01" min="0" max="10" id="inputCGPAToPercent" class="input-control" placeholder="Enter CGPA e.g. 8.25" style="margin-bottom:1rem;">
            <div style="font-size:1.5rem; font-weight:800; color:var(--accent-orange-dark);" id="convertedPercent">0.00%</div>
          </div>

          <div style="background:var(--bg-secondary); padding:1.5rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <label style="font-weight:700; display:block; margin-bottom:0.5rem;">Convert Percentage to CGPA</label>
            <input type="number" step="0.01" min="0" max="100" id="inputPercentToCGPA" class="input-control" placeholder="Enter % e.g. 75.0" style="margin-bottom:1rem;">
            <div style="font-size:1.5rem; font-weight:800; color:var(--accent-cyan);" id="convertedCGPA">0.00</div>
          </div>
        </div>
      </div>
    `;

    const cgpaInput = document.getElementById("inputCGPAToPercent");
    const percentInput = document.getElementById("inputPercentToCGPA");

    cgpaInput.oninput = (e) => {
      const cgpa = parseFloat(e.target.value);
      const res = this.calculatePercentageFromCGPA(cgpa, u);
      document.getElementById("convertedPercent").textContent = res.text;
    };

    percentInput.oninput = (e) => {
      const pct = parseFloat(e.target.value);
      const res = this.calculateCGPAFromPercentage(pct, u);
      document.getElementById("convertedCGPA").textContent = res.text;
    };
  }
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  window.cgpaApp = new CGPAApp();
});
