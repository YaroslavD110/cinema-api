import { createParamDecorator } from '@nestjs/common';

export const InjectUser = createParamDecorator((data, req) => req.user || null);
