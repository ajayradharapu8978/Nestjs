import { FilterDto } from './../dto/filter.dto';
import { UniversityDto } from "src/dto/university.dto";
import { University } from "src/entities/universities.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(University)
export class UniversityRepository extends Repository<University>{

    async getFilterUniversities(filterDto: FilterDto): Promise<University[]> {
        const { search } = filterDto;
        const query = this.createQueryBuilder('university');

        if (search) {
            query.andWhere('university.universityName LIKE :search OR university.email LIKE :search OR university.phone LIKE :search OR university.country LIKE :search OR university.Website LIKE :search OR university.address LIKE :search', {search: `%${search}%`});
        }

        const universities = await query.getMany();
        return universities;
    }

    async createUniversity(universityDto: UniversityDto): Promise<University> {
        const { universityName, email, phone, country, Website, address } = universityDto;

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