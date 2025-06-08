
import { NonExistsError } from '@/@shared/errors/non-exists-error'
import { CreateConsultService } from '@/consult/services/create'
import { ReceiveConsultService } from '@/consult/services/receive'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { z } from 'zod'

const createConsultDTO = z.object({
  type: z.string().min(1),
  input: z.any()
})

const receiveConsultDTO = z.object({
  id: z.string().min(1),
  output: z.any(),
  status: z.enum(['DONE', 'PENDING', 'ERROR', 'INVALID'])
})

export type CreateConsultDTO = z.infer<typeof createConsultDTO>

const bodyValidation = new ZodValidationPipe(createConsultDTO)

export type ReceiveConsultDTO = z.infer<typeof receiveConsultDTO>

const receiveBodyValidation = new ZodValidationPipe(receiveConsultDTO)


@Controller('/consult')
export class CreateConsultController {
  constructor(private createConsultService: CreateConsultService, private receiveConsultService: ReceiveConsultService) {}

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

  @Public()
  @Post('/receive')
  async receive(@Body(receiveBodyValidation) body: ReceiveConsultDTO) {

    const { id, output, status } = body

    if(status !== 'DONE'){
      console.log('Consult not done, skipping processing')
      return { message: 'Consult not done, skipping processing' }
    }

    const consult = await this.receiveConsultService.execute({
      id,
      output
    })

    if (consult.isLeft()) {
      const error = consult.value
      switch (error.constructor) {
        case NonExistsError:
          throw new HttpException(error.message, 404)
        default:
          throw new HttpException('Error receiving consult', 400)
      }
    }

    return consult.value
    
  }
}
