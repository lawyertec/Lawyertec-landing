import { SmartRowLabel as SmartRowLabel_8dc744c6cc01d8bdd4942158e17b2d51 } from '@/payload/admin/rowlabels/SmartRowLabel'
import { StatRowLabel as StatRowLabel_f1fc077db1033ba6a1717907229e8e2d } from '@/payload/admin/rowlabels/StatRowLabel'
import { StepRowLabel as StepRowLabel_3c3a79ef196650509dac3357a3472f9a } from '@/payload/admin/rowlabels/StepRowLabel'
import { AdminIcon as AdminIcon_3b07c8789eb964ecac603ca09af4203c } from '@/payload/admin/AdminLogo'
import { AdminLogo as AdminLogo_3b07c8789eb964ecac603ca09af4203c } from '@/payload/admin/AdminLogo'
import { BeforeDashboard as BeforeDashboard_8f26ee4e90f40e54c081ec82033a0126 } from '@/payload/admin/BeforeDashboard'
import { VercelBlobClientUploadHandler as VercelBlobClientUploadHandler_16c82c5e25f430251a3e3ba57219ff4e } from '@payloadcms/storage-vercel-blob/client'
import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc'

/** @type import('payload').ImportMap */
export const importMap = {
  "@/payload/admin/rowlabels/SmartRowLabel#SmartRowLabel": SmartRowLabel_8dc744c6cc01d8bdd4942158e17b2d51,
  "@/payload/admin/rowlabels/StatRowLabel#StatRowLabel": StatRowLabel_f1fc077db1033ba6a1717907229e8e2d,
  "@/payload/admin/rowlabels/StepRowLabel#StepRowLabel": StepRowLabel_3c3a79ef196650509dac3357a3472f9a,
  "@/payload/admin/AdminLogo#AdminIcon": AdminIcon_3b07c8789eb964ecac603ca09af4203c,
  "@/payload/admin/AdminLogo#AdminLogo": AdminLogo_3b07c8789eb964ecac603ca09af4203c,
  "@/payload/admin/BeforeDashboard#BeforeDashboard": BeforeDashboard_8f26ee4e90f40e54c081ec82033a0126,
  "@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler": VercelBlobClientUploadHandler_16c82c5e25f430251a3e3ba57219ff4e,
  "@payloadcms/next/rsc#CollectionCards": CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1
}
