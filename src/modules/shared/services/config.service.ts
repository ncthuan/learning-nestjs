import * as dotenv from 'dotenv';
import * as Joi from 'joi';

export interface DBConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  name: string;
  log: boolean;
}

export class ConfigService {
  private readonly envConfig: dotenv.DotenvParseOutput;

  private readonly validationScheme = {
    PORT: Joi.number().default(3000),
    BASE_PATH: Joi.string().default('/'),

    JWT_SECRET: Joi.string().default('gXmEgPHW'),
    JWT_EXPIRATION_TIME: Joi.string().default('1h'),

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.optional(),
    DB_PASS: Joi.optional(),
    DB_NAME: Joi.string().required(),
    DB_LOG: Joi.boolean().default(false),
  };

  constructor() {
    const nodeEnv = this.nodeEnv;
    // Try to load environment config base on current NODE_ENV

    const configs: dotenv.DotenvParseOutput[] = [];

    const defaultEnvConfigPath = '.env';
    const defaultEnvConfig = dotenv.config({ path: defaultEnvConfigPath });

    const envConfigPath = `.env.${nodeEnv}`;
    const envConfig = dotenv.config({ path: envConfigPath });

    if (defaultEnvConfig.error) {
      // tslint:disable-next-line: no-console
      console.log(`No config file at path: ${defaultEnvConfigPath}`);
    } else {
      configs.push(defaultEnvConfig.parsed);
      // tslint:disable-next-line: no-console
      console.log(`Loaded config file at path: ${defaultEnvConfigPath}`);
    }

    if (envConfig.error) {
      // tslint:disable-next-line: no-console
      console.log(`No config file at path: ${envConfigPath}`);
    } else {
      configs.push(envConfig.parsed);
      // tslint:disable-next-line: no-console
      console.log(`Loaded config file at path: ${envConfigPath}`);
    }

    configs.push(process.env as dotenv.DotenvParseOutput);
    this.envConfig = this.validateInput(...configs);
  }

  public get(key: string): string {
    return process.env[key];
  }

  get nodeEnv() {
    return this.get('NODE_ENV') || 'development';
  }

  get jwtConfig() {
    return {
      accessTokenSecret: this.envConfig.JWT_SECRET,
      accessTokenExpireTime: this.envConfig.JWT_EXPIRATION_TIME,
    };
  }

  get dbConfig(): DBConfig {
    return {
      host: String(this.envConfig.DB_HOST),
      port: Number(this.envConfig.DB_PORT),
      user: String(this.envConfig.DB_USER),
      pass: String(this.envConfig.DB_PASS),
      name: String(this.envConfig.DB_NAME),
      log: Boolean(this.envConfig.DB_LOG),
    };
  }

  private validateInput(
    ...envConfig: dotenv.DotenvParseOutput[]
  ): dotenv.DotenvParseOutput {
    const mergedConfig: dotenv.DotenvParseOutput = {};

    envConfig.forEach((config) => Object.assign(mergedConfig, config));

    const envVarsSchema: Joi.ObjectSchema = Joi.object(this.validationScheme);

    const result = envVarsSchema.validate(mergedConfig, { allowUnknown: true });
    if (result.error) {
      throw new Error(`Config validation error: ${result.error.message}`);
    }
    return result.value;
  }
}
