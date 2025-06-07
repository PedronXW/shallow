
import { CreateConsultService } from '@/consult/services/create'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { z } from 'zod'

const createConsultDTO = z.object({
  type: z.string().min(1),
  input: z.any()
})

export type CreateConsultDTO = z.infer<typeof createConsultDTO>

const bodyValidation = new ZodValidationPipe(createConsultDTO)


@Controller('/consult')
export class CreateConsultController {
  constructor(private createConsultService: CreateConsultService) {}

  @Post()
  async handle(@Body(bodyValidation) body: CreateConsultDTO) {
    const { type, input } = body

    const consult = await this.createConsultService.execute({
      type,
      input
    })

    if (consult.isLeft()) {
      const error = consult.value
      switch (error.constructor) {
        default:
          throw new HttpException('Error creating consult', 400)
      }
    }

    return 
  }
}
