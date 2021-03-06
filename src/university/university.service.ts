import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from 'src/dto/filter.dto';
import { UniversityDto } from 'src/dto/university.dto';
import { University } from 'src/entities/universities.entity';
import { UniversityRepository } from './university.repository';

@Injectable()
export class UniversityService {
    constructor(
        @InjectRepository(UniversityRepository)
        private universityRepository: UniversityRepository
    ) { }

    async getTotalUniversities() {
        const data = await this.universityRepository.find();
        return data;
    }

    async getUniversityById(id: string): Promise<University> {
        if (id.length !== 24) {
            throw new NotFoundException(`University with Id "${id}" not found`);
        }
        else {
            const found = await this.universityRepository.findOne(id);
            return found;
        }
    }

    async createUniversity(universityDto: UniversityDto): Promise<University> {
        return this.universityRepository.createUniversity(universityDto);
    }

    async updateUniversity(id: string, universityDto: UniversityDto): Promise<University> {
        if (id.length !== 24) {
            throw new NotFoundException(`University with Id "${id}" not found`);
        }
        else {
            const university = await this.universityRepository.findOne(id);

            if (!university) {
                throw new NotFoundException(`University with Id "${id}" not found`);
            }
            else {
                const { universityName, email, phone, country, Website, address } = universityDto;
                if (universityName) {
                    university.universityName = universityName;
                }
                if (email) {
                    university.email = email;
                }
                if (phone) {
                    university.phone = phone;
                }
                if (country) {
                    university.country = country;
                }
                if (Website) {
                    university.Website = Website;
                }
                if (address) {
                    university.address = address;
                }
                return university;

            }
        }
    }

    async deleteUniversity(id: string): Promise<void> {
        const result = await this.universityRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`University with Id "${id}" not found`);
        }
    }

    async getFilterUniversities(search: string): Promise<University[]> {
        return this.universityRepository.getFilterUniversities(search);
    }
}
