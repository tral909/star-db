export default class SwapiService {

    _apiBase = 'https://swapi.dev/api';

    async getResourse(url)  {
        const response = await fetch(`${this._apiBase}${url}`);
    
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, recieved ${response.status}`);
        }
        
        const body = await response.json();
        return body;
    };

    async getAllPeople()  {
        const res = await this.getResourse(`/people`);
        return res.results;
    };

    getPerson(id)  {
        return this.getResourse(`/people/${id}`);
    };

    async getAllPlanets()  {
        const res = await this.getResourse(`/planets`);
        return res.results;
    };

    getPlanet(id)  {
        return this.getResourse(`/planets/${id}`);
    };

    async getAllStarships()  {
        const res = await this.getResourse(`/starships`);
        return res.results;
    };

    getStarship(id)  {
        return this.getResourse(`/starships/${id}`);
    };

}
