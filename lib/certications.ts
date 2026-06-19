export type Certification ={
    name: string;
    issuer: string;
    typeOfCertificate: string;
    year: string;
    icon: string;
}

const iconPath = (fileName: string) => `/images/certificates/${fileName}`;

export const CERTIFICATIONS: Certification[] = [
    {
    name: "Java Fundamentals",
    issuer: "Oracle Academy",
    typeOfCertificate: "Completed Courses",
    year: "2023",
    icon: iconPath("Rio_Java_Fundamentals.png")
    },
    {
    name: "Java Fundamentals 2",
    issuer: "Oracle Academy",
    typeOfCertificate: "Completed Courses",
    year: "2023",
    icon: iconPath("java_fundamental_2.png")
    },
    {
    name: "Systems Administration",
    issuer: "STI College",
    typeOfCertificate: "Completed Courses",
    year: "2023",
    icon: iconPath("System_Administration_cert.png")
    },
    {
    name: "Exploring Hardware Fundamentals",
    issuer: "STI College Tanauan",
    typeOfCertificate: "Awards / Recognitions",
    year: "2024",
    icon: iconPath("Exploring_Hardware_Cert.png")
    },
    {
    name: "SSC Appreciation",
    issuer: "SSC STI College Tanauan",
    typeOfCertificate: "College Appreciation",
    year: "2023",
    icon: iconPath("SSCcert.png")
    }, 
    {
    name: "Breaking Back Easy as .Py",
    issuer: "GDSC Universoty of San Carlos",
    typeOfCertificate: "Events & Competitions",
    year: "2023",
    icon: iconPath("Breaking_Back_ Easy_As.py.png")
    },
    {
    name: "Tech Trends: Internet of Things(IOT) (Intermediate Session)",
    issuer: "Department of Information and Communications Technology (DICT)",
    typeOfCertificate: "Events & Competitions",
    year: "2023",
    icon: iconPath("Rio_e-Certificate_Intermediate-Internet-of-Things_Tech-Trends.png")
    },
    {
    name: "National It Skills Competition",
    issuer: "Integrated Society of Information Technology Euthusiasts (iSITE) Inc.",
    typeOfCertificate: "Events & Competitions",
    year: "2024",
    icon: iconPath("Rio_NationalITSkillsCompetitionCropped.png")
    },
    {
    name: "Future Ready IT Career: Building your Brand, Skills and Workspace Adaptability",
    issuer: "Info Tech STI College Tanauan",
    typeOfCertificate: "Events & Competitions",
    year: "2024",
    icon: iconPath("Future_Ready_IT_Career_cert_2.png")
    }, 
    {
    name: "6th Philippine Skilling Summit",
    issuer: "Go Philippines",
    typeOfCertificate: "Events & Competitions",
    year: "2023",
    icon: iconPath("6th_philippine_skilling_sumit_cert.png")
    },
    {
    name: "Introduction to S/4HANA using Global Bike",
    issuer: "SAP University Alliances",
    typeOfCertificate: "Enterprise (SAP) Training",
    year: "2024",
    icon: iconPath("SAP-RIO.png")
    },
]

export const GROUPED_CERTIFICATE = CERTIFICATIONS.reduce((acc, item) => {
  (acc[item.typeOfCertificate] ??= []).push(item);
  return acc;
}, {} as Record<string, Certification[]>);