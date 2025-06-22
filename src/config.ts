import dotenv from 'dotenv';
import bunyan from 'bunyan';
import cloudinary from 'cloudinary';
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
  public CLOUD_NAME: string | undefined;
  public CLOUD_API_KEY: string | undefined;
  public CLOUD_API_SECRET: string | undefined;

  private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/chattyapp-backend';
  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.PORT = process.env.PORT || '5001';
    this.JWT_TOKEN = process.env.JWT_TOKEN || 'default_jwt_token';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || 'default_secret_key_one';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || 'default_secret_key_two';
    this.CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
    this.NODE_ENV = process.env.NODE_ENV || 'development';
    this.REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
    this.CLOUD_NAME = process.env.CLOUD_NAME || '';
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY || '';
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || '';
  }
  public createLogger(name: string): bunyan {
    return bunyan.createLogger({
      name,
      level: 'debug'
    });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration error: ${key} is not defined`);
      }
    }
  }
  public cloudinaryConfig(): void {
    cloudinary.v2.config({
      cloud_name: this.CLOUD_NAME,
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET
    });
  }
}

export const config: Config = new Config();
