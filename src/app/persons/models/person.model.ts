export interface PeopleRequestModel {
    count: number;
    next: string;
    previous: string;
    results: PersonModel[];
}
export interface PersonModel {
    name: string;
    height: number;
    mass: number;
    hair_color:  string;
    skin_color:  string;
    eye_color:  string;
    birth_year:  string;
    gender:  string;
    homeworld:  string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created:  string;
    edited:  string;
    url: string;
    image: string;
}