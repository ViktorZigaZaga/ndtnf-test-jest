import {Injectable, ArgumentMetadata, PipeTransform} from '@nestjs/common';

@Injectable()
export class IdValidationPipe implements PipeTransform {
    transform(id: any, metadata: ArgumentMetadata) {
        id = String(id).trim();
        if(!id) {
            throw new Error('ID is empty');
        }
        return id;
    }
}