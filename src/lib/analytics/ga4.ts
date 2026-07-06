export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

export const isGA4Configured = GA4_MEASUREMENT_ID.length > 0;
