export interface Service {
    value: string;
    ability: number;
    label: string;
}

export function generateServiceOptions() {
    return [
        { value: "Python", label: "Python", ability: 5 },
        { value: "Javascript", label: "Javascript", ability: 5 },
        { value: "React", label: "React.JS", ability: 5 },
        { value: "Java", label: "Java", ability: 5 },
        { value: "Laravel", label: "Laravel", ability: 5 },
        { value: "Teaching", label: "Teaching", ability: 5 },
        { value: "Node.JS", label: "Node.JS", ability: 5 },
        { value: "Php", label: "Php", ability: 5 },
        { value: "Scrum", label: "Scrum", ability: 5 },
        { value: "Marketing", label: "Marketing", ability: 5 },
    ];
}
