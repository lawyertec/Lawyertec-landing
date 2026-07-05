import type { CollectionConfig } from "payload";

const isProduction = process.env.NODE_ENV === "production";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Usuario",
    plural: "Usuarios",
  },
  admin: {
    useAsTitle: "email",
  },
  auth: {
    cookies: {
      secure: isProduction,
      sameSite: "Lax",
    },
    maxLoginAttempts: 5,
    lockTime: 600_000,
    tokenExpiration: 7200,
  },
  fields: [],
};
