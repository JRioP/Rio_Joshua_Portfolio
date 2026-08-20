export type achievement = {
    name: string;
    description: string;
    year: string;
    icon: string;
}

const iconPath = (fileName: string) => `/images/achievements/${fileName}`;

export const ACHIEVEMENTS: achievement[] = [
    {
        name: "Best in Capstone",
        description: "Awarded for the best capstone project in STI College Tanauan.",
        year: "2026",
        icon: iconPath("Rio_Best_in_Capstone.png") 
    },
    {
        name: "Programmer of the Year",
        description: "Recognized as the top programmer in STI College Tanauan.",
        year: "2026",
        icon: iconPath("Rio_Programmer_of_the_Year.png") 
    }, 
    {
        name: "Cum Laude",
        description: "Graduated with honors from STI College Tanauan.",
        year: "2026",
        icon: iconPath("Rio_Cum_Laude")
    }
]

