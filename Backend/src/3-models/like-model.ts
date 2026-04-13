import Joi from "joi";

export class LikeModel {
    public userId: number;
    public vacationId: number;

    private static schema = Joi.object({
        userId: Joi.number().required().positive().integer(),
        vacationId: Joi.number().required().positive().integer(),
    });

    public constructor(like: LikeModel) {
        this.userId = like.userId;
        this.vacationId = like.vacationId;
    }

    public validate(): void {
        const result = LikeModel.schema.validate(this);
        if (result.error) throw new Error(result.error.message);
    }
}
