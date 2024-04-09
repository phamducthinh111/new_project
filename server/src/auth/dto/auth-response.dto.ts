import { Tokens } from "./tokens";
import { UserResponse } from "./user-response.dto";

export class AuthResponse {
  authUser: UserResponse;
  token: Tokens;
}
