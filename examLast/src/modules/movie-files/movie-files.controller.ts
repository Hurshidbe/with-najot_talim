import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MovieFilesService } from './movie-files.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/guards/role.guard';

@Controller()
export class MovieFilesController {
  constructor(private readonly movieFilesService: MovieFilesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Superadmin || Role.Admin)
  @Post('movies/:movieId/files')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `video-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['video/mp4', 'video/mkv', 'video/mpeg'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return cb(
            new BadRequestException(
              'Faqat video fayllar (.mp4, .mkv, .mov) ruxsat etilgan',
            ),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 1024, // 1GB limit
      },
    }),
  )
  async uploadFile(
    @Param('movieId') movieId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { quality: string; language?: string },
  ) {
    if (!file) throw new BadRequestException('Fayl yuklanmadi');

    const fileUrl = `/uploads/videos/${file.filename}`;

    const movieFile = await this.movieFilesService.create(
      movieId,
      fileUrl,
      body.quality,
      body.language ?? 'uz',
    );
    return movieFile;
  }

  @Get('movies/:movieId/files')
  async getFiles(@Param('movieId') movieId: string) {
    return this.movieFilesService.findAllByMovie(movieId);
  }

  @UseGuards(AuthGuard) // Admin uchun
  @Delete('files/:id')
  async remove(@Param('id') id: string) {
    return this.movieFilesService.remove(id);
  }
}
