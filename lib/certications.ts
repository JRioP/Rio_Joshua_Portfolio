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
    name: "Breaking Back Easy as .Py",
    issuer: "GDSC Universoty of San Carlos",
    typeOfCertificate: "Participation",
    year: "2023",
    icon: iconPath("Rio_Java_Fundamentals.png")
    },
    {
    name: "SSC Certification of Appreciation",
    issuer: "SSC STI College Tanauan",
    typeOfCertificate: "Appreciation",
    year: "2023",
    icon: iconPath("Rio_Java_Fundamentals.png")
    }, 
    {
    name: "Tech Trends: Internet of Things(IOT) (Intermediate Session)",
    issuer: "Department of Information and Communications Technology (DICT)",
    typeOfCertificate: "Participation",
    year: "2023",
    icon: iconPath("Rio_Java_Fundamentals.png")
    },
    {
    name: "National It Skills Competition",
    issuer: "Integrated Society of Information Technology Euthusiasts (iSITE) Inc.",
    typeOfCertificate: "Participation",
    year: "2024",
    icon: iconPath("Rio_Java_Fundamentals.png")
    },
    {
    name: "Future Ready IT Career: Building your Brand, Skills and Workspace Adaptability",
    issuer: "Info Tech STI College Tanauan",
    typeOfCertificate: "Participation",
    year: "2024",
    icon: iconPath("Rio_Java_Fundamentals.png")
    }, 
    {
    name: "Exploring Hardware Fundamentals",
    issuer: "STI College Tanauan",
    typeOfCertificate: "Recognition",
    year: "2024",
    icon: iconPath("Rio_Java_Fundamentals.png")
    },
    {
    name: "6th Philippine Skilling Summit",
    issuer: "Go Philippines",
    typeOfCertificate: "Attendance",
    year: "2023",
    icon: iconPath("Rio_Java_Fundamentals.png")
    },
    {
    name: "Java Fundamentals 2",
    issuer: "Oracle Academy",
    typeOfCertificate: "Completion",
    year: "2023",
    icon: iconPath("Rio_Java_Fundamentals.png")
    },
    {
    name: "Java Fundamentals",
    issuer: "Oracle Academy",
    typeOfCertificate: "Completion",
    year: "2023",
    icon: iconPath("Rio_Java_Fundamentals.png")
    },
    {
    name: "Systems Administration",
    issuer: "STI College",
    typeOfCertificate: "Completion",
    year: "2023",
    icon: iconPath("Rio_Java_Fundamentals.png")
    },
    {
    name: "Introduction to S/4HANA using Global Bike",
    issuer: "SAP University Alliances",
    typeOfCertificate: "Participation",
    year: "2024",
    icon: iconPath("Rio_Java_Fundamentals.png")
    },
]

export const GROUPED_CERTIFICATE = CERTIFICATIONS.reduce((acc, item) => {
  (acc[item.typeOfCertificate] ??= []).push(item);
  return acc;
}, {} as Record<string, Certification[]>);