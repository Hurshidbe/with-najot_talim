import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private cats = [
    { id: 1, name: 'Mishka' },
    { id: 2, name: 'Tom' },
  ];

  findAll() {
    return this.cats;
  }

  findOne(id: number) {
    return this.cats.find((cat) => cat.id === id);
  }
  getRandomCatName() {
    const names = ['Tom', 'Garfield', 'Barsik', 'Simba'];
    return names[Math.floor(Math.random() * names.length)];
  }
}
