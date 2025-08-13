// Solace-inspired design tokens derived from the provided image
export const solaceTokens = {
  primary: "#0E5C4F", // deep green
  primaryAlt: "#0B443B",
  background: "#F7FAF9",
  accent: "#F4EFE7", // warm neutral
  success: "#2E7D32",
  warning: "#B26A00",
  error: "#B3261E",
  text: "#0F172A",
  subtleText: "#64748B",
  radius: 8,
  fontDisplay:
    '"Mollie Glaston", "Playfair Display", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  fontSans:
    '"Lato", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
};

// Return only tokens/components; the algorithm is applied in a client wrapper
export const getAntThemeTokens = (fontFamily?: string) => ({
  token: {
    colorPrimary: solaceTokens.primary,
    colorInfo: solaceTokens.primary,
    colorSuccess: solaceTokens.success,
    colorWarning: solaceTokens.warning,
    colorError: solaceTokens.error,
    borderRadius: solaceTokens.radius,
    fontFamily: fontFamily ?? solaceTokens.fontSans,
    colorBgLayout: solaceTokens.background,
    colorBgContainer: "#FFFFFF",
    colorBorder: "#E5E7EB",
    colorText: solaceTokens.text,
    colorTextSecondary: solaceTokens.subtleText,
    // map a few variables for consistency with globals.css
    colorLink: "var(--color-primary)",
    colorLinkHover: "var(--color-primary-alt)",
  },
  components: {
    Button: { controlHeight: 40, borderRadius: 999 },
    Input: { borderRadius: 999, controlHeight: 44 },
    Card: { borderRadiusLG: 14, boxShadow: "var(--shadow-card)" },
    Table: {
      borderRadius: solaceTokens.radius,
      headerBg: "#F6F8F7",
      headerColor: "#111827",
      rowHoverBg: "#F9FAFB",
      cellPaddingBlock: 14,
      cellPaddingInline: 16,
    },
    Tag: {
      borderRadiusSM: 999,
      defaultBg: "#D2E7E1",
      defaultColor: "#0B443B",
      fontSizeSM: 12,
    },
    Pagination: {
      itemActiveBg: solaceTokens.primary,
      colorPrimary: "#FFFFFF",
      itemActiveColor: "#FFFFFF",
      colorText: solaceTokens.text,
    },
    Typography: {
      // Use display font for headings; still fallback to body for paragraphs
      titleMarginBottom: 8,
      titleMarginTop: 0,
      fontFamily: solaceTokens.fontSans,
    },
  },
});

// Backwards-compatible export name (no antd imports)
export const getAntThemeConfig = getAntThemeTokens;
