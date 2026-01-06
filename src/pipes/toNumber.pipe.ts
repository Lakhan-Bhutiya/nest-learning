import { PipeTransform,Injectable,ArgumentMetadata } from "@nestjs/common";


@Injectable()
export class ToNumberPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value);
        console.log(metadata.data);
        console.log(metadata.type);
        console.log(metadata.metatype);
        return Number(value);
    }
}