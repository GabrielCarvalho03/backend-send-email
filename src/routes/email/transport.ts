import { env } from "../../env/index";

export const TransportEmail = () => {
  return {
    transport: {
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: env.EMAIL_PROVIDER,
        pass: env.PASSWORD_EMAIL_PROVIDER,
      },
    },
  };
};
