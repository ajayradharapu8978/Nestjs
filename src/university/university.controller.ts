import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UniversityDto } from 'src/dto/university.dto';
import { University } from 'src/entities/universities.entity';
import { UniversityService } from './university.service';

@Controller('university')
export class UniversityController {

    constructor(
        private universityService: UniversityService,

        ){}

    @Get('/')
    getAllUniversities(){
        return this.universityService.getTotalUniversities();
    }

    @Get('/:id')
    getUniversityById(@Param('id') id: string): Promise<University>{
        return this.universityService.getUniversityById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createUniversity(@Body() universityDto: UniversityDto): Promise<University>{
        return this.universityService.createUniversity(universityDto);
    }

    @Patch('/:id')
    updateUniversity(
        @Param('id') id: string,
        @Body() universityDto: UniversityDto
    ): Promise<University>{
        return this.universityService.updateUniversity(id, universityDto)
    }

    @Delete('/:id')
    deleteUniversity(@Param('id') id: string): Promise<void>{
        return this.universityService.deleteUniversity(id);
    }

    @Post('/search')
    getUniversities(@Body('search') search: string): Promise<University[]>{
        if (Object.keys(search).length) {
            return this.universityService.getFilterUniversities(search);
        } else {
            return this.universityService.getTotalUniversities();
        }
    }
}
