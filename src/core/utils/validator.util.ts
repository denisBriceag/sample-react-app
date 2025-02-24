export default class Validator {
  static readonly emailRule: RegExp = new RegExp(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  );
}
