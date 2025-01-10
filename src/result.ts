export type Result<T, E> = Ok<T> | Err<E>;

export type Ok<T> = {
  kind: 'Ok';
  value: T;
};
export function ok<T>(t: T): Ok<T> {
  return {
    kind: 'Ok',
    value: t,
  };
}

export type Err<E> = {
  kind: 'Err';
  value: E;
};
export function err<E>(e: E): Err<E> {
  return {
    kind: 'Err',
    value: e,
  };
}
