// parse-enum-array.pipe.ts
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ParseEnumArrayPipe<T extends object>
  implements PipeTransform<any | any[], T[]>
{
  constructor(private readonly enumType: T) {}

  transform(value: any | any[]): T[] {
    if (!value) return [];

    // Convert to array if it's a string
    const values = Array.isArray(value) ? value : value.split(',');

    // Map to enum values
    return values.map((v) => {
      if (!Object.values(this.enumType).includes(v as T)) {
        throw new BadRequestException(`Invalid enum value: ${v}`);
      }
      return v as T;
    });
  }
}
