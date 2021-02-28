import { UniversityDto } from "src/dto/university.dto";
import { University } from "src/entities/universities.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(University)
export class UniversityRepository extends Repository<University>{
    
    async createUniversity(universityDto: UniversityDto): Promise<University>{
        const {universityName, email, phone, country, Website, address} = universityDto;

        const university = new University();
        university.universityName = universityName;
        university.email = email;
        university.phone = phone;
        university.country = country;
        university.Website = Website;
        university.address = address;
        await university.save();

        return university;
    }
}