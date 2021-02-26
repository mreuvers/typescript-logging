import {ArgumentFormatterType} from "../type/ArgumentFormatterType";
import {DateFormatterType} from "../type/DateFormatterType";
import {LogLevel} from "../LogLevel";
import {MessageFormatterType} from "../type/MessageFormatterType";
import {LogChannel} from "../LogChannel";
import {RawLogChannel} from "../RawLogChannel";

/**
 * The LogSettings that must be provided to the core.
 * These represent all the standard settings initially
 * in use.
 */
export interface LogSettings {
  /**
   * Default LogLevel.
   */
  readonly level: LogLevel;

  /**
   * What kind of channel to log to (a normal or raw channel).
   */
  readonly channel: LogChannel | RawLogChannel;

  /**
   * The argument formatter to use.
   */
  readonly argumentFormatter: ArgumentFormatterType;

  /**
   * The date formatter to use to format a timestamp in the log line.
   */
  readonly dateFormatter: DateFormatterType;

  /**
   * The message formatter to use, is provided in log statement when
   * using a lambda, which allows formatting of a message if needed.
   * For example: log.debug(fmt => fmt("My name is a {}, and I am from {}", "secret","a country"));
   */
  readonly messageFormatter: MessageFormatterType;
}
