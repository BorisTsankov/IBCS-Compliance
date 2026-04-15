import clsx from "clsx";

import { CheckCircle, XCircle } from "lucide-react";
// eslint-disable-next-line react-refresh/only-export-components


export const getPasswordChecks = (password: string) => {

  const rules = {
    allowedUpdates: ["username", "email", "password", "emailVerified"],
    passwordRules: {
      minLength: 6,
      requireUppercase: true,
      requireLowercase: true,
      requireNumber: true,
      requireSymbol: true,
    },
  };

  return [
    {
      label: "At least " + rules.passwordRules.minLength + " characters",
      isValid: password.length >= rules.passwordRules.minLength,
      allowed: rules.passwordRules.minLength,
    },
    {
      label: "Uppercase letter",
      isValid: !rules.passwordRules.requireUppercase || /[A-Z]/.test(password),
      allowed: rules.passwordRules.requireUppercase,
    },
    {
      label: "Lowercase letter",
      isValid: !rules.passwordRules.requireLowercase || /[a-z]/.test(password),
      allowed: rules.passwordRules.requireLowercase,
    },
    {
      label: "Number",
      isValid: !rules.passwordRules.requireNumber || /[0-9]/.test(password),
      allowed: rules.passwordRules.requireNumber,
    },
    {
      label: "Special character",
      isValid: !rules.passwordRules.requireSymbol || /[^a-zA-Z0-9]/.test(password),
      allowed: rules.passwordRules.requireSymbol,
    },
  ];
};

type Props = {
  password: string;
};

const PasswordStrengthChecks: React.FC<Props> = ({ password }) => {
  const checks = getPasswordChecks(password);

  return (
    <div className="grid grid-cols-3 gap-2">
      {checks.map((check, index) => {
        return (
          check.allowed && (
            <div key={index} className="flex items-center gap-2">
              {check.isValid ? (
                <CheckCircle className="text-green-400 w-3 h-3" />
              ) : (
                <XCircle className="text-red-400 w-3 h-3" />
              )}
              <span
                className={clsx("transition-colors text-xs", {
                  "text-green-400": check.isValid,
                  "text-red-400": !check.isValid,
                })}
              >
                {check.label}
              </span>
            </div>
          )
        );
      })}
    </div>
  );
};

export default PasswordStrengthChecks;