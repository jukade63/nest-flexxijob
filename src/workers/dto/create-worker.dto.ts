import { User } from "src/user/entities/user.entity"

export class CreateWorkerDto {
    user: User
    availableFrom?: string
    availableTo?: string
}
