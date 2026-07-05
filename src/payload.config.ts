import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { Media } from "./payload/collections/Media";
import { Users } from "./payload/collections/Users";
import { Landing } from "./payload/globals/Landing";
import { adminComponents } from "./payload/admin/components";
import {
  getPayloadAllowedOrigins,
  getPayloadServerURL,
  requireProductionEnv,
} from "./payload/payload-env";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const payloadSecret = requireProductionEnv("PAYLOAD_SECRET", process.env.PAYLOAD_SECRET);
const databaseUri = requireProductionEnv("DATABASE_URI", process.env.DATABASE_URI);
const allowedOrigins = getPayloadAllowedOrigins();

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — Lawyertec CMS",
      icons: [{ url: "/logos/icon-mark.svg", type: "image/svg+xml" }],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: [adminComponents.beforeDashboard],
      graphics: {
        Logo: adminComponents.adminLogo,
        Icon: adminComponents.adminIcon,
      },
    },
  },
  collections: [Users, Media],
  globals: [Landing],
  editor: lexicalEditor(),
  secret: payloadSecret,
  serverURL: getPayloadServerURL(),
  cors: allowedOrigins,
  csrf: allowedOrigins,
  maxDepth: 2,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
    push: false,
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
  bin: [
    {
      key: "seed",
      scriptPath: path.resolve(dirname, "payload/seed.ts"),
    },
  ],
});
