import {MessageArgumentFormatterType} from "../api/type/MessageArgumentFormatterType";
import {MessageFormatterType} from "../api/type/MessageFormatterType";
import {ArgumentFormatterType} from "../api/type/ArgumentFormatterType";
import {DateFormatterType} from "../api/type/DateFormatterType";

/**
 * Default format message function used by the library as default, see {@link MessageFormatterType}.
 * Can also be used by an end user if needed.
 * @param message The message
 * @param messageArgs The message arguments if any
 * @param messageArgumentFormatter The argument formatter, optional. When set uses that formatter, otherwise the default argument formatter instead.
 * @returns string
 */
export function formatMessage(message: string, messageArgs: ReadonlyArray<any>, messageArgumentFormatter?: MessageArgumentFormatterType): string {
  let result = "";
  let indexArg = 0;
  for (let i = 0; i < message.length;) {

    // No args left, don't bother to format anymore.
    if (indexArg >= messageArgs.length) {
      result += message.substring(i);
      break;
    }

    /*
     * See if we can find {} to format.
     *
     * TODO: Allow escape of {}
     */
    const c = message.charAt(i);
    if ((i + 1) < message.length && c === "{" && message.charAt(i + 1) === "}") {
      result +=  messageArgumentFormatter ? messageArgumentFormatter(messageArgs[indexArg++]) : formatMessageArgument(messageArgs[indexArg++]);
      i += 2;
    }
    else {
      result += c;
      i += 1;
    }
  }
  return result;
}

/**
 * Default message argument formatter function, used by the library, see {@link MessageArgumentFormatterType}.
 * Can be used by an end user as well if needed.
 * @param arg Argument to format
 * @returns Message argument as single quoted string, (returns "undefined" for undefined).
 */
export function formatMessageArgument(arg: any): string {
  if (typeof arg === "undefined") {
    return "undefined";
  }
  return `'${arg.toString()}'`;
}

/**
 * Default argument formatter function, used by the library, see {@link ArgumentFormatterType}.
 * Can be used by an end user as well if needed.
 * @param arg The argument to format
 * @returns argument stringified to string (JSON.stringify), if arg is undefined returns "undefined" (without quotes).
 */
export function formatArgument(arg: any): string {
  if (arg === undefined) {
    return "undefined";
  }
  return JSON.stringify(arg);
}

/**
 * Default date formatter function, used by the library, see {@link DateFormatterType}.
 * Can be used by an end user as well if needed.
 * @param millisSinceEpoch Milliseconds since epoch
 * @returns The date in format: yyyy-MM-dd HH:mm:ss,SSS (example: 2021-02-26 09:06:28,123)
 */
export function formatDate(millisSinceEpoch: number): string {
  const date = new Date(millisSinceEpoch);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const millis = date.getMilliseconds().toString().padStart(3, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds},${millis}`;
}
