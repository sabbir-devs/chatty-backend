import dotenv from "dotenv";
import bunyan from "bunyan";
dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public PORT: string | undefined;
  public JWT_TOKEN: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public CLIENT_URL: string | undefined;
  public NODE_ENV: string | undefined;
  public REDIS_URL: string | undefined;

  private readonly DEFAULT_DATABASE_URL =
    "mongodb://localhost:27017/chattyapp-backend";
  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.PORT = process.env.PORT || "5001";
    this.JWT_TOKEN = process.env.JWT_TOKEN || "default_jwt_token";
    this.SECRET_KEY_ONE =
      process.env.SECRET_KEY_ONE || "default_secret_key_one";
    this.SECRET_KEY_TWO =
      process.env.SECRET_KEY_TWO || "default_secret_key_two";
    this.CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
    this.NODE_ENV = process.env.NODE_ENV || "development";
    this.REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
  }
  public createLogger(name: string): bunyan {
    return bunyan.createLogger({
      name,
      level: "debug",
    });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration error: ${key} is not defined`);
      }
    }
  }
}

export const config: Config = new Config();
