import {LogChannel, LogMessage, RawLogChannel, RawLogMessage} from "../main/core";

/**
 * LogChannel that pushes log messages to a buffer.
 */
export class ArrayLogChannel implements LogChannel {
  private readonly _buffer: LogMessage[] = [];
  public readonly type = "LogChannel";

  public write(msg: LogMessage): void {
    this._buffer.push(msg);
  }

  public get logMessages() {
    return this._buffer;
  }

  public get messages() {
    return this._buffer.map(msg => msg.message);
  }
}

/**
 * RawLogChannel that pushes raw log messages to a buffer.
 */
export class ArrayRawLogChannel implements RawLogChannel {

  private _buffer: RawLogMessage[] = [];
  public readonly type = "RawLogChannel";

  public write(msg: RawLogMessage, _: (arg: any) => string): void {
    this._buffer.push(msg);
  }

  public get messages(): ReadonlyArray<string> {
    return this._buffer.map(m => m.message);
  }

  public get errors(): ReadonlyArray<Error | undefined> {
    return this._buffer.map(m => m.exception);
  }

  public get size() {
    return this._buffer.length;
  }

  public clear() {
    this._buffer = [];
  }
}

