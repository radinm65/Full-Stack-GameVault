import ISignupValues from "../forms/ISignupValues";

interface ISignupStep {
  values: ISignupValues;
  onChange: (field: keyof ISignupValues, value: string) => void;
}

export default ISignupStep;
