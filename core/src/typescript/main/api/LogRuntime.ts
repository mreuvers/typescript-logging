import {LogLevel} from "./LogLevel";
import {LogChannel} from "./LogChannel";
import {RawLogChannel} from "./RawLogChannel";
import {ArgumentFormatterType} from "./type/ArgumentFormatterType";
import {DateFormatterType} from "./type/DateFormatterType";
import {MessageFormatterType} from "./type/MessageFormatterType";
import {LoggerNameType} from "./type/LoggerNameType";
import {LogControl} from "./LogControl";

/**
 * Represents runtime settings that are created for a {@link LogControl} instance.
 */
export interface LogRuntime {
  readonly id: number;
  readonly name: LoggerNameType;
  readonly level: LogLevel;
  readonly channel: LogChannel | RawLogChannel;

  readonly argumentFormatter: ArgumentFormatterType;
  readonly dateFormatter: DateFormatterType;
  readonly messageFormatter: MessageFormatterType;
}