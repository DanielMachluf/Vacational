import { OkPacketParams } from "mysql2/promise";
import { cyber } from "../2-utils/cyber";
import { dal } from "../2-utils/dal";
import { ValidationError } from "../3-models/client-errors";
import { Role } from "../3-models/enums";
import { UserModel } from "../3-models/user-model";
import { CredentialsModel } from "../3-models/credentials-model";

class UserService {
    private async verifyFreeEmail(email: string): Promise<void> {
        const sql = "select * from users where email = ?";
        const values = [email];
        const users = await dal.execute(sql, values) as UserModel[];
        if (users.length > 0) throw new ValidationError("Email already in use");
    }

    public async register(user: UserModel): Promise<string> {

        // Validation:
        user.validate();
        await this.verifyFreeEmail(user.email);

        // Create sql:
        user.password = cyber.hash(user.password);
        user.role = Role.User;
        const sql = "insert into users(firstName, lastName, email, password, role) values(?, ?, ?, ?, ?)";
        const values = [user.firstName, user.lastName, user.email, user.password, user.role];

        // Execute: 
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;
        user.userId = info.insertId!;

        // Generate token: 
        const token = cyber.generateToken(user);
        return token;
    }

    public async login(credentials: CredentialsModel) : Promise<string> {
        credentials.validate();

        const sql = "select * from users where email = ?";
        const values = [credentials.email];
        const users = await dal.execute(sql, values) as UserModel[];
        const user = users[0];
        if (users.length === 0) throw new ValidationError("Incorrect email or password");
        const token = cyber.generateToken(user);
        return token;
    }
}

export const service = new UserService();
